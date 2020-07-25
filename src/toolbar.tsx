import * as React from "react";
import { makeKeyClick } from "./utils/react";
import { Action, BoardType } from "./types";
import { $setting, get } from "./views/settings";
import { currentBoardIsROM } from "./boards";
import { changeCurrentAction } from "./appControl";

import moveImage from "./img/toolbar/move.png";
import lineImage from "./img/toolbar/line.png";
import stickylineImage from "./img/toolbar/stickyline.png";
import rotateImage from "./img/toolbar/rotate.png";
import eraserImage from "./img/toolbar/eraser.png";
import telescopeImage from "./img/toolbar/telescope.png";
import blueImage from "./img/toolbar/blue.png";
import blue3Image from "./img/toolbar/blue3.png";
import redImage from "./img/toolbar/red.png";
import red3Image from "./img/toolbar/red3.png";
import happeningImage from "./img/toolbar/happening.png";
import happening3Image from "./img/toolbar/happening3.png";
import chanceImage from "./img/toolbar/chance.png";
import chance2Image from "./img/toolbar/chance2.png";
import chance3Image from "./img/toolbar/chance3.png";
import bowserImage from "./img/toolbar/bowser.png";
import bowser3Image from "./img/toolbar/bowser3.png";
import minigameImage from "./img/toolbar/minigame.png";
import shroomImage from "./img/toolbar/shroom.png";
import otherImage from "./img/toolbar/other.png";
import starImage from "./img/toolbar/star.png";
import blackstarImage from "./img/toolbar/blackstar.png";
import arrowImage from "./img/toolbar/arrow.png";
import startImage from "./img/toolbar/start.png";
import itemImage from "./img/toolbar/item.png";
import item3Image from "./img/toolbar/item3.png";
import battleImage from "./img/toolbar/battle.png";
import battle3Image from "./img/toolbar/battle3.png";
import bankImage from "./img/toolbar/bank.png";
import bank3Image from "./img/toolbar/bank3.png";
import gameguyImage from "./img/toolbar/gameguy.png";
import banksubtypeImage from "./img/toolbar/banksubtype.png";
import banksubtype2Image from "./img/toolbar/banksubtype2.png";
import bankcoinsubtypeImage from "./img/toolbar/bankcoinsubtype.png";
import itemshopsubtypeImage from "./img/toolbar/itemshopsubtype.png";
import itemshopsubtype2Image from "./img/toolbar/itemshopsubtype2.png";
import toadImage from "./img/toolbar/toad.png";
import mstarImage from "./img/toolbar/mstar.png";

import booImage from "./img/toolbar/boo.png";
import bowsercharacterImage from "./img/toolbar/bowsercharacter.png";
import koopaImage from "./img/toolbar/koopa.png";
import markstarImage from "./img/toolbar/markstar.png";
import markgateImage from "./img/toolbar/markgate.png";

import basic3Image from "./img/toolbar/basic3.png";
import minigameduel3Image from "./img/toolbar/minigameduel3.png";
import reverse3Image from "./img/toolbar/reverse3.png";
import happeningduel3Image from "./img/toolbar/happeningduel3.png";
import gameguyduelImage from "./img/toolbar/gameguyduel.png";
import powerupImage from "./img/toolbar/powerup.png";
import startblueImage from "./img/toolbar/startblue.png";
import startredImage from "./img/toolbar/startred.png";

import "./css/toolbar.scss";

// This used to be a toolbar... now it is the toolbox contents.

interface IToolbarItem {
  name: string;
  icon: string;
  type: Action;
  draggable?: boolean;
  advanced?: boolean;
}

interface IToolbarSpacer {
  spacer: true;
}

type ToolbarItem = IToolbarItem | IToolbarSpacer

