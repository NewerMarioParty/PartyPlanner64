import * as React from "react";
import { BoardType, SpaceSubtype, Space, EditorEventActivationType, GameVersion } from "./types";
import { ISpace, addEventToSpace, removeEventFromSpace, getCurrentBoard, IEventInstance } from "./boards";
import { EventsList } from "./components/EventList";
import { $setting, get } from "./views/settings";
import { makeKeyClick, useForceUpdate } from "./utils/react";
import { IEvent, createEventInstance } from "./events/events";
import { render, renderConnections, renderSpaces } from "./renderer";
import { changeDecisionTree } from "./appControl";
import { Button } from "./controls";
import { $$log } from "./utils/debug";

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

import basic3Image from "./img/toolbar/basic3.png";
import minigameduel3Image from "./img/toolbar/minigameduel3.png";
import reverse3Image from "./img/toolbar/reverse3.png";
import happeningduel3Image from "./img/toolbar/happeningduel3.png";
import gameguyduelImage from "./img/toolbar/gameguyduel.png";
import powerupImage from "./img/toolbar/powerup.png";
import startblueImage from "./img/toolbar/startblue.png";
import startredImage from "./img/toolbar/startred.png";
import { SectionHeading } from "./propertiesshared";

interface ISpacePropertiesProps {
  boardType: BoardType;
  gameVersion: GameVersion;
  selectedSpaces: ISpace[] | null;
}

export class SpaceProperties extends React.Component<ISpacePropertiesProps> {
  state = { }

  onTypeChanged = (type: Space, subtype?: SpaceSubtype) => {
    const selectedSpaces = this.props.selectedSpaces!;
    for (const space of selectedSpaces) {
      if (type !== undefined) {
        space.type = type;
        if (space.rotation) {
          delete space.rotation;
        }
      }
      if (subtype !== undefined)
        space.subtype = subtype;
      else
        delete space.subtype;
    }
    render();
    this.forceUpdate();
  }

  onStarCheckChanged = (checked: boolean) => {
    const selectedSpaces = this.props.selectedSpaces!;
    for (const space of selectedSpaces) {
      space.star = !!checked;
    }
    render();
    this.forceUpdate();
  }

  render() {
    const spaces = this.props.selectedSpaces;
    if (!spaces || !spaces.length) {
      return (
        <div className="propertiesEmptyText">No space selected.</div>
      );
    }

    const multipleSelections = spaces.length > 1;

    const curSpace = spaces[0];
    const gameVersion = this.props.gameVersion;
    const boardType = this.props.boardType;
    const isDuel = boardType === BoardType.DUEL;
    const spaceToggleTypes = _getSpaceTypeToggles(gameVersion, boardType);
    const spaceToggleSubTypes = _getSpaceSubTypeToggles(gameVersion, boardType);

    let currentType: Space | undefined = curSpace.type;
    let currentSubtype = curSpace.subtype;
    let hostsStarChecked = curSpace.star || false;
    let hostsStarIndeterminate = false;
    if (multipleSelections) {
      // Only show a type as selected if all spaces are the same.
      for (const space of spaces) {
        if (!space)
          continue;
        if (space.type !== currentType)
          currentType = undefined;
        if (space.subtype !== currentSubtype)
          currentSubtype = undefined;
        if (space.star !== hostsStarChecked)
          hostsStarIndeterminate = true;
      }
    }

    return (
      <div className="properties">
        <div className="propertiesPadded">
          {!multipleSelections && <SpaceCoords space={curSpace} />}
          <SpaceTypeToggle toggleTypes={spaceToggleTypes}
            type={currentType}
            subtype={currentSubtype}
            typeChanged={this.onTypeChanged} />
          <SpaceTypeToggle toggleTypes={spaceToggleSubTypes}
            type={currentType}
            subtype={currentSubtype}
            typeChanged={this.onTypeChanged} />
          {!isDuel && <SpaceStarCheckbox checked={hostsStarChecked}
            indeterminate={hostsStarIndeterminate}
            onStarCheckChanged={this.onStarCheckChanged} />}
          <SpaceDecisionTreeButton space={curSpace} />
        </div>
        {!multipleSelections &&
          <SpaceEventList selectedSpace={curSpace} />}
      </div>
    );
  }
};

