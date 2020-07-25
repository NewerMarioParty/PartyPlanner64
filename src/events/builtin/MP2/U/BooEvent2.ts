import { IEvent, IEventParseInfo, IEventWriteInfo } from "../../../events";
import { IEventInstance, getSpacesOfSubType, getDeadSpace } from "../../../../boards";
import { SpaceSubtype } from "../../../../types";
import { distance } from "../../../../utils/number";
import { scenes } from "../../../../fs/scenes";

export const BooEvent2: Partial<IEvent> = {
  parse(dataView: DataView, info: IEventParseInfo) {
    let found = false;

    // Western Land 0x10BA48 - 0x8010C44C, spaces 0xAF,0xB4 with boos 0x9D,0x9F
    if (info.boardIndex === 0) {
      if (info.offset !== 0x002A0D18)
        return false;
      //if (dataView.getUint32(info.offset + 0x4C) !== 0x0C03AF32) // JAL 0x800EBCC8
      //  return false;
      //fnLen = getFunctionLength(dataView, info.offset);
      //found = fnLen === 0x11D4;
      found = true;
    }

    if (!found)
      return false;

    return true;
  },
  write(dataView: DataView, event: IEventInstance, info: IEventWriteInfo, temp: any) {
    let curBoo = temp.curBoo = temp.curBoo || 1;
    temp.curBoo++;

    // Find the closest (probably only) boo space nearby.
    let booSpaces = getSpacesOfSubType(SpaceSubtype.BOO, info.board);
    let eventSpace = info.curSpace || getDeadSpace(info.board);
    let bestDistance = Number.MAX_VALUE;
    let bestBooIdx = info.curSpaceIndex;
    for (let b = 0; b < booSpaces.length; b++) {
      let booIdx = booSpaces[b];
      let booSpace = info.board.spaces[booIdx];
      let dist = distance(eventSpace.x, eventSpace.y, booSpace.x, booSpace.y);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestBooIdx = booIdx;
      }
    }

    if (info.boardIndex === 0) {
      const sceneView = scenes.getDataView(62);

      // base 0x002A0D18
      if (curBoo === 1) {
        sceneView.setUint16(0x9248 + 0x82, info.curSpaceIndex); // 0x1010BAC8
        sceneView.setUint16(0x9248 + 0xA6, bestBooIdx); // 0x8010BAEC
      }
      else if (curBoo === 2) {
        sceneView.setUint16(0x9248 + 0x8A, info.curSpaceIndex); // 0x8010BAD0
        sceneView.setUint16(0x9248 + 0xAE, bestBooIdx); // 0x8010BAF4
      }

      // Just point to the event because we left it there.
      return [0x002A0D18, 0, 0];
    }

    throw new Error("Can't write Boo to board index " + info.boardIndex);
  }
};