const mp1_actions: ToolbarItem[] = [
  { "name": "Move spaces", "icon": moveImage, "type": Action.MOVE },
  { "name": "Connect spaces", "icon": lineImage, "type": Action.LINE },
  { "name": "Connect multiple spaces in one click", "icon": stickylineImage, "type": Action.LINE_STICKY },
  { "name": "Erase spaces and lines", "icon": eraserImage, "type": Action.ERASE },
  { "name": "Telescope tool: move your cursor over the map to visualize how it will look during gameplay", "icon": telescopeImage, "type": Action.TELESCOPE },
  { "spacer": true},
  { "name": "Add blue space", "icon": blueImage, "type": Action.ADD_BLUE, draggable: true },
  { "name": "Add red space", "icon": redImage, "type": Action.ADD_RED, draggable: true },
  { "name": "Add happening space", "icon": happeningImage, "type": Action.ADD_HAPPENING, draggable: true },
  { "name": "Add chance time space", "icon": chanceImage, "type": Action.ADD_CHANCE, draggable: true },
  { "name": "Add Bowser space", "icon": bowserImage, "type": Action.ADD_BOWSER, draggable: true },
  { "name": "Add Mini-Game space", "icon": minigameImage, "type": Action.ADD_MINIGAME, draggable: true },
  { "name": "Add shroom space", "icon": shroomImage, "type": Action.ADD_SHROOM, draggable: true },
  { "name": "Add invisible space", "icon": otherImage, "type": Action.ADD_OTHER, draggable: true },
  { "name": "Add star space (decoration)", "icon": starImage, "type": Action.ADD_STAR, draggable: true, advanced: true },
  { "name": "Add start space", "icon": startImage, "type": Action.ADD_START, draggable: true, advanced: true },
  { "spacer": true},
  // {
  //   "group": "Other spaces",
  //   "icon": otherImage,
  //   "actions": [
      { "name": "Add Toad", "icon": toadImage, "type": Action.ADD_TOAD_CHARACTER, draggable: true },
      { "name": "Add Boo", "icon": booImage, "type": Action.ADD_BOO_CHARACTER, draggable: true },
      { "name": "Add Bowser", "icon": bowsercharacterImage, "type": Action.ADD_BOWSER_CHARACTER, draggable: true },
      { "name": "Add Koopa Troopa", "icon": koopaImage, "type": Action.ADD_KOOPA_CHARACTER, draggable: true },
      { "name": "Mark space as hosting star", "icon": markstarImage, "type": Action.MARK_STAR },
  //   ]
  // }
];

const mp2_actions: ToolbarItem[] = [
  { "name": "Move spaces", "icon": moveImage, "type": Action.MOVE },
  { "name": "Connect spaces", "icon": lineImage, "type": Action.LINE },
  { "name": "Connect multiple spaces in one click", "icon": stickylineImage, "type": Action.LINE_STICKY },
  { "name": "Erase spaces and lines", "icon": eraserImage, "type": Action.ERASE },
  { "name": "Telescope tool: move your cursor over the map to visualize how it will look during gameplay", "icon": telescopeImage, "type": Action.TELESCOPE },
  { "spacer": true},
  { "name": "Add blue space", "icon": blueImage, "type": Action.ADD_BLUE, draggable: true },
  { "name": "Add red space", "icon": redImage, "type": Action.ADD_RED, draggable: true },
  { "name": "Add happening space", "icon": happeningImage, "type": Action.ADD_HAPPENING, draggable: true },
  { "name": "Add chance time space", "icon": chance2Image, "type": Action.ADD_CHANCE, draggable: true },
  { "name": "Add Bowser space", "icon": bowserImage, "type": Action.ADD_BOWSER, draggable: true },
  { "name": "Add item space", "icon": itemImage, "type": Action.ADD_ITEM, draggable: true },
  { "name": "Add battle space", "icon": battleImage, "type": Action.ADD_BATTLE, draggable: true },
  { "name": "Add bank space", "icon": bankImage, "type": Action.ADD_BANK, draggable: true },
  { "name": "Add invisible space", "icon": otherImage, "type": Action.ADD_OTHER, draggable: true },
  { "name": "Add star space (decoration)", "icon": starImage, "type": Action.ADD_STAR, draggable: true, advanced: true },
  { "name": "Add black star space (decoration)", "icon": blackstarImage, "type": Action.ADD_BLACKSTAR, draggable: true, advanced: true },
  { "name": "Add start space", "icon": startImage, "type": Action.ADD_START, draggable: true, advanced: true },
  { "name": "Add arrow space", "icon": arrowImage, "type": Action.ADD_ARROW, draggable: true },
  { "spacer": true},
  { "name": "Add Toad", "icon": toadImage, "type": Action.ADD_TOAD_CHARACTER, draggable: true },
  { "name": "Add Boo", "icon": booImage, "type": Action.ADD_BOO_CHARACTER, draggable: true },
  { "name": "Add bank", "icon": banksubtype2Image, "type": Action.ADD_BANK_SUBTYPE, draggable: true },
  { "name": "Add bank coin stack", "icon": bankcoinsubtypeImage, "type": Action.ADD_BANKCOIN_SUBTYPE, draggable: true },
  { "name": "Add item shop", "icon": itemshopsubtype2Image, "type": Action.ADD_ITEMSHOP_SUBTYPE, draggable: true },
  { "name": "Mark space as hosting star", "icon": markstarImage, "type": Action.MARK_STAR },
];

