import * as ReactDOM from "react-dom";
import * as React from "react";
import { useRef, useCallback, useEffect } from "react";
import { ISpace, IBoard, getConnections, getSpaceIndex, getCurrentBoard, forEachEventParameter, IEventInstance } from "./boards";
import { BoardType, Space, SpaceSubtype, GameVersion, EventParameterType } from "./types";
import { degreesToRadians } from "./utils/number";
import { spaces } from "./spaces";
import { getImage } from "./images";
import { $$hex, $$log } from "./utils/debug";
import { RightClickMenu } from "./rightclick";
import { attachToCanvas, detachFromCanvas } from "./interaction";
import { getEvent } from "./events/events";
import { getDistinctColor } from "./utils/colors";
import { isDebug } from "./debug";
import { takeScreeny } from "./screenshot";
import { getMouseCoordsOnCanvas } from "./utils/canvas";

type Canvas = HTMLCanvasElement;
type CanvasContext = CanvasRenderingContext2D;

function getEditorContentTransform(board: IBoard, editor: HTMLElement) {
  let board_offset_x = Math.floor((editor.offsetWidth - board.bg.width) / 2);
  board_offset_x = Math.max(0, board_offset_x);
  let board_offset_y = Math.floor((editor.offsetHeight - board.bg.height) / 2);
  board_offset_y = Math.max(0, board_offset_y);

  return `translateX(${board_offset_x}px) translateY(${board_offset_y}px)`;
}

function _renderConnections(lineCanvas: Canvas, lineCtx: CanvasContext, board: IBoard, clear: boolean = true) {
  if (clear)
    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

  // Draw connecting lines.
  const links = board.links = board.links || {};
  for (let startSpace in links) {
    const x1 = board.spaces[startSpace].x;
    const y1 = board.spaces[startSpace].y;

    const endLinks = getConnections(parseInt(startSpace), board)!;
    let x2, y2;
    let bidirectional = false;
    for (let i = 0; i < endLinks.length; i++) {
      x2 = board.spaces[endLinks[i]].x;
      y2 = board.spaces[endLinks[i]].y;
      bidirectional = _isConnectedTo(links, endLinks[i], startSpace);
      if (bidirectional && parseInt(startSpace) > endLinks[i])
        continue;
      _drawConnection(lineCtx, x1, y1, x2, y2, bidirectional);
    }
  }
}

function _renderAssociations(
  canvas: Canvas, context: CanvasContext,
  board: IBoard, selectedSpaces?: ISpace[] | null
) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!selectedSpaces || selectedSpaces.length !== 1)
    return;

  // Draw associated spaces in event params.
  let lastEvent: IEventInstance;
  let associationNum = 0;
  forEachEventParameter(board, (parameter, event, space) => {
    if (parameter.type === "Space") {
      if (selectedSpaces[0] !== space)
        return; // Only draw associations for the selected space.

      // Reset coloring for each event.
      if (lastEvent !== event) {
        associationNum = 0;
      }
      lastEvent = event;

      const associatedSpaceIndex =
        event.parameterValues && event.parameterValues[parameter.name];
      if (typeof associatedSpaceIndex === "number") {
        const associatedSpace = board.spaces[associatedSpaceIndex];
        if (!associatedSpace)
          return; // I guess maybe this could happen?

        const dotsColor = `rgba(${getDistinctColor(associationNum).join(", ")}, 0.5)`;
        drawAssociation(context, space.x, space.y, associatedSpace.x, associatedSpace.y, dotsColor);
      }
      associationNum++;
    }
  });
}

function _isConnectedTo(links: any, start: number, end: any) {
  let startLinks = links[start];
  if (Array.isArray(startLinks))
    return startLinks.indexOf(parseInt(end)) >= 0;
  else
    return startLinks == end; /* eslint-disable-line */ // Can be string vs int?
}

export interface ISpaceRenderOpts {
  skipHiddenSpaces?: boolean;
  skipBadges?: boolean;
  skipCharacters?: boolean;
}

// opts:
//   skipHiddenSpaces: true to not render start, invisible spaces
//   skipBadges: false to skip event and star badges
function _renderSpaces(spaceCanvas: Canvas, spaceCtx: CanvasContext, board: IBoard, clear: boolean = true, opts: ISpaceRenderOpts = {}) {
  if (clear)
    spaceCtx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);

  // Draw spaces
  for (let index = 0; index < board.spaces.length; index++) {
    let space = board.spaces[index];
    if (space === null)
      continue;
    space.z = space.z || 0;

    drawSpace(spaceCtx, space, board, opts);
  }
}

