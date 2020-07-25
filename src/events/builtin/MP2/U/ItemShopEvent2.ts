import { IEvent, IEventParseInfo, IEventWriteInfo } from "../../../events";
import { IEventInstance, getSpacesOfSubType, getDeadSpace } from "../../../../boards";
import { distance } from "../../../../utils/number";
import { scenes } from "../../../../fs/scenes";
import { SpaceSubtype } from "../../../../types";

export const ItemShopEvent2: Partial<IEvent> = {
  parse(dataView: DataView, info: IEventParseInfo) {
    let found = false;

    // Western Land 0x80109B30 - 0x8010A13C, space 0xA7 with shop at 0x9A
    if (info.boardIndex === 0) {
      if (info.offset !== 0x0029EE00)
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
    let curItemShop = temp.curItemShop = temp.curItemShop || 1;
    temp.curItemShop++;

    // Find the closest Item shop subtype space nearby.
    let itemShopSpaces = getSpacesOfSubType(SpaceSubtype.ITEMSHOP, info.board);
    let eventSpace = info.curSpace || getDeadSpace(info.board);
    let bestDistance = Number.MAX_VALUE;
    let bestItemShopIdx = info.curSpaceIndex;
    for (let b = 0; b < itemShopSpaces.length; b++) {
      let shopIdx = itemShopSpaces[b];
      let shopSpace = info.board.spaces[shopIdx];
      let dist = distance(eventSpace.x, eventSpace.y, shopSpace.x, shopSpace.y);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestItemShopIdx = shopIdx;
      }
    }

    if (info.boardIndex === 0) {
      const sceneView = scenes.getDataView(62);

      if (curItemShop === 1) {
        // The shop's space
        sceneView.setUint16(0x7330 + 0x62, bestItemShopIdx); // 0x80109B90
      }

      // Just point to the event because we left it alone.
      return [0x0029EE00, 0, 0];
    }

    throw new Error("Can't write Item Shop to board index " + info.boardIndex);
  }
};
