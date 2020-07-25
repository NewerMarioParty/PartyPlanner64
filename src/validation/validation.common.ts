import { IBoard, getConnections, getSpacesOfSubType, getStartSpaceIndex, getDeadEnds, getBoardEvent, getAdditionalBackgroundCode, IEventInstance } from "../boards";
import { ValidationLevel, SpaceSubtype, Space } from "../types";
import { romhandler } from "../romhandler";
import { CustomAsmHelper } from "../events/customevents";
import { getEvent, isUnsupported, IEventParameter } from "../events/events";
import { createRule } from "./validationrules";
import { makeFakeBgSyms, testAdditionalBgCode } from "../events/additionalbg";

const HasStart = createRule("HASSTART", "Has start space", ValidationLevel.ERROR);
HasStart.fails = function(board: IBoard, args: any) {
  let curIdx = getStartSpaceIndex(board);
  if (curIdx < 0)
    return "No start space found on board.";
  return false;
};

const GameVersionMatch = createRule("GAMEVERSION", "Game version mismatch", ValidationLevel.ERROR);
GameVersionMatch.fails = function(board: IBoard, args: any) {
  let romGame = romhandler.getGameVersion();
  if (romGame !== board.game)
    return `Board is for MP${board.game}, but ROM is MP${romGame}`;
  return false;
};

const DeadEnd = createRule("DEADEND", "No dead ends", ValidationLevel.WARNING);
DeadEnd.fails = function(board: IBoard, args: any) {
  const deadEnds = getDeadEnds(board);

  const startIndex = getStartSpaceIndex(board);
  if (startIndex < 0)
    return false; // Let HASSTART rule complain.

  if (deadEnds.indexOf(startIndex) >= 0)
    return "Start space does not lead anywhere.";

  if (deadEnds.length)
    return "There is a dead end on the board.";

  return false;
};

const TooManySpaces = createRule("TOOMANYSPACES", "Too many spaces", ValidationLevel.ERROR);
TooManySpaces.fails = function(board: IBoard, args: any) {
  if (board.spaces.length > 0xFFFF)
    return "There is a hard limit of 65535 spaces.";
  return false;
};

const OverRecommendedSpaces = createRule("OVERRECOMMENDEDSPACES", "Over recommended spaces", ValidationLevel.WARNING);
OverRecommendedSpaces.fails = function(board: IBoard, args: any) {
  const spaceCount = board.spaces.length;
  if (spaceCount > args.max)
    return `${spaceCount} spaces present, more than ${args.max} spaces can be unstable.`;
  return false;
};

const _makeTooManyOfSubtypeRule = function(subtype: SpaceSubtype, name: string) {
  let rule = createRule(`TOOMANY${name.toUpperCase().replace(/\s+/g, "")}`, `Too many ${name}`, ValidationLevel.ERROR);
  rule.fails = function(board, args = {}) {
    let limit = args.limit || 0;
    let count = board.spaces.filter(space => {
      return space && space.subtype === subtype;
    }).length;
    if (count > limit)
      return `There are ${count} ${name}, but the limit is ${limit} for this board.`;
    return false;
  };
}

_makeTooManyOfSubtypeRule(SpaceSubtype.BOO, "Boos");
_makeTooManyOfSubtypeRule(SpaceSubtype.BOWSER, "Bowsers");
_makeTooManyOfSubtypeRule(SpaceSubtype.KOOPA, "Koopas");
_makeTooManyOfSubtypeRule(SpaceSubtype.BANK, "Banks");
_makeTooManyOfSubtypeRule(SpaceSubtype.ITEMSHOP, "Item Shops");
_makeTooManyOfSubtypeRule(SpaceSubtype.GATE, "Gates");

function _getStarSpaceCount(board: IBoard): number {
  return board.spaces.filter(space => {
    return space && space.star;
  }).length;
}

interface IBadStarCountProps {
  low: number;
  high: number;
  disallowed?: { [count: number]: boolean };
}

const BadStarCount = createRule("BADSTARCOUNT", "Bad star count", ValidationLevel.ERROR);
BadStarCount.fails = function(board: IBoard, args: IBadStarCountProps) {
  const count = _getStarSpaceCount(board);

  const disallowed = args.disallowed || {};
  if (disallowed[count]) {
    if (count === 1)
      return `There cannot be exactly 1 star space.`;
    else
      return `There cannot be exactly ${count} star spaces.`;
  }

  const low = args.low || 0;
  const high = args.high || 0;

  if (count < low || count > high) {
    if (low !== high)
      return `There are ${count} stars, but the range is ${low}-${high} for this board.`;
    else
      return `There are ${count} stars, but the count must be ${low} for this board.`;
  }
  return false;
};

