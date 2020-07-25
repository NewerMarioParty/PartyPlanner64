import * as React from "react";
import { playAnimation, stopAnimation, animationPlaying, renderBG, external, render, highlightSpaces, renderConnections, renderSpaces } from "./renderer";
import { addAnimBG, removeAnimBG, setBG, IBoard, getDeadEnds,
  supportsAnimationBackgrounds, supportsAdditionalBackgrounds,
  addAdditionalBG, removeAdditionalBG, boardIsROM, IEventInstance, addEventToBoard, removeEventFromBoard
} from "./boards";
import { openFile } from "./utils/input";
import { BoardType, View, EditorEventActivationType } from "./types";
import { $$log } from "./utils/debug";
import { changeView, promptUser, setHoveredBoardEvent } from "./appControl";
import { $setting, get } from "./views/settings";
import { isDebug } from "./debug";
import { SectionHeading } from "./propertiesshared";
import { useForceUpdate } from "./utils/react";
import { createEventInstance, IEvent } from "./events/events";
import { EventsList } from "./components/EventList";

import boardImage from "./img/header/board.png";
import setbgImage from "./img/header/setbg.png";
import editdetailsImage from "./img/header/editdetails.png";
import deadendImage from "./img/editor/boardproperties/deadend.png";
import animaddImage from "./img/toolbar/animadd.png";


interface IBoardPropertiesProps {
  currentBoard: IBoard;
}

export class BoardProperties extends React.Component<IBoardPropertiesProps> {
  state = { }

  render() {
    const board = this.props.currentBoard;
    const romBoard = boardIsROM(board);

    let animationBGList;
    if (supportsAnimationBackgrounds(board)) {
      animationBGList = (
        <BackgroundList list="animbg" board={board}
          title="Animation Backgrounds"
          onAddBackground={this.onAddAnimBG}
          onRemoveBackground={this.onRemoveAnimBG}>
          <AnimationPlayButton board={board} />
        </BackgroundList>
      );
    }

    let additionalBGList;
    if (supportsAdditionalBackgrounds(board)) {
      const advanced = get($setting.uiAdvanced);
      const hasBgs = board.additionalbg && board.additionalbg.length;
      const hasBgCode = !!board.additionalbgcode;
      additionalBGList = (advanced || hasBgs || hasBgCode) && (
        <BackgroundList list="additionalbg" board={board}
          title="Additional Backgrounds"
          onAddBackground={this.onAddAdditionalBG}
          onRemoveBackground={this.onRemoveAdditionalBG}>
          <AdditionalBackgroundConfigButton />
        </BackgroundList>
      );
    }

    return (
      <div className="properties">
        {isDebug() && <FindSpace />}
        <EditDetails romBoard={romBoard} />
        {!romBoard && <BGSelect gameVersion={board.game} boardType={board.type} />}
        {!romBoard && <CheckDeadEnds board={this.props.currentBoard} />}
        {animationBGList}
        {additionalBGList}
        {!romBoard && <BoardEventList board={board} />}
      </div>
    );
  }

  onAddAnimBG = (bg: string) => {
    addAnimBG(bg, this.props.currentBoard)
    this.forceUpdate();
  }

  onRemoveAnimBG = (index: number) => {
    removeAnimBG(index, this.props.currentBoard)
    this.forceUpdate();
  }

  onAddAdditionalBG = (bg: string) => {
    addAdditionalBG(bg, this.props.currentBoard)
    this.forceUpdate();
  }

  onRemoveAdditionalBG = (index: number) => {
    removeAdditionalBG(index, this.props.currentBoard)
    this.forceUpdate();
  }
};

interface IBGSelectProps {
  gameVersion: number;
  boardType: BoardType;
}

const BGSelect = class BGSelect extends React.Component<IBGSelectProps> {
  state = { }

  onChangeBg = () => {
    openFile("image/*", this.bgSelected);
  }

  bgSelected = (event: any) => {
    let file = event.target.files[0];
    if (!file)
      return;

    let reader = new FileReader();
    reader.onload = error => {
      setBG(reader.result);
      render();
    };
    reader.readAsDataURL(file);
  }

  render() {
    let title;
    switch (this.props.gameVersion) {
      case 1:
        title = "960 x 720";
        break;
      case 2:
      case 3:
        if (this.props.boardType === BoardType.DUEL)
          title = "896 x 672";
        else
          title = "1152 x 864";
        break;
    }

    return (
      <div className="propertiesActionButton" onClick={this.onChangeBg} title={title}>
        <img src={setbgImage} className="propertiesActionButtonImg" width="24" height="24" alt="" />
        <span className="propertiesActionButtonSpan">Change main background</span>
      </div>
    );
  }
};

