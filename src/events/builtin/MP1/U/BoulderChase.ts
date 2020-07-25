import { IEvent, IEventParseInfo } from "../../../events";
import { EditorEventActivationType, EventExecutionType, Game } from "../../../../types";
import { hashEqual } from "../../../../utils/arrays";
import { addEventToLibrary } from "../../../EventLibrary";

export const BoulderChase: IEvent = {
  id: "BOULDERCHASE",
  name: "Boulder chase",
  activationType: EditorEventActivationType.LANDON,
  executionType: EventExecutionType.DIRECT,
  fakeEvent: true,
  supportedGames: [
    Game.MP1_USA,
  ],
  parse(dataView: DataView, info: IEventParseInfo) {
    const hashes = {
      METHOD_START: "6E26BAB74BC8411901472C0A40E2FC1D", // +0x74
    };

    if (hashEqual([dataView.buffer, info.offset, 0x74], hashes.METHOD_START)) {
      // TODO: Parse the boulder path arguments.
      return true;
    }

    return false;
  }
};
addEventToLibrary(BoulderChase);