function drawSpace(spaceCtx: CanvasContext, space: ISpace, board: IBoard, opts: ISpaceRenderOpts = {}) {
  const game = board.game || 1;
  const boardType = board.type || BoardType.NORMAL;
  const x = space.x;
  const y = space.y;
  const rotation = space.rotation;
  const type = space.type;
  const subtype = space.subtype;

  if (typeof rotation === "number") {
    spaceCtx.save();
    spaceCtx.translate(x, y);
    const adjustedAngleRad = -rotation;
    spaceCtx.rotate(degreesToRadians(adjustedAngleRad));
    spaceCtx.translate(-x, -y);
  }

  switch (type) {
    case Space.OTHER:
      if (opts.skipHiddenSpaces)
        break;
      if (game === 3)
        spaces.drawOther3(spaceCtx, x, y);
      else
        spaces.drawOther(spaceCtx, x, y);
      break;
    case Space.BLUE:
      if (game === 3)
        spaces.drawBlue3(spaceCtx, x, y);
      else
        spaces.drawBlue(spaceCtx, x, y);
      break;
    case Space.RED:
      if (game === 3)
        spaces.drawRed3(spaceCtx, x, y);
      else
        spaces.drawRed(spaceCtx, x, y);
      break;
    case Space.MINIGAME:
      if (boardType === BoardType.DUEL)
        spaces.drawMiniGameDuel3(spaceCtx, x, y);
      else
        spaces.drawMiniGame(spaceCtx, x, y);
      break;
    case Space.HAPPENING:
      if (game === 3) {
        if (boardType === BoardType.DUEL)
          spaces.drawHappeningDuel3(spaceCtx, x, y);
        else
          spaces.drawHappening3(spaceCtx, x, y);
      }
      else
        spaces.drawHappening(spaceCtx, x, y);
      break;
    case Space.STAR:
      if (game === 3)
        spaces.drawStar3(spaceCtx, x, y);
      else
        spaces.drawStar(spaceCtx, x, y);
      break;
    case Space.CHANCE:
      if (game === 3)
        spaces.drawChance3(spaceCtx, x, y);
      else if (game === 2)
        spaces.drawChance2(spaceCtx, x, y);
      else
        spaces.drawChance(spaceCtx, x, y);
      break;
    case Space.START:
      if (opts.skipHiddenSpaces)
        break;
      if (game === 3)
        spaces.drawStart3(spaceCtx, x, y);
      else
        spaces.drawStart(spaceCtx, x, y);
      break;
    case Space.SHROOM:
      spaces.drawShroom(spaceCtx, x, y);
      break;
    case Space.BOWSER:
      if (game === 3)
        spaces.drawBowser3(spaceCtx, x, y);
      else
        spaces.drawBowser(spaceCtx, x, y);
      break;
    case Space.ITEM:
      if (game === 3)
        spaces.drawItem3(spaceCtx, x, y);
      else
        spaces.drawItem2(spaceCtx, x, y);
      break;
    case Space.BATTLE:
      if (game === 3)
        spaces.drawBattle3(spaceCtx, x, y);
      else
        spaces.drawBattle2(spaceCtx, x, y);
      break;
    case Space.BANK:
      if (game === 3)
        spaces.drawBank3(spaceCtx, x, y);
      else
        spaces.drawBank2(spaceCtx, x, y);
      break;
    case Space.ARROW:
      spaces.drawArrow(spaceCtx, x, y, game);
      break;
    case Space.BLACKSTAR:
      spaces.drawBlackStar2(spaceCtx, x, y);
      break;
    case Space.GAMEGUY:
      if (boardType === BoardType.DUEL)
        spaces.drawGameGuyDuel3(spaceCtx, x, y);
      else
        spaces.drawGameGuy3(spaceCtx, x, y);
      break;
    case Space.DUEL_BASIC:
      spaces.drawDuelBasic(spaceCtx, x, y);
      break;
    case Space.DUEL_START_BLUE:
      if (opts.skipHiddenSpaces)
        break;
      spaces.drawStartDuelBlue(spaceCtx, x, y);
      break;
    case Space.DUEL_START_RED:
      if (opts.skipHiddenSpaces)
        break;
      spaces.drawStartDuelRed(spaceCtx, x, y);
      break;
    case Space.DUEL_POWERUP:
      spaces.drawDuelPowerup(spaceCtx, x, y);
      break;
    case Space.DUEL_REVERSE:
      spaces.drawDuelReverse(spaceCtx, x, y);
      break;
    default:
      spaces.drawUnknown(spaceCtx, x, y);
      break;
  }

  if (typeof rotation === "number") {
    spaceCtx.restore();
  }

  if (!opts.skipCharacters) {
    drawCharacters(spaceCtx, x, y, subtype, game);
  }

  if (!opts.skipBadges) {
    let offset = game === 3 ? 5 : 2;
    let startOffset = game === 3 ? 16 : 12
    if (space.events && space.events.length) {
      let iconY = y + offset;
      if (type === Space.START)
        iconY -= startOffset;
      spaceCtx.drawImage(__determineSpaceEventImg(space, board), x + offset, iconY);
    }

    if (space.star) {
      let iconY = y + offset;
      if (type === Space.START)
        iconY -= startOffset;
      spaceCtx.drawImage(getImage("starImg"), x - offset - 9, iconY);
    }

    if (space.subtype === SpaceSubtype.GATE) {
      let iconX = x - offset - 9;
      let iconY = y + offset - 5;
      spaceCtx.drawImage(getImage("gateImg"), iconX, iconY);
    }
  }

  if (isDebug()) {
    // Draw the space's index.
    spaceCtx.save();
    let index = getSpaceIndex(space);
    spaceCtx.fillStyle = "white";
    spaceCtx.strokeStyle = "black";
    spaceCtx.lineWidth = 2;
    spaceCtx.font = "bold 6pt Courier New";
    spaceCtx.textAlign = "center";
    let text = index.toString();
    spaceCtx.strokeText(text, x, y - 2);
    spaceCtx.fillText(text, x, y - 2);
    text = $$hex(index);
    spaceCtx.strokeText(text, x, y + 8);
    spaceCtx.fillText(text, x, y + 8);
    spaceCtx.restore();
  }
}