const mp3_actions: ToolbarItem[] = [
  { "name": "Move spaces", "icon": moveImage, "type": Action.MOVE },
  { "name": "Connect spaces", "icon": lineImage, "type": Action.LINE },
  { "name": "Connect multiple spaces in one click", "icon": stickylineImage, "type": Action.LINE_STICKY },
  { "name": "Erase spaces and lines", "icon": eraserImage, "type": Action.ERASE },
  { "name": "Rotate arrow spaces", "icon": rotateImage, "type": Action.ROTATE },
  { "name": "Telescope tool: move your cursor over the map to visualize how it will look during gameplay", "icon": telescopeImage, "type": Action.TELESCOPE },
  { "spacer": true},
  { "name": "Add blue space", "icon": blue3Image, "type": Action.ADD_BLUE, draggable: true },
  { "name": "Add red space", "icon": red3Image, "type": Action.ADD_RED, draggable: true },
  { "name": "Add happening space", "icon": happening3Image, "type": Action.ADD_HAPPENING, draggable: true },
  { "name": "Add chance time space", "icon": chance3Image, "type": Action.ADD_CHANCE, draggable: true },
  { "name": "Add Bowser space", "icon": bowser3Image, "type": Action.ADD_BOWSER, draggable: true },
  { "name": "Add item space", "icon": item3Image, "type": Action.ADD_ITEM, draggable: true },
  { "name": "Add battle space", "icon": battle3Image, "type": Action.ADD_BATTLE, draggable: true },
  { "name": "Add bank space", "icon": bank3Image, "type": Action.ADD_BANK, draggable: true },
  { "name": "Add Game Guy space", "icon": gameguyImage, "type": Action.ADD_GAMEGUY, draggable: true },
  { "name": "Add invisible space", "icon": otherImage, "type": Action.ADD_OTHER, draggable: true },
  { "name": "Add star space (decoration)", "icon": starImage, "type": Action.ADD_STAR, draggable: true, advanced: true },
  { "name": "Add start space", "icon": startImage, "type": Action.ADD_START, draggable: true, advanced: true },
  { "name": "Add arrow space", "icon": arrowImage, "type": Action.ADD_ARROW, draggable: true },
  { "spacer": true},
  { "name": "Add Millennium Star", "icon": mstarImage, "type": Action.ADD_TOAD_CHARACTER, draggable: true },
  { "name": "Add Boo", "icon": booImage, "type": Action.ADD_BOO_CHARACTER, draggable: true },
  { "name": "Add bank", "icon": banksubtypeImage, "type": Action.ADD_BANK_SUBTYPE, draggable: true },
  { "name": "Add bank coin stack", "icon": bankcoinsubtypeImage, "type": Action.ADD_BANKCOIN_SUBTYPE, draggable: true },
  { "name": "Add item shop", "icon": itemshopsubtypeImage, "type": Action.ADD_ITEMSHOP_SUBTYPE, draggable: true },
  { "name": "Mark space as hosting star", "icon": markstarImage, "type": Action.MARK_STAR },
  { "name": "Mark space as Skeleton Key gate", "icon": markgateImage, "type": Action.MARK_GATE },
];

const mp3_duel_actions: ToolbarItem[] = [
  { "name": "Move spaces", "icon": moveImage, "type": Action.MOVE },
  { "name": "Connect spaces", "icon": lineImage, "type": Action.LINE },
  { "name": "Connect multiple spaces in one click", "icon": stickylineImage, "type": Action.LINE_STICKY },
  { "name": "Erase spaces and lines", "icon": eraserImage, "type": Action.ERASE },
  { "name": "Telescope tool: move your cursor over the map to visualize how it will look during gameplay", "icon": telescopeImage, "type": Action.TELESCOPE },
  { "spacer": true},
  { "name": "Add basic space", "icon": basic3Image, "type": Action.ADD_DUEL_BASIC, draggable: true },
  { "name": "Add Mini-Game space", "icon": minigameduel3Image, "type": Action.ADD_MINIGAME, draggable: true },
  { "name": "Add reverse space", "icon": reverse3Image, "type": Action.ADD_DUEL_REVERSE, draggable: true },
  { "name": "Add happening space", "icon": happeningduel3Image, "type": Action.ADD_HAPPENING, draggable: true },
  { "name": "Add Game Guy space", "icon": gameguyduelImage, "type": Action.ADD_GAMEGUY, draggable: true },
  { "name": "Add power-up space", "icon": powerupImage, "type": Action.ADD_DUEL_POWERUP, draggable: true },
  { "name": "Add invisible space", "icon": otherImage, "type": Action.ADD_OTHER, draggable: true },
  { "name": "Add blue start space", "icon": startblueImage, "type": Action.ADD_DUEL_START_BLUE, draggable: true, advanced: true },
  { "name": "Add red start space", "icon": startredImage, "type": Action.ADD_DUEL_START_RED, draggable: true, advanced: true },
];