interface ISpaceCoordsProps {
  space: ISpace;
}

class SpaceCoords extends React.Component<ISpaceCoordsProps, any> {
  state: any = {}

  onChangeX = (event: any) => {
    var newX = parseInt(event.target.value, 10);
    var isBlank = event.target.value === "";
    var curBgWidth = getCurrentBoard().bg.width;
    if ((!isBlank && isNaN(newX)) || newX < 0 || newX > curBgWidth)
      return;
    if (!this.state.oldX)
      this.setState({ oldX: this.props.space.x });
    (this as any).props.space.x = isBlank ? "" : newX;
    this.forceUpdate();
  }

  onChangeY = (event: any) => {
    let newY = parseInt(event.target.value, 10);
    let isBlank = event.target.value === "";
    let curBgHeight = getCurrentBoard().bg.height;
    if ((!isBlank && isNaN(newY)) || newY < 0 || newY > curBgHeight)
      return;
    if (!this.state.oldY)
      this.setState({ oldY: this.props.space.y });
    (this as any).props.space.y = isBlank ? "" : newY;
    this.forceUpdate();
  }

  onChangeRotation = (event: any) => {
    let newRot = parseInt(event.target.value, 10);
    let isBlank = event.target.value === "";
    if ((!isBlank && isNaN(newRot)) || newRot < 0 || newRot > 360)
      return;
    if (!this.state.oldRot)
      this.setState({ oldRot: this.props.space.rotation });
    if (!newRot)
      delete this.props.space.rotation;
    else
      this.props.space.rotation = newRot;
    this.forceUpdate();
  }

  onCoordSet = () => {
    this.props.space.x = this.props.space.x || 0;
    this.props.space.y = this.props.space.y || 0;
    render();
    this.setState({ oldX: undefined, oldY: undefined, oldRot: undefined });
    this.forceUpdate();
  }

  onKeyUp = (event: any) => {
    if (event.key === "Enter")
      this.onCoordSet();
  }

  render() {
    let space = this.props.space;
    if (!space)
      return null;

    // const isArrow = space.type === Space.ARROW;

    return (
      <React.Fragment>
        <div className="spaceCoordRow">
          <span className="coordLabel">X:</span>
          <input className="coordInput" type="text" value={space.x} onChange={this.onChangeX}
            onBlur={this.onCoordSet} onKeyUp={this.onKeyUp} />
          <span className="coordLabel">Y:</span>
          <input className="coordInput" type="text" value={space.y} onChange={this.onChangeY}
            onBlur={this.onCoordSet} onKeyUp={this.onKeyUp} />
        </div>
        {/* {isArrow &&
          <div className="spaceCoordRow">
            <span className="coordLabel">Rotation:</span>
              <input className="coordInput" type="text" value={space.rotation} onChange={this.onChangeRotation}
                onBlur={this.onCoordSet} onKeyUp={this.onKeyUp} />
          </div>
        } */}
      </React.Fragment>
    );
  }
};

interface SpaceTypeToggleItem {
  name: string;
  icon: string;
  type?: Space
  subtype?: SpaceSubtype;
  advanced?: boolean;
}