function drawCharacters(spaceCtx: CanvasContext, x: number, y: number, subtype: SpaceSubtype | undefined, game: number) {
  // Draw the standing Toad.
  if (subtype === SpaceSubtype.TOAD) {
    if (game === 3)
      spaceCtx.drawImage(getImage("mstarImg"), x - 15, y - 22);
    else
      spaceCtx.drawImage(getImage("toadImg"), x - 9, y - 22);
  }

  // Draw the standing Bowser.
  if (subtype === SpaceSubtype.BOWSER) {
    spaceCtx.drawImage(getImage("bowserImg"), x - 27, y - 45);
  }

  // Draw the standing Koopa Troopa.
  if (subtype === SpaceSubtype.KOOPA) {
    spaceCtx.drawImage(getImage("koopaImg"), x - 12, y - 22);
  }

  // Draw the standing Boo.
  if (subtype === SpaceSubtype.BOO) {
    spaceCtx.drawImage(getImage("booImg"), x - 13, y - 17);
  }

  // Draw the standing Goomba.
  if (subtype === SpaceSubtype.GOOMBA) {
    spaceCtx.drawImage(getImage("goombaImg"), x - 8, y - 12);
  }

  // Draw the bank.
  if (subtype === SpaceSubtype.BANK) {
    if (game === 2)
      spaceCtx.drawImage(getImage("bank2Img"), x - 9, y - 10);
    else
      spaceCtx.drawImage(getImage("bank3Img"), x - 17, y - 20);
  }

  // Draw the bank coin.
  if (subtype === SpaceSubtype.BANKCOIN) {
    spaceCtx.drawImage(getImage("bankcoinImg"), x - 10, y - 9);
  }

  // Draw the item shop.
  if (subtype === SpaceSubtype.ITEMSHOP) {
    if (game === 2)
      spaceCtx.drawImage(getImage("itemShop2Img"), x - 9, y - 10);
    else
      spaceCtx.drawImage(getImage("itemShop3Img"), x - 16, y - 20);
  }
}

