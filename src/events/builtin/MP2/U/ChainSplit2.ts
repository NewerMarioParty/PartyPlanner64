import { IEvent, IEventParseInfo, IEventWriteInfo } from "../../../events";
import { EditorEventActivationType, EventExecutionType, Game, EventParameterType } from "../../../../types";
import { hashEqual, copyRange } from "../../../../utils/arrays";
import { addConnection, IEventInstance } from "../../../../boards";
import { getJALAddr, makeInst, REG } from "../../../../utils/MIPS";
import { EventCache } from "../../../EventCache";
import { addEventToLibrary } from "../../../EventLibrary";

// Represents the "event" where the player decides between two paths.
// This won't be an actual event when exposed to the user.
export const ChainSplit2: IEvent = {
  id: "CHAINSPLIT2",
  name: "",
  activationType: EditorEventActivationType.WALKOVER,
  executionType: EventExecutionType.PROCESS,
  parameters: [
    { name: "chains", type: EventParameterType.NumberArray, }
  ],
  fakeEvent: true,
  supportedGames: [
    Game.MP2_USA,
  ],
  parse(dataView: DataView, info: IEventParseInfo) {
    let hashes = {
      // From Western Land 0x80107C54 / 0x29CF24:
      METHOD_START: "0C01A009C54E209652DA667F464FB7C0", // +0x2C
      //METHOD_MID1: "", // [0x30]+0x18 // Not sure why this was hashed in MP1
      METHOD_MID2: "FC606B8F8BD2C8D39BB9581B0E4D8398", // [0x4C]+0x1C
      METHOD_END: "2F3A0045D0AC927FF23ACD73B5B62E1C" // [0xF0]+0x28
    };

    // Match a few sections to see if we match.
    if (hashEqual([dataView.buffer, info.offset, 0x2C], hashes.METHOD_START) &&
        //hashEqual([dataView.buffer, info.offset + 0x30, 0x18], hashes.METHOD_MID1) &&
        hashEqual([dataView.buffer, info.offset + 0x4C, 0x1C], hashes.METHOD_MID2) &&
        hashEqual([dataView.buffer, info.offset + 0xF0, 0x28], hashes.METHOD_END)) {
      // Read the chain indices.
      let leftChain = dataView.getUint16(info.offset + 0xEA);
      let rightChain = dataView.getUint16(info.offset + 0xEE);

      let leftSpace = info.chains[leftChain][0]; // Technically, we should check if A2 is really R0.
      let rightSpace = info.chains[rightChain][0];

      addConnection(info.curSpace, leftSpace, info.board);
      addConnection(info.curSpace, rightSpace, info.board);

      let cacheEntry = EventCache.get(ChainSplit2.id);
      if (!cacheEntry)
        cacheEntry = {};
      if (!cacheEntry[info.game])
        cacheEntry[info.game] = {};
      if (!cacheEntry[info.game].asm) {
        cacheEntry[info.game].asm = dataView.buffer.slice(info.offset, info.offset + 0x118);
        let cacheView = new DataView(cacheEntry[info.game].asm);
        cacheView.setUint32(0x2C, 0); // Blank the helper1 call.
        cacheView.setUint32(0xD4, 0); // Blank the helper2 call.
        cacheView.setUint32(0x40, 0); // Blank the space args LUI.
        cacheView.setUint32(0x48, 0); // Blank the space args ADDIU.
        cacheView.setUint16(0xE4, 0); // Blank the +3 jump.
        cacheView.setUint16(0xEA, 0); // Blank the left chain index.
        cacheView.setUint16(0xEE, 0); // Blank the right chain index.
      }
      if (!cacheEntry[info.game].helper1) {
        cacheEntry[info.game].helper1 = [];
        let helper1JAL = dataView.getUint32(info.offset + 0x2C);
        let helper1Addr = getJALAddr(helper1JAL);
        //console.log(helper1Addr.toString(16));
        let helper1Offset = info.offset - (info.addr - helper1Addr); // Assumes helper comes before.
        //console.log(helper1Offset.toString(16));
        cacheEntry[info.game].helper1[info.boardIndex] = dataView.buffer.slice(helper1Offset, helper1Offset + 0xD0);

        cacheEntry[info.game].helper2 = [];
        let helper2JAL = dataView.getUint32(info.offset + 0xD4);
        let helper2Addr = getJALAddr(helper2JAL);
        //console.log(helper1Addr.toString(16));
        let helper2Offset = info.offset - (info.addr - helper2Addr); // Assumes helper comes before.
        //console.log(helper1Offset.toString(16));
        cacheEntry[info.game].helper2[info.boardIndex] = dataView.buffer.slice(helper2Offset, helper2Offset + 0x60);
      }

      EventCache.set(ChainSplit2.id, cacheEntry);

      return true;
    }

    return false;
  },
  write(dataView: DataView, event: IEventInstance, info: IEventWriteInfo, temp: { helper1addr: number, helper2addr: number }) {
    let cacheEntry = EventCache.get(ChainSplit2.id);
    if (!cacheEntry || !cacheEntry[info.game] || !cacheEntry[info.game].asm || !cacheEntry[info.game].helper1 || !cacheEntry[info.game].helper2)
      throw new Error(`Cannot write ${ChainSplit2.id}, missing cache entry values.`);

    let lenWritten = 0;
    let curAddr = info.addr! & 0x7FFFFFFF; // No 0x8... in JALs

    let asm = cacheEntry[info.game].asm;
    copyRange(dataView, asm, lenWritten, 0, asm.byteLength);
    lenWritten += asm.byteLength;

    // We need to write the helpers once, then we can reuse them later.
    if (!temp.helper1addr) {
      let helper1asm = cacheEntry[info.game].helper1[info.boardIndex];
      if (!helper1asm)
        throw new Error(`Cannot write ${ChainSplit2.id}, missing helper1[${info.boardIndex}].`);

      copyRange(dataView, helper1asm, lenWritten, 0, helper1asm.byteLength);
      temp.helper1addr = curAddr + lenWritten;
      lenWritten += helper1asm.byteLength;
    }
    if (!temp.helper2addr) {
      let helper2asm = cacheEntry[info.game].helper2[info.boardIndex];
      if (!helper2asm)
        throw new Error(`Cannot write ${ChainSplit2.id}, missing helper2[${info.boardIndex}].`);

      copyRange(dataView, helper2asm, lenWritten, 0, helper2asm.byteLength);
      temp.helper2addr = curAddr + lenWritten;
      lenWritten += helper2asm.byteLength;
    }

    let argsAddrLower = info.argsAddr! & 0x0000FFFF;
    let argsAddrUpper = info.argsAddr! >>> 16;
    if (argsAddrLower & 0x8000)
      argsAddrUpper += 1;

    const chains = event.parameterValues!["chains"] as number[];

    dataView.setUint32(0x2C, makeInst("JAL", temp.helper1addr)); // Set the helper1 call.
    dataView.setUint32(0x40, makeInst("LUI", REG.A1, argsAddrUpper));
    dataView.setUint32(0x48, makeInst("ADDIU", REG.A1, REG.A1, argsAddrLower));
    dataView.setUint32(0xD4, makeInst("JAL", temp.helper2addr)); // Set the helper2 call.
    dataView.setUint32(0xE4, makeInst("J", curAddr + 0xF0)); // J +3
    dataView.setUint16(0xEA, chains[0]); // Set the left chain index.
    dataView.setUint16(0xEE, chains[1]); // Set the right chain index.

    return [info.offset!, lenWritten, 0];
  }
};
addEventToLibrary(ChainSplit2);
