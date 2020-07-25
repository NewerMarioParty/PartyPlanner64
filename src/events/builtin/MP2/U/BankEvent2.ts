import { IEvent, IEventParseInfo, IEventWriteInfo } from "../../../events";
import { IEventInstance, getSpacesOfSubType, getDeadSpace } from "../../../../boards";
import { SpaceSubtype } from "../../../../types";
import { distance } from "../../../../utils/number";
import { scenes } from "../../../../fs/scenes";

export const BankEvent2: Partial<IEvent> = {
  parse(dataView: DataView, info: IEventParseInfo) {
    let found = false;

    // Western Land 0x8010964C - 0x80109A70, spaces 0x5E,0x8A with banks 0x9B,0x99
    if (info.boardIndex === 0) {
      if (info.offset !== 0x0029E91C)
        return false;
      //if (dataView.getUint32(info.offset + 0x44) !== 0x0C03C84F)
      //  return false;
      // fnLen = getFunctionLength(dataView, info.offset);
      // found = fnLen === ;
      found = true;
    }

    if (!found)
      return false;

    return true;
  },

  write(dataView: DataView, event: IEventInstance, info: IEventWriteInfo, temp: any) {
    let curBank = temp.curBank = temp.curBank || 1;
    temp.curBank++;

    // Find the closest Bank subtype space nearby.
    let bankSpaces = getSpacesOfSubType(SpaceSubtype.BANK, info.board);
    let eventSpace = info.curSpace || getDeadSpace(info.board);
    let bestDistance = Number.MAX_VALUE;
    let bestBankIdx = info.curSpaceIndex;
    for (let b = 0; b < bankSpaces.length; b++) {
      let bankIdx = bankSpaces[b];
      let bankSpace = info.board.spaces[bankIdx];
      let dist = distance(eventSpace.x, eventSpace.y, bankSpace.x, bankSpace.y);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestBankIdx = bankIdx;
      }
    }

    if (info.boardIndex === 0) {
      const sceneView = scenes.getDataView(62);

      const base = 0x6E4C; // 0x0029E91C
      if (curBank === 1) {
        // The current space
        sceneView.setUint16(base + 0x6A, info.curSpaceIndex); // 0x801096B4

        // The bank's space
        sceneView.setUint16(base + 0x92, bestBankIdx); // 0x801096DC
      }
      else if (curBank === 2) {
        // The current space
        sceneView.setUint16(base + 0x72, info.curSpaceIndex); // 0x801096BC

        // The bank's space
        sceneView.setUint16(base + 0x86, bestBankIdx); // 0x801096D0
      }

      // Just point to the event because we left it alone.
      return [0x0029E91C, 0, 0];
    }

    throw new Error("Can't write Bank to board index " + info.boardIndex);
  }
};