const _PIOver1 = (Math.PI / 1);
function _drawConnection(lineCtx: CanvasContext, x1: number, y1: number, x2: number, y2: number, bidirectional?: boolean) {
  lineCtx.save();
  lineCtx.beginPath();
  lineCtx.strokeStyle = "rgba(255, 185, 105, 0.75)";
  lineCtx.lineCap = "round";
  lineCtx.lineWidth = 8;
  lineCtx.moveTo(x1, y1);
  lineCtx.lineTo(x2, y2);
  lineCtx.stroke();

  // Draw the little triangle arrow on top at halfway.
  let midX = (x1 + x2) / 2;
  let midY = (y1 + y2) / 2;
  lineCtx.translate(midX, midY);
  lineCtx.rotate(-Math.atan2(x1 - midX, y1 - midY) + _PIOver1);
  lineCtx.fillStyle = "#A15000";
  let adjust = bidirectional ? 3 : 0;
  lineCtx.moveTo(-4, -2 + adjust);
  lineCtx.lineTo(0, 2 + adjust);
  lineCtx.lineTo(4, -2 + adjust);
  lineCtx.fill();

  if (bidirectional) {
    lineCtx.moveTo(-4, 2 - adjust);
    lineCtx.lineTo(0, -2 - adjust);
    lineCtx.lineTo(4, 2 - adjust);
    lineCtx.fill();
  }

  lineCtx.restore();
}

function drawAssociation(lineCtx: CanvasContext,
  x1: number, y1: number, x2: number, y2: number,
  dotsColor: string
) {
  lineCtx.save();
  lineCtx.beginPath();
  lineCtx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  lineCtx.setLineDash([1, 8]);
  lineCtx.lineCap = "round";
  lineCtx.lineWidth = 6;
  lineCtx.moveTo(x1, y1);
  lineCtx.lineTo(x2, y2);
  lineCtx.stroke();
  lineCtx.restore();

  lineCtx.save();
  lineCtx.beginPath();
  lineCtx.strokeStyle = dotsColor;
  lineCtx.setLineDash([1, 8]);
  lineCtx.lineCap = "round";
  lineCtx.lineWidth = 4;
  lineCtx.moveTo(x1, y1);
  lineCtx.lineTo(x2, y2);
  lineCtx.stroke();
  lineCtx.restore();
}

/** Adds a glow around the selected spaces in the editor. */
function _renderSelectedSpaces(canvas: Canvas, context: CanvasContext, spaces?: ISpace[] | null) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!spaces || !spaces.length)
    return;

  for (let i = 0; i < spaces.length; i++) {
    const space = spaces[i];
    if (space) {
      context.save();
      context.beginPath();
      const radius = getCurrentBoard().game === 3 ? 18 : 12;
      context.arc(space.x, space.y, radius, 0, 2 * Math.PI);
      context.setLineDash([2, 2]);
      context.lineWidth = 2;
      context.fillStyle = "rgba(47, 70, 95, 0.35)";
      context.strokeStyle = "rgba(47, 70, 95, 1)";
      // context.shadowColor = "rgba(225, 225, 225, 1)";
      // context.shadowBlur = 2;
      // context.fillStyle = "rgba(225, 225, 225, 0.5)";
      context.fill();
      context.stroke();
      context.restore();
    }
  }
}

/** Does a strong red highlight around some spaces. */
function _highlightSpaces(canvas: Canvas, context: CanvasContext, spaces: number[]) {
  const currentBoard = getCurrentBoard();
  const radius = currentBoard.game === 3 ? 18 : 12;

  for (let i = 0; i < spaces.length; i++) {
    const space = currentBoard.spaces[spaces[i]];
    if (space) {
      context.save();
      context.beginPath();
      context.arc(space.x, space.y, radius, 0, 2 * Math.PI);
      context.shadowColor = "rgba(225, 225, 225, 1)";
      context.shadowBlur = 2;
      context.fillStyle = "rgba(255, 0, 0, 0.85)";
      context.fill();
      context.restore();
    }
  }
}

function _highlightBoardEventSpaces(canvas: Canvas, context: CanvasContext, eventInstance: IEventInstance) {
  const currentBoard = getCurrentBoard();
  const radius = currentBoard.game === 3 ? 18 : 12;

  const event = getEvent(eventInstance.id, currentBoard);
  if (event.parameters) {
    let associationNum = 0;
    for (const parameter of event.parameters) {
      if (parameter.type === EventParameterType.Space) {
        const spaceIndex = eventInstance.parameterValues?.[parameter.name];
        if (typeof spaceIndex === "number") {
          const space = currentBoard.spaces[spaceIndex];
          if (space) {
            context.save();
            context.beginPath();
            context.arc(space.x, space.y, radius, 0, 2 * Math.PI);
            context.shadowColor = "rgba(225, 225, 225, 1)";
            context.shadowBlur = 2;
            context.fillStyle = `rgba(${getDistinctColor(associationNum).join(", ")}, 0.9)`;
            context.fill();
            context.restore();
          }
        }
        associationNum++;
      }
    }
  }
}