const WarnNoStarSpaces = createRule("WARNNOSTARSPACES", "No star spaces", ValidationLevel.WARNING);
WarnNoStarSpaces.fails = function(board: IBoard, args: any = {}) {
  const count = _getStarSpaceCount(board);
  if (count === 0) {
    return `There are no star spaces, this may be unintentional.`;
  }
  return false;
};

const _makeTooFewOfSpaceTypeRule = function(type: Space, name: string) {
  let rule = createRule(`TOOFEW${name.toUpperCase().replace(/\s+/g, "")}SPACES`, `Too few ${name} spaces`, ValidationLevel.ERROR);
  rule.fails = function(board, args = {}) {
    let low = args.low || 0;
    let count = board.spaces.filter(space => {
      return space && space.type === type;
    }).length;
    if (count < low)
      return `There are ${count} ${name} spaces, need at least ${low} spaces of this type.`;
    return false;
  };
}

_makeTooFewOfSpaceTypeRule(Space.BLUE, "Blue");
_makeTooFewOfSpaceTypeRule(Space.RED, "Red");

const TooManyOfEvent = createRule("TOOMANYOFEVENT", "Too many of event", ValidationLevel.ERROR);
TooManyOfEvent.fails = function(board: IBoard, args: any) {
  let count = 0;
  board.spaces.forEach(space => {
    if (!space || !space.events)
      return;
    space.events.forEach(event => {
      if (event.id === args.event.id)
        count++;
    });
  });

  let low = args.low || 0;
  let high = args.high || 0;
  if (count < low || count > high) {
    if (low && high)
      return `There are ${count} of event ${args.event.name}, but the range is ${low}-${high} for this board.`;
    if (low)
      return `There are ${count} of event ${args.event.name}, but there must be at least ${low} for this board.`;
    else if (high)
      return `There are ${count} of event ${args.event.name}, but there can be at most ${high} for this board.`;
  }
  return false;
};

const UnrecognizedEvents = createRule("UNRECOGNIZEDEVENTS", "Unrecognized events", ValidationLevel.ERROR);
UnrecognizedEvents.fails = function(board: IBoard, args: any) {
  let unrecognizedEvents = Object.create(null);
  board.spaces.forEach(space => {
    if (!space || !space.events)
      return;
    space.events.forEach(spaceEvent => {
      if (!getEvent(spaceEvent.id, board))
        unrecognizedEvents[spaceEvent.id] = true;
    });
  });

  let ids = [];
  for (var id in unrecognizedEvents) {
    ids.push(id);
  }

  if (!ids.length)
    return false;

  let error = "The following events were unrecognized:\n";
  ids.forEach(id => {
    error += "\t" + id + "\n";
  });
  return error;
};

const UnsupportedEvents = createRule("UNSUPPORTEDEVENTS", "Unsupported events", ValidationLevel.ERROR);
UnsupportedEvents.fails = function(board: IBoard, args: any) {
  let unsupportedEvents = Object.create(null);
  let gameID = romhandler.getROMGame()!;
  board.spaces.forEach(space => {
    if (!space || !space.events)
      return;
    space.events.forEach(spaceEvent => {
      const event = getEvent(spaceEvent.id, board);
      if (!event) {
        return; // Let the other rule handle this.
      }
      if (isUnsupported(event, gameID))
        unsupportedEvents[spaceEvent.id] = true;
    });
  });

  let ids = [];
  for (var id in unsupportedEvents) {
    ids.push(id);
  }

  if (!ids.length)
    return false;

  let error = "The following events cannot be written to this ROM:\n";
  ids.forEach(id => {
    error += "\t" + id + "\n";
  });
  return error;
};