const SpaceTypeToggleTypes_1: SpaceTypeToggleItem[] = [
  // Types
  { name: "Change to blue space", icon: blueImage, type: Space.BLUE },
  { name: "Change to red space", icon: redImage, type: Space.RED },
  { name: "Change to happening space", icon: happeningImage, type: Space.HAPPENING },
  { name: "Change to chance time space", icon: chanceImage, type: Space.CHANCE },
  { name: "Change to Mini-Game space", icon: minigameImage, type: Space.MINIGAME },
  { name: "Change to shroom space", icon: shroomImage, type: Space.SHROOM },
  { name: "Change to Bowser space", icon: bowserImage, type: Space.BOWSER },
  { name: "Change to invisible space", icon: otherImage, type: Space.OTHER },
  { name: "Change to star space", icon: starImage, type: Space.STAR, advanced: true },
  { name: "Change to start space", icon: startImage, type: Space.START, advanced: true },
];
const SpaceSubTypeToggleTypes_1: SpaceTypeToggleItem[] = [
  // Subtypes
  { name: "Show Toad", icon: toadImage, subtype: SpaceSubtype.TOAD },
  { name: "Show Boo", icon: booImage, subtype: SpaceSubtype.BOO },
  { name: "Show Bowser", icon: bowsercharacterImage, subtype: SpaceSubtype.BOWSER },
  { name: "Show Koopa Troopa", icon: koopaImage, subtype: SpaceSubtype.KOOPA },
];

const SpaceTypeToggleTypes_2: SpaceTypeToggleItem[] = [
  // Types
  { name: "Change to blue space", icon: blueImage, type: Space.BLUE },
  { name: "Change to red space", icon: redImage, type: Space.RED },
  { name: "Change to happening space", icon: happeningImage, type: Space.HAPPENING },
  { name: "Change to chance time space", icon: chance2Image, type: Space.CHANCE },
  { name: "Change to Bowser space", icon: bowserImage, type: Space.BOWSER },
  { name: "Change to item space", icon: itemImage, type: Space.ITEM },
  { name: "Change to battle space", icon: battleImage, type: Space.BATTLE },
  { name: "Change to bank space", icon: bankImage, type: Space.BANK },
  { name: "Change to invisible space", icon: otherImage, type: Space.OTHER },
  { name: "Change to star space", icon: starImage, type: Space.STAR, advanced: true },
  { name: "Change to black star space", icon: blackstarImage, type: Space.BLACKSTAR, advanced: true },
  { name: "Change to start space", icon: startImage, type: Space.START, advanced: true },
  { name: "Change to arrow space", icon: arrowImage, type: Space.ARROW },
];
const SpaceSubTypeToggleTypes_2: SpaceTypeToggleItem[] = [
  // Subtypes
  { name: "Show Toad", icon: toadImage, subtype: SpaceSubtype.TOAD },
  { name: "Show Boo", icon: booImage, subtype: SpaceSubtype.BOO },
  { name: "Show bank", icon: banksubtype2Image, subtype: SpaceSubtype.BANK },
  { name: "Show bank coin stack", icon: bankcoinsubtypeImage, subtype: SpaceSubtype.BANKCOIN },
  { name: "Show item shop", icon: itemshopsubtype2Image, subtype: SpaceSubtype.ITEMSHOP },
];

const SpaceTypeToggleTypes_3: SpaceTypeToggleItem[] = [
  // Types
  { name: "Change to blue space", icon: blue3Image, type: Space.BLUE },
  { name: "Change to red space", icon: red3Image, type: Space.RED },
  { name: "Change to happening space", icon: happening3Image, type: Space.HAPPENING },
  { name: "Change to chance time space", icon: chance3Image, type: Space.CHANCE },
  { name: "Change to Bowser space", icon: bowser3Image, type: Space.BOWSER },
  { name: "Change to item space", icon: item3Image, type: Space.ITEM },
  { name: "Change to battle space", icon: battle3Image, type: Space.BATTLE },
  { name: "Change to bank space", icon: bank3Image, type: Space.BANK },
  { name: "Change to Game Guy space", icon: gameguyImage, type: Space.GAMEGUY },
  { name: "Change to invisible space", icon: otherImage, type: Space.OTHER },
  { name: "Change to star space", icon: starImage, type: Space.STAR, advanced: true },
  { name: "Change to start space", icon: startImage, type: Space.START, advanced: true },
  { name: "Change to arrow space", icon: arrowImage, type: Space.ARROW },
];
const SpaceSubTypeToggleTypes_3: SpaceTypeToggleItem[] = [
  // Subtypes
  { name: "Show Millenium Star", icon: mstarImage, subtype: SpaceSubtype.TOAD },
  { name: "Show Boo", icon: booImage, subtype: SpaceSubtype.BOO },
  { name: "Show bank", icon: banksubtypeImage, subtype: SpaceSubtype.BANK },
  { name: "Show bank coin stack", icon: bankcoinsubtypeImage, subtype: SpaceSubtype.BANKCOIN },
  { name: "Show item shop", icon: itemshopsubtypeImage, subtype: SpaceSubtype.ITEMSHOP },
];