function __determineSpaceEventImg(space: ISpace, board: IBoard) {
  if (space.events && space.events.length) {
    for (let i = 0; i < space.events.length; i++) {
      const spaceEvent = space.events[i];
      const event = getEvent(spaceEvent.id, board);
      if (!event)
        return getImage("eventErrorImg");
      if (event.parameters) {
        for (let p = 0; p < event.parameters.length; p++) {
          const parameter = event.parameters[p];
          if (!spaceEvent.parameterValues || !spaceEvent.parameterValues.hasOwnProperty(parameter.name)) {
            return getImage("eventErrorImg");
          }
        }
      }
    }
  }
  return getImage("eventImg");
}

let _boardBG: BoardBG | null;

interface BoardBGProps {
  board: IBoard;
}

class BoardBG extends React.Component<BoardBGProps> {
  state = {}

  componentDidMount() {
    this.renderContent();
    _boardBG = this;
  }

  componentWillUnmount() {
    _boardBG = null;
  }

  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    let board = this.props.board;
    let bgImg = this.getImage();
    let editor = bgImg.parentElement;
    let transformStyle = getEditorContentTransform(board, editor!);
    bgImg.style.transform = transformStyle;

    // Update the background image.
    if ((bgImg as any)._src !== board.bg.src || bgImg.width !== board.bg.width || bgImg.height !== board.bg.height) {
      bgImg.width = board.bg.width;
      bgImg.height = board.bg.height;
      this.setSource(board.bg.src, bgImg);
    }
  }

  getImage() {
    return ReactDOM.findDOMNode(this) as HTMLImageElement;
  }

  setSource(src: string, bgImg = this.getImage()) {
    bgImg.src = src;
    (bgImg as any)._src = src; // src can change after setting, and trick the renderContent check.
  }

  render() {
    return (
      <img className="editor_bg" alt="" />
    );
  }
};

let _animInterval: any;
let _currentFrame = -1;

export function playAnimation() {
  if (!_animInterval) {
    _animInterval = setInterval(_animationStep, 800);
  }
}

export function stopAnimation() {
  if (_animInterval) {
    clearInterval(_animInterval);
  }

  _animInterval = null;
  _currentFrame = -1;

  renderBG(); // Reset image
}

function _animationStep() {
  const board = getCurrentBoard();
  const animbgs = board.animbg;
  if (!_boardBG || !animbgs || !animbgs.length) {
    stopAnimation();
    return;
  }

  else if (_currentFrame >= 0 && _currentFrame < animbgs.length) {
    _boardBG.setSource(animbgs[_currentFrame]);
    _currentFrame++;
  }
  else {
    _currentFrame = -1;
  }

  if (_currentFrame === -1) {
    _boardBG.setSource(board.bg.src);
    _currentFrame++;
  }
}

let _boardLines: BoardLines | null;

interface BoardLinesProps {
  board: IBoard;
}

class BoardLines extends React.Component<BoardLinesProps> {
  state = {}

  componentDidMount() {
    this.renderContent();
    _boardLines = this;
  }

  componentWillUnmount() {
    _boardLines = null;
  }

  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    // Update lines connecting spaces
    let lineCanvas = ReactDOM.findDOMNode(this) as Canvas;
    let editor = lineCanvas.parentElement!;
    let board = this.props.board;
    let transformStyle = getEditorContentTransform(board, editor);
    lineCanvas.style.transform = transformStyle;
    if (lineCanvas.width !== board.bg.width || lineCanvas.height !== board.bg.height) {
      lineCanvas.width = board.bg.width;
      lineCanvas.height = board.bg.height;
    }
    _renderConnections(lineCanvas, lineCanvas.getContext("2d")!, board);
  }

  render() {
    return (
      <canvas className="editor_line_canvas"></canvas>
    );
  }
};

let _boardAssociations: BoardLines | null;

interface BoardAssociationsProps {
  board: IBoard;
  selectedSpaces?: ISpace[] | null;
}

class BoardAssociations extends React.Component<BoardAssociationsProps> {
  state = {}

  componentDidMount() {
    this.renderContent();
    _boardAssociations = this;
  }

