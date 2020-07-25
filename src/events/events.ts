import { Game, EventExecutionType, EventParameterType, EventCodeLanguage, EditorEventActivationType } from "../types";
import { makeDivisibleBy } from "../utils/number";
import { copyObject } from "../utils/obj";
import { IBoard, getCurrentBoard, ISpace, IEventInstance, getBoardEvent } from "../boards";
import { romhandler } from "../romhandler";
import { ICustomEvent, writeCustomEvent, createCustomEvent } from "./customevents";
import { getEventFromLibrary, getEventsInLibrary } from "./EventLibrary";

export interface IEvent {
  readonly id: string;
  readonly name: string;
  readonly parse?: (dataView: DataView, info: IEventParseInfo) => boolean;
  readonly write?: (dataView: DataView, event: IEventInstance, info: IEventWriteInfo, temp: any) => [number, number, number] | string | false;
  readonly activationType: EditorEventActivationType;
  readonly executionType: EventExecutionType;
  readonly fakeEvent?: boolean;
  readonly supportedGames: Game[];
  readonly parameters?: IEventParameter[];
  readonly custom?: boolean;
  readonly language?: EventCodeLanguage;
}

/** Parameter provided to an event. */
export interface IEventParameter {
  name: string;
  type: EventParameterType;
}

export type EventParameterValues = { [name: string]: number | number[] | boolean };

function _supportedGamesMatch(supportedGames: Game[], gameVersion: number) {
  for (let i = 0; i < supportedGames.length; i++) {
    switch (supportedGames[i]) {
      case Game.MP1_USA:
      case Game.MP1_JPN:
      case Game.MP1_PAL:
        if (gameVersion === 1)
          return true;
        break;
      case Game.MP2_USA:
      case Game.MP2_JPN:
      case Game.MP2_PAL:
        if (gameVersion === 2)
          return true;
        break;
      case Game.MP3_USA:
      case Game.MP3_JPN:
      case Game.MP3_PAL:
        if (gameVersion === 3)
          return true;
        break;
    }
  }
  return false;
}

/** Gets an event, either from the board's set or the global library. */
export function getEvent(eventId: string, board: IBoard): IEvent {
  if (board && board.events && !!getBoardEvent(board, eventId)) {
    const boardEvent = getBoardEvent(board, eventId);
    return createCustomEvent(boardEvent!.language, boardEvent!.code);
  }
  return getEventFromLibrary(eventId);
}

/** Creates an event instance (the object stored in the board json for a given event) */
export function createEventInstance(event: IEvent, args?: Partial<IEventInstance>): IEventInstance {
  const spaceEvent = Object.assign({
    id: event.id,
    activationType: event.activationType,
    executionType: event.executionType,
  }, args);
  if (event.custom)
    spaceEvent.custom = true;

  return spaceEvent;
}

export interface IEventParseInfo {
  addr: number;
  offset: number;
  board: IBoard;
  boardIndex: number;
  curSpace: number;
  curSpaceIndex: number;
  chains: number[][];
  game: Game;
  gameVersion: 1 | 2 | 3;
}

export function parse(romView: DataView, info: IEventParseInfo) {
  let currentGame = romhandler.getROMGame()!;
  const _events = getEventsInLibrary();
  for (let eventId in _events) {
    const event = _events[eventId];
    if (!event.parse)
      continue;
    if (event.supportedGames.indexOf(currentGame) === -1)
      continue;
    let args = event.parse(romView, info);
    if (args) {
      if (event.fakeEvent)
        return true;
      let result: any = {
        id: eventId,
      };
      if (args !== true)
        result.args = args;
      return result;
    }
  }
  return false;
}

export function getAvailableEvents(): IEvent[] {
  let events = [];
  const _events = getEventsInLibrary();
  let curGameVersion = getCurrentBoard().game || 1;
  for (let id in _events) {
    let event = _events[id];
    if (_supportedGamesMatch(event.supportedGames, curGameVersion) && !event.fakeEvent)
      events.push(event);
  }
  return events;
}

export function getCustomEvents(): ICustomEvent[] {
  let events = [];
  const _events = getEventsInLibrary();
  for (let id in _events) {
    let event = _events[id];
    if (event.custom)
      events.push(copyObject(event));
  }
  return events;
}

export interface IEventWriteInfo {
  boardIndex: number;
  board: IBoard;
  curSpaceIndex: number;
  curSpace: ISpace | null;
  chains: number[][];
  offset?: number;
  addr?: number;
  game: Game;
  gameVersion: 1 | 2 | 3;
  argsAddr?: number;
}

function _getArgsSize(count: number) {
  // return (count * 2) + (4 - ((count * 2) % 4));
  return makeDivisibleBy(count * 2, 4);
}

export async function write(buffer: ArrayBuffer, event: IEventInstance, info: IEventWriteInfo, temp: any) {
  // Write any inline arguments.
  // Normally, these are right by the event list, but it makes more sense
  // to write them mixed in right beside the ASM that actually uses them...
  let argsCount = 0;
  let argsSize = 0;
  if (event.inlineArgs) {
    argsCount = event.inlineArgs.length;
    argsSize = _getArgsSize(argsCount);

    let argView = new DataView(buffer, info.offset);
    for (let arg = 0; arg < argsCount; arg++) {
      let argOffset = (arg * 2);
      argView.setUint16(argOffset, event.inlineArgs[arg]);
    }

    // We will tell the event code where the args are, and update where it
    // should actually start writing the ASM because we wrote those args.
    info.argsAddr = info.addr;
    info.addr! += argsSize;
    info.offset! += argsSize;
  }

  let asmView = new DataView(buffer, info.offset);

  let result;
  if (event.custom) {
    const boardEvent = getBoardEvent(info.board, event.id)!;
    if (!boardEvent)
      throw new Error(`A space had the ${event.id} custom event, but its code wasn't in the board file`);
    result = await writeCustomEvent(asmView, event, info, boardEvent.language, boardEvent.code, temp);
  }
  else {
    result = getEventFromLibrary(event.id).write!(asmView, event, info, temp);
  }

  if (result === false)
    throw new Error(`Could not write ${event.id} for game ${info.gameVersion}`);

  if (event.inlineArgs) {
    (result as number[])[1] += argsSize; // len needs to be more than what the event thought it should be
  }

  return result;
}

export function isUnsupported(event: IEvent, gameId: Game) {
  return event.supportedGames.indexOf(gameId) === -1;
}