const SpaceTypeToggleTypes_3_Duel: SpaceTypeToggleItem[] = [
  // Types
  { name: "Change to basic space", icon: basic3Image, type: Space.DUEL_BASIC },
  { name: "Change to Mini-Game space", icon: minigameduel3Image, type: Space.MINIGAME },
  { name: "Change to reverse space", icon: reverse3Image, type: Space.DUEL_REVERSE },
  { name: "Change to happening space", icon: happeningduel3Image, type: Space.HAPPENING },
  { name: "Change to Game Guy space", icon: gameguyduelImage, type: Space.GAMEGUY },
  { name: "Change to power-up space", icon: powerupImage, type: Space.DUEL_POWERUP },
  { name: "Change to invisible space", icon: otherImage, type: Space.OTHER },
  { name: "Change to blue start space", icon: startblueImage, type: Space.DUEL_START_BLUE, advanced: true },
  { name: "Change to red start space", icon: startredImage, type: Space.DUEL_START_RED, advanced: true },
];

function _getSpaceTypeToggles(gameVersion: 1 | 2 | 3, boardType: BoardType) {
  let types: SpaceTypeToggleItem[] = [];
  switch (gameVersion) {
    case 1:
      types = SpaceTypeToggleTypes_1;
      break;
    case 2:
      types = SpaceTypeToggleTypes_2;
      break;
    case 3:
      switch (boardType) {
        case BoardType.DUEL:
          types = SpaceTypeToggleTypes_3_Duel;
          break;
        default:
          types = SpaceTypeToggleTypes_3;
          break;
      }
      break;
  }

  if (!get($setting.uiAdvanced)) {
    types = types.filter(a => !a.advanced);
  }

  return types;
}

function _getSpaceSubTypeToggles(gameVersion: 1 | 2 | 3, boardType: BoardType) {
  let types: SpaceTypeToggleItem[] = [];
  switch (gameVersion) {
    case 1:
      types = SpaceSubTypeToggleTypes_1;
      break;
    case 2:
      types = SpaceSubTypeToggleTypes_2;
      break;
    case 3:
      switch (boardType) {
        case BoardType.DUEL:
          types = []; //SpaceSubTypeToggleTypes_3_Duel;
          break;
        default:
          types = SpaceSubTypeToggleTypes_3;
          break;
      }
      break;
  }

  if (!get($setting.uiAdvanced)) {
    types = types.filter(a => !a.advanced);
  }

  return types;
}

interface ISpaceTypeToggleProps {
  type?: Space;
  subtype?: SpaceSubtype;
  toggleTypes: any;
  typeChanged(type?: Space, subtype?: SpaceSubtype): any;
}

class SpaceTypeToggle extends React.Component<ISpaceTypeToggleProps> {
  onTypeChanged = (type: Space, subtype?: SpaceSubtype) => {
    this.props.typeChanged(type, subtype);
  }

  render() {
    const type = this.props.type;
    if (type === Space.START && !get($setting.uiAdvanced))
      return null; // Can't switch start space type
    const subtype = this.props.subtype;
    const onTypeChanged = this.onTypeChanged;
    const toggleTypes = this.props.toggleTypes || [];
    const toggles = toggleTypes.map((item: any) => {
      const key = item.type + "-" + item.subtype;
      const selected = (item.type !== undefined && type === item.type)
        || (item.subtype !== undefined && subtype !== undefined && subtype === item.subtype);
      return (
        <SpaceTypeToggleBtn key={key} type={item.type} subtype={item.subtype}
          icon={item.icon} title={item.name} selected={selected} typeChanged={onTypeChanged} />
      );
    });

    return (
      <div className="spaceToggleContainer">
        {toggles}
      </div>
    );
  }
};