  componentWillUnmount() {
    _boardAssociations = null;
  }

  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    // Update space parameter association lines
    let assocCanvas = ReactDOM.findDOMNode(this) as Canvas;
    let editor = assocCanvas.parentElement!;
    let board = this.props.board;
    let transformStyle = getEditorContentTransform(board, editor);
    assocCanvas.style.transform = transformStyle;
    if (assocCanvas.width !== board.bg.width || assocCanvas.height !== board.bg.height) {
      assocCanvas.width = board.bg.width;
      assocCanvas.height = board.bg.height;
    }
    _renderAssociations(assocCanvas, assocCanvas.getContext("2d")!, board, this.props.selectedSpaces);
  }

  render() {
    return (
      <canvas className="editor_association_canvas"></canvas>
    );
  }
};

let _boardSelectedSpaces: BoardSelectedSpaces | null;

interface BoardSelectedSpacesProps {
  board: IBoard;
  selectedSpaces?: ISpace[] | null;
  hoveredBoardEvent?: IEventInstance | null;
}

class BoardSelectedSpaces extends React.Component<BoardSelectedSpacesProps> {
  state = {}

  componentDidMount() {
    this.renderContent();
    _boardSelectedSpaces = this;
  }

  componentWillUnmount() {
    _boardSelectedSpaces = null;
  }

  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    // Update the current space indication
    const selectedSpacesCanvas = ReactDOM.findDOMNode(this) as Canvas;
    const editor = selectedSpacesCanvas.parentElement!;
    const board = this.props.board;
    const transformStyle = getEditorContentTransform(board, editor);
    selectedSpacesCanvas.style.transform = transformStyle;
    if (selectedSpacesCanvas.width !== board.bg.width || selectedSpacesCanvas.height !== board.bg.height) {
      selectedSpacesCanvas.width = board.bg.width;
      selectedSpacesCanvas.height = board.bg.height;
    }

    const context = selectedSpacesCanvas.getContext("2d")!;
    _renderSelectedSpaces(selectedSpacesCanvas, context, this.props.selectedSpaces);

    if (this.props.hoveredBoardEvent) {
      _highlightBoardEventSpaces(selectedSpacesCanvas, context, this.props.hoveredBoardEvent);
    }
  }

  highlightSpaces(spaces: number[]) {
    const selectedSpacesCanvas = ReactDOM.findDOMNode(this) as Canvas;
    _highlightSpaces(selectedSpacesCanvas, selectedSpacesCanvas.getContext("2d")!, spaces);
  }

  render() {
    return (
      <canvas className="editor_current_space_canvas"></canvas>
    );
  }
};

let _boardSpaces: BoardSpaces | null;

interface BoardSpacesProps {
  board: IBoard;
}

class BoardSpaces extends React.Component<BoardSpacesProps> {
  state = {}

  private __canvas: HTMLCanvasElement | null = null;

  componentDidMount() {
    attachToCanvas(this.__canvas!);

    this.renderContent();
    _boardSpaces = this;
  }

  componentWillUnmount() {
    detachFromCanvas(this.__canvas!);
    _boardSpaces = null;
  }

  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    // Update spaces
    const spaceCanvas = ReactDOM.findDOMNode(this) as Canvas;
    const editor = spaceCanvas.parentElement!;
    const board = this.props.board;
    const transformStyle = getEditorContentTransform(board, editor);
    spaceCanvas.style.transform = transformStyle;
    if (spaceCanvas.width !== board.bg.width || spaceCanvas.height !== board.bg.height) {
      spaceCanvas.width = board.bg.width;
      spaceCanvas.height = board.bg.height;
    }
    _renderSpaces(spaceCanvas, spaceCanvas.getContext("2d")!, board);
  }

  render() {
    return (
      <canvas className="editor_space_canvas" tabIndex={-1}
        ref={(el => this.__canvas = el)}
        onDragOver={undefined}></canvas>
    );
  }

  /** Draws the box as the user drags to select spaces. */
  drawSelectionBox = (xs: number, ys: number, xf: number, yf: number) => {
    const spaceCanvas = ReactDOM.findDOMNode(this) as Canvas;
    const ctx = spaceCanvas.getContext("2d")!;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "rgba(47, 70, 95, 0.5)";
    ctx.strokeStyle = "rgba(47, 70, 95, 1)";
    ctx.fillRect(Math.min(xs, xf), Math.min(ys, yf), Math.abs(xs - xf), Math.abs(ys - yf));
    ctx.strokeRect(Math.min(xs, xf), Math.min(ys, yf), Math.abs(xs - xf), Math.abs(ys - yf));
    ctx.restore();
  }
};

// Right-click menu overlay
let _boardOverlay: BoardOverlay | null;

interface BoardOverlayProps {
  board: IBoard;
}

