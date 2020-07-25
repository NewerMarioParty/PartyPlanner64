import { IEvent, IEventParseInfo } from "../../../events";
import { EditorEventActivationType, EventExecutionType, Game } from "../../../../types";
import { hashEqual } from "../../../../utils/arrays";
import { addEventToLibrary } from "../../../EventLibrary";

// Right now, we don't even parse this event onto the board, but we need
// it to grab some helper functions for plain ChainMerge (not usually present in DK)
export const ThwompChainSplit: IEvent = {
  id: "THWOMPCHAINSPLIT",
  name: "Thwomp Chain Split",
  activationType: EditorEventActivationType.WALKOVER,
  executionType: EventExecutionType.PROCESS, // Unconfirmed
  fakeEvent: true,
  supportedGames: [
    Game.MP1_USA,
  ],
  parse(dataView: DataView, info: IEventParseInfo) {
    var hashes = {
      // One particular thwomp event from DK:
      METHOD_START: "A45C16B1E285427C790C6FAD1EC78394", // +0x40
    };
    if (hashEqual([dataView.buffer, info.offset, 0x40], hashes.METHOD_START)) {
      return true;
    }
    return false;
  },
};
addEventToLibrary(ThwompChainSplit);