const FailingCustomEvents = createRule("CUSTOMEVENTFAIL", "Custom event errors", ValidationLevel.ERROR);
FailingCustomEvents.fails = async function(board: IBoard, args: any) {
  let failingEvents = Object.create(null);
  let gameID = romhandler.getROMGame()!;

  async function testEvent(event: IEventInstance): Promise<void> {
    try {
      const customEvent = getEvent(event.id, board);
      const boardEvent = getBoardEvent(board, event.id)!;
      await CustomAsmHelper.testCustomEvent(boardEvent.language, boardEvent.code, customEvent.parameters, {
        game: gameID,
      });
    }
    catch (e) {
      console.error(e.toString());
      if (!failingEvents[event.id])
        failingEvents[event.id] = true;
    }
  }

  for (const space of board.spaces) {
    if (!space || !space.events)
      continue;
    for (const event of space.events) {
      if (!event)
        continue; // Let the other rule handle this.
      if (!event.custom)
        continue;
      await testEvent(event);
    }
  }

  if (board.boardevents) {
    for (const event of board.boardevents) {
      if (!event.custom)
        continue;
      await testEvent(event);
    }
  }

  let ids = [];
  for (var id in failingEvents) {
    ids.push(id);
  }

  if (!ids.length)
    return false;

  let error = "The following custom events fail to assemble:\n";
  ids.forEach(id => {
    error += "\t" + id + "\n";
  });
  return error;
};

const BadCustomEventParameters = createRule("CUSTOMEVENTBADPARAMS", "Custom event parameter issues", ValidationLevel.ERROR);
BadCustomEventParameters.fails = function(board: IBoard, args: any) {
  const missingParams = Object.create(null);

  function testParameters(event: IEventInstance): void {
    const customEvent = getEvent(event.id, board);
    const parameters = customEvent.parameters;
    if (parameters && parameters.length) {
      parameters.forEach((parameter: IEventParameter) => {
        if (!event.parameterValues || !event.parameterValues.hasOwnProperty(parameter.name)) {
          if (!missingParams[parameter.name])
            missingParams[parameter.name] = 0;
          missingParams[parameter.name]++;
        }
      });
    }
  }

  board.spaces.forEach(space => {
    if (!space || !space.events)
      return;
    space.events.forEach(event => {
      if (!event)
        return; // Let the other rule handle this.
      if (!event.custom)
        return;
      testParameters(event);
    });
  });

  if (board.boardevents) {
    for (const event of board.boardevents) {
      if (!event.custom)
        continue;
      testParameters(event);
    }
  }

  let errorLines = [];
  for (let id in missingParams) {
    const count = missingParams[id];
    if (!count)
      continue; // ?
    errorLines.push(`\t${count} ${id} event parameter${count > 1 ? "s are " : " is "}not set`);
  }

  if (!errorLines.length)
    return false;

  return "Some event parameters need to be set:\n" + errorLines.join("\n");
};

const TooManyPathOptions = createRule("TOOMANYPATHOPTIONS", "Too many path options", ValidationLevel.ERROR);
TooManyPathOptions.fails = function(board: IBoard, args: any = {}) {
  let limit = args.limit || 2;
  for (var space in board.links) {
    let links = board.links[space];
    if (Array.isArray(links) && links.length > limit)
      return `A space branches in ${links.length} directions, but the maximum is ${limit}.`;
  }
  return false;
};

const CharactersOnPath = createRule("CHARACTERSONPATH", "Characters are on path", ValidationLevel.WARNING);
CharactersOnPath.fails = function(board: IBoard, args: any = {}) {
  for (var spaceIdx in board.links) {
    let space = board.spaces[spaceIdx];
    if (space.hasOwnProperty("subtype") && space.subtype !== SpaceSubtype.GATE)
      return "Characters and objects <a href='https://github.com/PartyPlanner64/PartyPlanner64/wiki/Creating-a-Board#special-charactersobjects' target='_blank'>should not be on the player path</a>.";
  }
  return false;
};

const SplitAtNonInvisibleSpace = createRule("SPLITATNONINVISIBLESPACE", "Split at non-invisible space", ValidationLevel.WARNING);
SplitAtNonInvisibleSpace.fails = function(board: IBoard, args: any = {}) {
  const preferredSplitTypes = [
    Space.OTHER,
    Space.STAR,
    Space.START,
    Space.BLACKSTAR,
    Space.ARROW,
  ];
  for (let spaceIdx in board.links) {
    let links = getConnections(parseInt(spaceIdx), board)!;
    if (links.length > 1) {
      let space = board.spaces[spaceIdx];
      if (preferredSplitTypes.indexOf(space.type) === -1)
        return "There is a <a href='https://github.com/PartyPlanner64/PartyPlanner64/wiki/Creating-a-Board#board-flow' target='_blank'>non-conventional path split</a>.";
    }
  }
  return false;
};