interface BoardOverlayState {
  rightClickSpace: ISpace | null;
}

class BoardOverlay extends React.Component<BoardOverlayProps> {
  state: BoardOverlayState = {
    rightClickSpace: null
  }

  componentDidMount() {
    this.renderContent();
    _boardOverlay = this;
  }

  componentWillUnmount() {
    _boardOverlay = null;
  }

  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    let overlay = ReactDOM.findDOMNode(this) as HTMLElement;
    let editor = overlay.parentElement!;
    let transformStyle = getEditorContentTransform(this.props.board, editor);
    overlay.style.transform = transformStyle;
  }

  setRightClickMenu(space: ISpace | null) {
    this.setState({ rightClickSpace: space });
  }

  rightClickOpen() {
    return !!this.state.rightClickSpace;
  }

  render() {
    let menu;
    if (this.rightClickOpen())
      menu = <RightClickMenu space={this.state.rightClickSpace} />;
    return (
      <div className="editor_menu_overlay">
        {menu}
      </div>
    );
  }
};

const N64_SCREEN_WIDTH = 320;
const N64_SCREEN_HEIGHT = 240;

function getZoomedN64SizeForTelescope(gameVersion: GameVersion) {
  let WIDTH_ZOOM_FACTOR = 1;
  let HEIGHT_ZOOM_FACTOR = 1;
  switch (gameVersion) {
    case 1:
    case 2:
      break;

    case 3:
      WIDTH_ZOOM_FACTOR = 0.785;
      HEIGHT_ZOOM_FACTOR = 0.805;
      break;
  }

  const N64_WIDTH_ZOOMED = (N64_SCREEN_WIDTH * WIDTH_ZOOM_FACTOR);
  const N64_HEIGHT_ZOOMED = (N64_SCREEN_HEIGHT * HEIGHT_ZOOM_FACTOR);
  return {
    N64_WIDTH_ZOOMED,
    N64_HEIGHT_ZOOMED
  };
}

function addRecommendedBoundaryLine(board: IBoard, canvas: Canvas): void {
  const context = canvas.getContext("2d")!;
  context.lineWidth = 1;
  context.strokeStyle = "rgba(0, 0, 0, 0.5)";
  const { width, height} = board.bg;
  const { N64_WIDTH_ZOOMED, N64_HEIGHT_ZOOMED } = getZoomedN64SizeForTelescope(board.game);
  context.strokeRect(N64_WIDTH_ZOOMED / 2, N64_HEIGHT_ZOOMED / 2, width - N64_WIDTH_ZOOMED, height - N64_HEIGHT_ZOOMED);
}

interface ITelescopeViewerProps {
  board: IBoard;
}

const TelescopeViewer: React.FC<ITelescopeViewerProps> = (props) => {
  const canvasRef = useRef<Canvas | null>(null);
  const screenshotCanvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const editor = canvas.parentElement!;
    const transformStyle = getEditorContentTransform(props.board, editor);
    canvas.style.transform = transformStyle;
    if (canvas.width !== props.board.bg.width || canvas.height !== props.board.bg.height) {
      canvas.width = props.board.bg.width;
      canvas.height = props.board.bg.height;
    }

    addRecommendedBoundaryLine(props.board, canvas);
  }, [props.board]);

  useEffect(() => {
    screenshotCanvasRef.current = takeScreeny({ renderCharacters: true }).canvas;

    addRecommendedBoundaryLine(props.board, screenshotCanvasRef.current!);
  }, [props.board]);

  const onMouseMove = useCallback((ev: React.MouseEvent<Canvas>) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    const screenshotCanvas = screenshotCanvasRef.current;
    if (!screenshotCanvas) {
      return;
    }

    const [clickX, clickY] = getMouseCoordsOnCanvas(canvas, ev.clientX, ev.clientY);
    const { width, height } = props.board.bg;
    const { N64_WIDTH_ZOOMED, N64_HEIGHT_ZOOMED } = getZoomedN64SizeForTelescope(props.board.game);

    // The cutout from the board image, bounded like the game camera is.
    let sx = Math.max(0, clickX - (N64_WIDTH_ZOOMED / 2));
    let sy = Math.max(0, clickY - (N64_HEIGHT_ZOOMED / 2));
    const sWidth = N64_WIDTH_ZOOMED;
    const sHeight = N64_HEIGHT_ZOOMED;

    if (width - sx < N64_WIDTH_ZOOMED) {
      sx = width - N64_WIDTH_ZOOMED;
    }
    if (height - sy < N64_HEIGHT_ZOOMED) {
      sy = height - N64_HEIGHT_ZOOMED;
    }

    $$log(`Viewing (${sx}, ${sy}) - (${sx + sWidth}, ${sy + sHeight})\nMouse: (${clickX}, ${clickY}`);

    context.drawImage(
      screenshotCanvas,
      sx, sy, sWidth, sHeight,
      0, 0, width, height
    );

    // Simulate the black bars the game has, which restrict the viewing area further.
    const n64WidthRatio = width / N64_SCREEN_WIDTH;
    const n64HeightRatio = height / N64_SCREEN_HEIGHT;
    const horzBarHeight = 12 * n64HeightRatio;
    const vertBarWidth = 16 * n64WidthRatio;
    context.fillStyle = "black";
    context.fillRect(0, 0, width, horzBarHeight); // top
    context.fillRect(width - vertBarWidth, 0, vertBarWidth, height); // right
    context.fillRect(0, height - horzBarHeight, width, horzBarHeight); // bottom
    context.fillRect(0, 0, vertBarWidth, height); // left
  }, [props.board]);

  const onMouseLeave = useCallback(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    context.clearRect(0, 0, canvas.width, canvas.height);

    addRecommendedBoundaryLine(props.board, canvas);
  }, [props.board]);

  return (
    <canvas ref={canvasRef}
      className="editor_telescope_viewer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave} />
  );
};