interface ISpaceTypeToggleBtnProps {
  selected: boolean;
  icon: string;
  title: string;
  type: Space;
  subtype?: SpaceSubtype;
  typeChanged(type: Space, subtype?: SpaceSubtype): any;
}

class SpaceTypeToggleBtn extends React.Component<ISpaceTypeToggleBtnProps> {
  onTypeChanged = () => {
    if (this.props.subtype !== undefined && this.props.selected)
      this.props.typeChanged(this.props.type, undefined);
    else
      this.props.typeChanged(this.props.type, this.props.subtype);
  }

  render() {
    let btnClass = "spaceToggleButton";
    if (this.props.selected)
      btnClass += " selected";
    const size = this.props.subtype !== undefined ? 25 : 20;
    return (
      <div className={btnClass} title={this.props.title} tabIndex={0}
        onClick={this.onTypeChanged}
        onKeyDown={makeKeyClick(this.onTypeChanged)}>
        <img src={this.props.icon} height={size} width={size} alt="" />
      </div>
    );
  }
};

interface ISpaceStarCheckboxProps {
  checked: boolean;
  indeterminate: boolean;
  onStarCheckChanged(changed: boolean): void;
}

class SpaceStarCheckbox extends React.Component<ISpaceStarCheckboxProps> {
  private checkboxEl: HTMLInputElement | null = null;

  render() {
    return (
      <div className="starCheckbox">
        <label><input type="checkbox"
          ref={el => this.checkboxEl = el}
          checked={this.props.checked}
          value={this.props.checked as any}
          onChange={this.onChange} /> Hosts star</label>
      </div>
    );
  }

  onChange = (event: any) => {
    this.props.onStarCheckChanged(event.target.checked);
  }

  componentDidMount() {
    this.checkboxEl!.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps: ISpaceStarCheckboxProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.checkboxEl!.indeterminate = this.props.indeterminate;
    }
  }
};

interface ISpaceDecisionTreeButtonProps {
  space: ISpace;
}

function SpaceDecisionTreeButton(props: ISpaceDecisionTreeButtonProps) {
  if (!props.space.aiTree) {
    return null;
  }

  return (
    <Button css="propertiesAiTreeButton" onClick={() => {
      $$log("Showing decision tree", props.space.aiTree);
      changeDecisionTree(props.space.aiTree!);
    }}>
      AI Decision Tree
    </Button>
  );
}

interface ISpaceEventListProps {
  selectedSpace: ISpace;
}

const SpaceEventList: React.FC<ISpaceEventListProps> = props => {
  const forceUpdate = useForceUpdate();

  function onEventAdded(event: IEvent) {
    const space = props.selectedSpace;
    const spaceEvent = createEventInstance(event);
    addEventToSpace(getCurrentBoard(), space, spaceEvent);
    render();
    forceUpdate();
  }

  function onEventDeleted(event: IEventInstance) {
    const space = props.selectedSpace;
    removeEventFromSpace(space, event);
    render();
    forceUpdate();
  }

  function onEventActivationTypeToggle(event: IEventInstance) {
    if (event.activationType === EditorEventActivationType.WALKOVER)
      event.activationType = EditorEventActivationType.LANDON;
    else
      event.activationType = EditorEventActivationType.WALKOVER;
  }

  function onEventParameterSet(event: IEventInstance, name: string, value: number | boolean) {
    if (!event.parameterValues) {
      event.parameterValues = {};
    }
    event.parameterValues[name] = value;
    renderConnections();
    renderSpaces();
  }

  return (
    <>
      <SectionHeading text="Events" />
      <div className="propertiesPadded">
        <EventsList events={props.selectedSpace.events}
          board={getCurrentBoard()}
          onEventAdded={onEventAdded}
          onEventDeleted={onEventDeleted}
          onEventActivationTypeToggle={onEventActivationTypeToggle}
          onEventParameterSet={onEventParameterSet} />
      </div>
    </>
  );
};