const TooManyArrowRotations = createRule("TOOMANYARROWROTATIONS", "Too many arrow rotations", ValidationLevel.WARNING);
TooManyArrowRotations.fails = function(board: IBoard, args: any = {}) {
  let rotationCount = 0;
  board.spaces.forEach(space => {
    if (!space)
      return;
    if (typeof space.rotation === "number") {
      rotationCount++;
    }
  });
  if (rotationCount > args.limit) {
    return `Only ${args.limit} arrows will be rotated in-game.`;
  }
  return false;
};

const GateSetup = createRule("GATESETUP", "Incorrect gate setup", ValidationLevel.ERROR);
GateSetup.fails = function(board: IBoard, args: any = {}) {
  let gateSpaceIndices = getSpacesOfSubType(SpaceSubtype.GATE, board);

  for (let i = 0; i < gateSpaceIndices.length; i++) {
    let gateSpaceIndex = gateSpaceIndices[i];

    // We want the gate to be on an invisible space.
    let gateSpace = board.spaces[gateSpaceIndex];
    if (gateSpace.type !== Space.OTHER)
      return "Only invisible spaces can have gates."; // UI should prevent this pretty well

    // Check space/link structure after gate space.
    let exitingSpaces = getConnections(gateSpaceIndex, board)!;
    if (exitingSpaces.length !== 1)
      return "A single path should leave a gate space.";
    let exitSpaceIndex = exitingSpaces[0];
    let exitSpace = board.spaces[exitSpaceIndex];
    if (!exitSpace || exitSpace.type !== Space.OTHER)
      return "Space after a gate space must be invisible.";
    if (exitSpace.subtype === SpaceSubtype.GATE)
      return "Gate spaces must be 2 or more spaces apart.";
    if (_getPointingSpaceIndices(exitSpaceIndex).length !== 1)
      return "A single path should connect to the space after a gate space.";

    let nextSpaces = getConnections(exitSpaceIndex, board)!;
    if (nextSpaces.length !== 1)
      return "A single path should leave the space after a gate space";
    let nextSpaceIndex = nextSpaces[0];
    let nextSpace = board.spaces[nextSpaceIndex];
    if (nextSpace.subtype === SpaceSubtype.GATE)
      return "Gate spaces must be 2 or more spaces apart.";

    // Check space/link structure before gate space.
    let enteringSpaces = _getPointingSpaceIndices(gateSpaceIndex);
    if (enteringSpaces.length !== 1)
      return "A single path should connect to a gate space.";
    let enteringSpaceIndex = enteringSpaces[0];
    let enteringSpace = board.spaces[enteringSpaceIndex];
    if (!enteringSpace || enteringSpace.type !== Space.OTHER)
      return "Space before a gate space must be invisible.";
    if (enteringSpace.subtype === SpaceSubtype.GATE)
      return "Gate spaces must be 2 or more spaces apart.";

    let prevSpaces = _getPointingSpaceIndices(enteringSpaceIndex);
    if (prevSpaces.length !== 1)
      return "A single path should connect to the space before a gate space.";
    //FIXME: This is broken.
    //if (prevSpaces[0].subtype === SpaceSubtype.GATE)
    //  return "Gate spaces must be 2 or more spaces apart.";
  };

  function _getPointingSpaceIndices(pointedAtIndex: number) {
    let pointingIndices: number[] = [];
    for (let startIdx in board.links) {
      let ends = getConnections(parseInt(startIdx), board)!;
      ends.forEach(end => {
        if (end === pointedAtIndex)
          pointingIndices.push(Number(startIdx));
      });
    }
    return pointingIndices;
  }

  return false;
};

const AdditionalBackgroundCodeIssue = createRule("ADDITIONALBGCODEISSUE", "Additional background code issue", ValidationLevel.ERROR);
AdditionalBackgroundCodeIssue.fails = async function(board: IBoard, args: any = {}) {
  const bgCode = getAdditionalBackgroundCode(board);
  if (!bgCode) {
    return false;
  }

  const bgIndices = makeFakeBgSyms(board);
  const game = romhandler.getROMGame()!;
  const failures = await testAdditionalBgCode(bgCode.code, bgCode.language, bgIndices, game);

  if (failures.length) {
    console.error(failures);
    return "The additional background code failed a test assembly.";
  }

  return false;
};