interface IEditorProps {
  board: IBoard;
  selectedSpaces: ISpace[] | null;
  hoveredBoardEvent?: IEventInstance | null;
  telescoping?: boolean;
}

export const Editor = class Editor extends React.Component<IEditorProps> {
  state = {}

  componentDidMount() {
    window.addEventListener("resize", render, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", render);
  }

  componentDidUpdate() {}

  render() {
    const { board, selectedSpaces, telescoping } = this.props;
    return (
      <div className="editor">
        <BoardBG board={board} />
        <BoardLines board={board} />
        <BoardAssociations board={board}
          selectedSpaces={selectedSpaces} />
        <BoardSelectedSpaces board={board}
          selectedSpaces={selectedSpaces}
          hoveredBoardEvent={this.props.hoveredBoardEvent}/>
        <BoardSpaces board={board} />
        <BoardOverlay board={board} />
        {telescoping && <TelescopeViewer board={board} />}
      </div>
    );
  }
};

export function render() {
  if (_boardBG)
    _boardBG.renderContent();
  if (_boardLines)
    _boardLines.renderContent();
  if (_boardAssociations)
    _boardAssociations.renderContent();
  if (_boardSelectedSpaces)
    _boardSelectedSpaces.renderContent();
  if (_boardSpaces)
    _boardSpaces.renderContent();
}
export function renderBG() {
  if (_boardBG)
    _boardBG.renderContent();
}
export function renderConnections() {
  if (_boardLines)
    _boardLines.renderContent();
  if (_boardAssociations)
    _boardAssociations.renderContent();
}
export function renderSelectedSpaces() {
  if (_boardSelectedSpaces)
    _boardSelectedSpaces.renderContent();
}
export function renderSpaces() {
  if (_boardSpaces)
    _boardSpaces.renderContent();
}
export function updateRightClickMenu(space: ISpace | null) {
  if (_boardOverlay)
    _boardOverlay.setRightClickMenu(space);
}
export function rightClickOpen() {
  if (_boardOverlay)
    return _boardOverlay.rightClickOpen();
  return false;
}
export function drawConnection(x1: number, y1: number, x2: number, y2: number) {
  if (!_boardLines)
    return;
  let lineCtx = (ReactDOM.findDOMNode(_boardLines) as Canvas).getContext("2d")!;
  _drawConnection(lineCtx, x1, y1, x2, y2);
}

export function highlightSpaces(spaces: number[]) {
  if (_boardSelectedSpaces)
    _boardSelectedSpaces.highlightSpaces(spaces);
}

export function drawSelectionBox(xs: number, ys: number, xf: number, yf: number) {
  if (_boardSpaces)
  _boardSpaces.drawSelectionBox(xs, ys, xf, yf);
}

export function animationPlaying() {
  return !!_animInterval;
}

export const external = {
  getBGImage: function() {
    return _boardBG!.getImage();
  },
  setBGImage: function(src: string) {
    _boardBG!.setSource(src);
  },
  renderConnections: _renderConnections,
  renderSpaces: _renderSpaces
};