interface IEditDetailsProps {
  romBoard: boolean;
}

const EditDetails = class EditDetails extends React.Component<IEditDetailsProps> {
  state = { }

  onEditDetails() {
    changeView(View.DETAILS);
  }

  render() {
    let text = this.props.romBoard ? "View board details" : "Edit board details";
    return (
      <div className="propertiesActionButton" onClick={this.onEditDetails}>
        <img src={editdetailsImage} className="propertiesActionButtonImg" width="24" height="24" alt="" />
        <span className="propertiesActionButtonSpan">{text}</span>
      </div>
    );
  }
};

interface ICheckDeadEndsProps {
  board: IBoard;
}

class CheckDeadEnds extends React.Component<ICheckDeadEndsProps> {
  private _noDeadEndsTimeout: any;

  state = {
    noDeadEnds: false, // Set to true briefly after running
  }

  checkForDeadEnds = () => {
    const deadEnds = getDeadEnds(this.props.board);
    $$log("Dead ends", deadEnds);

    if (deadEnds.length) {
      highlightSpaces(deadEnds);
    }
    else {
      this.setState({ noDeadEnds: true });
      this._noDeadEndsTimeout = setTimeout(() => {
        delete this._noDeadEndsTimeout;
        this.setState({ noDeadEnds: false });
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this._noDeadEndsTimeout) {
      delete this._noDeadEndsTimeout;
      clearTimeout(this._noDeadEndsTimeout);
    }
  }

  render() {
    let text, handler;
    if (this.state.noDeadEnds) {
      text = "✓ No dead ends";
    }
    else {
      text = "Check for dead ends";
      handler = this.checkForDeadEnds;
    }
    return (
      <div className="propertiesActionButton" onClick={handler}>
        <img src={deadendImage} className="propertiesActionButtonImg" width="24" height="24" alt="" />
        <span className="propertiesActionButtonSpan">{text}</span>
      </div>
    );
  }
};

interface IBackgroundListProps {
  board: IBoard;
  list: keyof IBoard;
  title: string;
  onAddBackground(bg: string): void;
  onRemoveBackground(index: number): void;
}

class BackgroundList extends React.Component<IBackgroundListProps> {
  state = { }

  render() {
    let bgs = this.props.board[this.props.list] || [];
    let i = 0;
    let entries = bgs.map((bg: string) => {
      i++;
      return (
        <BackgroundListEntry bg={bg} text={"Background " + i} key={i} index={i-1}
          onRemoveBackground={this.props.onRemoveBackground} />
      );
    });

    const romBoard = boardIsROM(this.props.board);

    let addButton;
    if (!romBoard) {
      addButton = <AddBackgroundButton onAddBackground={this.props.onAddBackground} />;
    }

    if (!addButton && !entries.length) {
      return null;
    }

    return (
      <div className="propertiesAnimationBGList">
        <SectionHeading text={this.props.title}>
          {this.props.children}
        </SectionHeading>
        {entries}
        {addButton}
      </div>
    );
  }
};

interface IBackgroundListEntryProps {
  bg: string;
  index: number;
  text: string;
  onRemoveBackground(index: number): void;
}

class BackgroundListEntry extends React.Component<IBackgroundListEntryProps> {
  state = { }

  onMouseDown = () => {
    if (!animationPlaying())
      external.setBGImage(this.props.bg);
  }

  restoreMainBG = () => {
    if (!animationPlaying())
      renderBG();
  }

  onRemove = () => {
    this.props.onRemoveBackground(this.props.index);
  }

  render() {
    return (
      <div className="propertiesActionButton"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.restoreMainBG}
        onMouseOut={this.restoreMainBG}>
        <img src={this.props.bg} className="propertiesActionButtonImg" width="24" height="24" alt="" />
        <span className="propertiesActionButtonSpan">{this.props.text}</span>
        <div role="button" className="animBGEntryDelete"
          onClick={this.onRemove}
          title="Remove this background">✖</div>
      </div>
    );
  }
};

interface IAddBackgroundButtonProps {
  onAddBackground(bg: string): void;
}

class AddBackgroundButton extends React.Component<IAddBackgroundButtonProps> {
  state = { }

  onAddAnimBg = () => {
    openFile("image/*", this.bgSelected);
  }