function _itemIsSpacer(item: ToolbarItem): item is IToolbarSpacer {
  return "spacer" in item && item.spacer;
}

function _getActions(gameVersion: number, boardType: BoardType) {
  let actions;
  switch (gameVersion) {
    case 1:
      actions = mp1_actions;
      break;
    case 2:
      actions = mp2_actions;
      break;
    case 3:
      if (boardType === BoardType.DUEL)
        actions = mp3_duel_actions;
      else
        actions = mp3_actions;
      break;
    default:
      throw new Error(`Unknown game version found by Toolbar (${gameVersion})`);
  }

  if (!get($setting.uiAdvanced)) {
    actions = actions.filter(a => !(a as IToolbarItem).advanced);
  }

  return actions;
}

function _buttonClicked(type: Action) {
  changeCurrentAction(type);
}

interface IToolbarProps {
  currentAction: Action;
  gameVersion: number;
  boardType: BoardType;
}

export class Toolbar extends React.Component<IToolbarProps> {
  state = {}

  render() {
    if (currentBoardIsROM()) {
      return (
        <div className="toolbarReadonly">Board is readonly.</div>
      );
    }

    let i = 0;
    let actions = _getActions(this.props.gameVersion, this.props.boardType);
    let actionElements = actions.map(item => {
      // if (item.group) {
      //   return (
      //     <ToolbarGroup key={item.group} icon={item.icon} actions={item.actions} currentAction={this.props.currentAction} />
      //   )
      // }

      if (_itemIsSpacer(item)) {
        return (
          <ToolbarSpacer key={"spacer" + i++} />
        );
      }

      let isCurrentAction = this.props.currentAction === item.type;
      return (
        <ToolbarButton key={item.type} current={isCurrentAction} action={item} />
      );
    });
    return (
      <div className="toolbar" role="toolbar">
        {actionElements}
      </div>
    );
  }
};

// const ToolbarGroup = class ToolbarGroup extends React.Component {
//   render() {
//     var btnClass = "toolbarGroup";
//     var icon;
//     var actions = this.props.actions.map(item => {
//       if (item.type === this.props.currentAction)
//         icon = item.icon;
//       var isCurrentAction = this.props.currentAction === item.type;
//       return (
//         <ToolbarButton key={item.type} action={item} current={isCurrentAction} />
//       );
//     });
//     if (icon)
//       btnClass += " selected"; // Select the group if one of its actions is selected.
//     else
//       icon = this.props.icon;
//     var left = actions.length * -50;
//     var maxWidth = actions.length * 50;
//     if (actions.length >= 5) {
//       left /= 2;
//       maxWidth /= 2;
//     }
//     var panelStyle = { left: left, maxWidth: maxWidth };
//     return (
//       <div className={btnClass} title={this.props.group} role="button" tabIndex="0">
//         <img className="toolbarIcon" src={icon}></img>
//         <div className="toolbarGroupPanel" style={panelStyle}>
//           {actions}
//         </div>
//       </div>
//     );
//   }
// };

interface IToolbarButtonProps {
  action: IToolbarItem;
  current: boolean;
}

class ToolbarButton extends React.Component<IToolbarButtonProps> {
  handleClick = () => {
    _buttonClicked(this.props.action.type);
  }

  onDragStart = (event: any) => {
    if (!this.props.action.draggable)
      return; // Disobeying draggable? Its more likely than you think!

    // Drag-drop is not really recommended, but user testing found it intuitive.
    event.dataTransfer.setData("text", JSON.stringify({
      action: this.props.action
    }));
  }

  render() {
    let btnClass = "toolbarButton";
    if (this.props.current)
      btnClass += " selected";
    return (
      <div className={btnClass} title={this.props.action.name}
        role="button" tabIndex={0}
        onClick={this.handleClick}
        onKeyDown={makeKeyClick(this.handleClick)}
        draggable={this.props.action.draggable} onDragStart={this.onDragStart}>
        <img className="toolbarIcon" src={this.props.action.icon} alt=""></img>
      </div>
    );
  }
};

const ToolbarSpacer = class ToolbarSpacer extends React.Component {
  render() {
    return (
      <div className="toolbarSpacer" role="separator"></div>
    );
  }
};