  bgSelected = (event: any) => {
    let file = event.target.files[0];
    if (!file)
      return;

    let reader = new FileReader();
    reader.onload = error => {
      this.props.onAddBackground(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="propertiesActionButton" onClick={this.onAddAnimBg}>
        <img src={animaddImage} className="propertiesActionButtonImg" width="24" height="24" alt="" />
        <span className="propertiesActionButtonSpan">Add background</span>
      </div>
    );
  }
};

interface IAnimationPlayButtonProps {
  board: IBoard;
}

interface IAnimationPlayButtonState {
  playing: boolean;
}

class AnimationPlayButton extends React.Component<IAnimationPlayButtonProps, IAnimationPlayButtonState> {
  constructor(props: IAnimationPlayButtonProps) {
    super(props);

    this.state = {
      playing: animationPlaying()
    }
  }

  render() {
    if (!this.props.board.animbg || !this.props.board.animbg.length) {
      return null;
    }

    let icon = this.state.playing ? "▮▮" : "►";
    return (
      <div className="bgListActionButton" onClick={this.onClick}>{icon}</div>
    );
  }

  onClick = () => {
    this.setState({ playing: !this.state.playing });

    if (!this.state.playing)
      playAnimation();
    else
      stopAnimation();
  }

  componentWillUnmount() {
    stopAnimation();
  }
};


function AdditionalBackgroundConfigButton() {
  const icon = "\u2699" // Gear
  return (
    <div className="bgListActionButton"
      title="Configure additional background usage"
      onClick={() => changeView(View.ADDITIONAL_BGS)}>
      {icon}
    </div>
  );
}

class FindSpace extends React.Component<{}> {
  state = { }

  async onFindSpace() {
    const value = await promptUser("Enter a space index:");
    if (value) {
      const spaceIndex = parseInt(value);
      if (!isNaN(spaceIndex)) {
        highlightSpaces([spaceIndex]);
      }
    }
  }

  render() {
    return (
      <div className="propertiesActionButton" onClick={this.onFindSpace}>
        <img src={boardImage} className="propertiesActionButtonImg" width="24" height="24" alt="" />
        <span className="propertiesActionButtonSpan">Find space by index</span>
      </div>
    );
  }
};

function getAvailableBoardActivationTypes(board: IBoard): EditorEventActivationType[] {
  if (board.game === 3) {
    return [
      EditorEventActivationType.BEFORE_TURN,
      EditorEventActivationType.AFTER_TURN,
      EditorEventActivationType.BEFORE_PLAYER_TURN,
      EditorEventActivationType.BEFORE_DICE_ROLL,
    ];
  }

  // AFTER_TURN is not confirmed in other games besides 3.
  return [
    EditorEventActivationType.BEFORE_TURN,
    EditorEventActivationType.BEFORE_PLAYER_TURN,
    EditorEventActivationType.BEFORE_DICE_ROLL,
  ];
}

interface IBoardEventListProps {
  board: IBoard;
}

const BoardEventList: React.FC<IBoardEventListProps> = props => {
  const forceUpdate = useForceUpdate();

  function onEventAdded(event: IEvent) {
    const eventInstance = createEventInstance(event, {
      activationType: EditorEventActivationType.BEFORE_PLAYER_TURN
    });
    addEventToBoard(props.board, eventInstance);
    render();
    forceUpdate();
  }

  function onEventDeleted(event: IEventInstance) {
    removeEventFromBoard(props.board, event);
    render();
    forceUpdate();
  }

  function onEventMouseEnter(event: IEventInstance) {
    setHoveredBoardEvent(event);
  }

  function onEventMouseLeave(event: IEventInstance) {
    setHoveredBoardEvent(null);
  }

  function onEventActivationTypeToggle(event: IEventInstance) {
    const availableTypes = getAvailableBoardActivationTypes(props.board);
    const curTypeIndex = availableTypes.indexOf(event.activationType);
    if (curTypeIndex === -1) {
      throw new Error(`Unexpected board event activation type ${event.activationType}`);
    }

    const nextType = availableTypes[(curTypeIndex + 1) % availableTypes.length];
    event.activationType = nextType;
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
        <EventsList events={props.board.boardevents}
          board={props.board}
          onEventAdded={onEventAdded}
          onEventDeleted={onEventDeleted}
          onEventActivationTypeToggle={onEventActivationTypeToggle}
          onEventParameterSet={onEventParameterSet}
          onEventMouseEnter={onEventMouseEnter}
          onEventMouseLeave={onEventMouseLeave} />
      </div>
    </>
  );
};