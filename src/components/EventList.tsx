import * as React from "react";

import { IEvent, getAvailableEvents, getEvent, IEventParameter } from "../events/events";
import { createCustomEvent } from "../events/customevents";
import { getBoardEvent, getCurrentBoard, IEventInstance, IBoard } from "../boards";
import { copyObject } from "../utils/obj";
import { EventParameterType, EditorEventActivationType } from "../types";
import { promptUser, showMessage } from "../appControl";
import { getDistinctColor } from "../utils/colors";
import { setEventParamDropHandler } from "../utils/drag";
import { getImage } from "../images";

import eventpassingImage from "../img/toolbar/eventpassing.png";
import eventstandingImage from "../img/toolbar/eventstanding.png";
import eventbeforeturnImage from "../img/editor/boardproperties/eventperturn.png";
import eventafterturnImage from "../img/editor/boardproperties/eventafterturn.png";
import eventbeforeplayerturnImage from "../img/editor/boardproperties/eventbeforeplayerturn.png";
import eventbeforedicerollImage from "../img/editor/boardproperties/eventbeforediceroll.png";
import targetImage from "../img/events/target.png";


interface IEventsListProps {
  events?: IEventInstance[];
  board: IBoard;
  onEventAdded(event: any): void;
  onEventDeleted(event: IEventInstance): void;
  onEventActivationTypeToggle(event: IEventInstance): void;
  onEventParameterSet(event: IEventInstance, name: string, value: any): void;
  onEventMouseEnter?(event: IEventInstance): void;
  onEventMouseLeave?(event: IEventInstance): void;
}

interface IEventsListState {
  hoveredEvent: IEventInstance | null;
}

export class EventsList extends React.Component<IEventsListProps, IEventsListState> {
  render() {
    const events = this.props.events || [];
    let id = 0;
    const entries = events.map((event: IEventInstance) => {
      return (
        <EventEntry event={event} key={`${event.id}-${id++}`}
          board={this.props.board}
          onEventDeleted={this.onDelete}
          onEventActivationTypeToggle={this.props.onEventActivationTypeToggle}
          onEventParameterSet={this.props.onEventParameterSet}
          onEventMouseEnter={this.onMouseEnter}
          onEventMouseLeave={this.onMouseLeave} />
      );
    });

    return (
      <div className="eventsList">
        {entries}
        <EventAdd onEventAdded={this.props.onEventAdded} />
      </div>
    );
  }

  private onDelete = (event: IEventInstance) => {
    // First simulate mouse leave
    if (this.props.onEventMouseLeave && this.state.hoveredEvent === event) {
      this.setState({ hoveredEvent: null });
      this.props.onEventMouseLeave(event);
    }

    this.props.onEventDeleted(event);
  }

  private onMouseEnter = (event: IEventInstance) => {
    this.setState({ hoveredEvent: event });

    if (this.props.onEventMouseEnter) {
      this.props.onEventMouseEnter(event);
    }
  }

  private onMouseLeave = (event: IEventInstance) => {
    this.setState({ hoveredEvent: null });

    if (this.props.onEventMouseLeave) {
      this.props.onEventMouseLeave(event);
    }
  }
};

interface IEventEntryProps {
  event: IEventInstance;
  board: IBoard;
  onEventDeleted(event: IEventInstance): void;
  onEventActivationTypeToggle(event: IEventInstance): void;
  onEventParameterSet(event: IEventInstance, name: string, value: number): void;
  onEventMouseEnter?(event: IEventInstance): void;
  onEventMouseLeave?(event: IEventInstance): void;
}

class EventEntry extends React.Component<IEventEntryProps> {
  onEventDeleted = () => {
    this.props.onEventDeleted(this.props.event);
  }

  onEventActivationTypeToggle = () => {
    this.props.onEventActivationTypeToggle(this.props.event);
    this.forceUpdate();
  }

  onEventParameterSet = (name: string, value: any) => {
    this.props.onEventParameterSet(this.props.event, name, value);
    this.forceUpdate();
  }

  onEventMouseEnter = () => {
    if (this.props.onEventMouseEnter) {
      this.props.onEventMouseEnter(this.props.event);
    }
  }

  onEventMouseLeave = () => {
    if (this.props.onEventMouseLeave) {
      this.props.onEventMouseLeave(this.props.event);
    }
  }

  render() {
    let eventInstance = this.props.event;
    const event = getEvent(eventInstance.id, this.props.board);
    if (!event)
      return null;
    let name = event.name || eventInstance.id;

    let parameterButtons;
    if (event.parameters) {
      parameterButtons = (
        <EventParameterButtons
          parameters={event.parameters}
          eventInstance={eventInstance}
          onEventParameterSet={this.onEventParameterSet} />
      );
    }

    return (
      <div className="eventEntry"
        onMouseEnter={this.onEventMouseEnter}
        onMouseLeave={this.onEventMouseLeave}>
        <div className="eventEntryHeader">
          <span className="eventEntryName" title={name}>{name}</span>
          <div role="button" className="eventEntryDelete" onClick={this.onEventDeleted}
            title="Remove this event">✖</div>
        </div>
        <div className="eventEntryOptions">
          <EventActivationTypeToggle
            activationType={eventInstance.activationType}
            onEventActivationTypeToggle={this.onEventActivationTypeToggle} />
          {parameterButtons}
        </div>
      </div>
    );
  }
};

interface IEventParameterButtonsProps {
  parameters: IEventParameter[];
  eventInstance: IEventInstance;
  onEventParameterSet(name: string, value: unknown): void;
}

const EventParameterButtons: React.FC<IEventParameterButtonsProps> = props => {
  const { parameters, eventInstance, onEventParameterSet } = props;
  let currentSpaceParameterIndex = 0;

  return <>{parameters.map((parameter: IEventParameter) => {
    const parameterValue = eventInstance.parameterValues
      && eventInstance.parameterValues[parameter.name];
    switch (parameter.type) {
      case EventParameterType.Boolean:
        return (
          <EventBooleanParameterButton key={parameter.name}
            parameter={parameter}
            parameterValue={parameterValue}
            onEventParameterSet={onEventParameterSet} />
        );

      case EventParameterType.Number:
      case EventParameterType.PositiveNumber:
        return (
          <EventNumberParameterButton key={parameter.name}
            parameter={parameter}
            parameterValue={parameterValue}
            positiveOnly={parameter.type === "+Number"}
            onEventParameterSet={onEventParameterSet} />
        );

      case EventParameterType.Space:
        return (
          <EventSpaceParameterButton key={parameter.name}
            parameter={parameter}
            spaceParameterIndex={currentSpaceParameterIndex++}
            parameterValue={parameterValue}
            onEventParameterSet={onEventParameterSet} />
        );

      case EventParameterType.NumberArray:
      default:
        return null;
    }
  })}</>;
};

const ActivationTypeImages: { [activationType in EditorEventActivationType]: string | undefined } = {
  [EditorEventActivationType.WALKOVER]: eventpassingImage,
  [EditorEventActivationType.LANDON]: eventstandingImage,
  [EditorEventActivationType.BEGINORWALKOVER]: undefined,

  [EditorEventActivationType.BEFORE_TURN]: eventbeforeturnImage,
  [EditorEventActivationType.AFTER_TURN]: eventafterturnImage,
  [EditorEventActivationType.BEFORE_PLAYER_TURN]: eventbeforeplayerturnImage,
  [EditorEventActivationType.BEFORE_DICE_ROLL]: eventbeforedicerollImage,
};

const ActivationTypeText: { [activationType in EditorEventActivationType]: string | undefined } = {
  [EditorEventActivationType.WALKOVER]: "Passing event",
  [EditorEventActivationType.LANDON]: "Land-on event",
  [EditorEventActivationType.BEGINORWALKOVER]: undefined,

  [EditorEventActivationType.BEFORE_TURN]: "Before turn",
  [EditorEventActivationType.AFTER_TURN]: "After turn",
  [EditorEventActivationType.BEFORE_PLAYER_TURN]: "Before player turn",
  [EditorEventActivationType.BEFORE_DICE_ROLL]: "Before dice roll",
};

const ActivationTypeTitles: { [activationType in EditorEventActivationType]: string | undefined } = {
  [EditorEventActivationType.WALKOVER]: "Occurs when passing over the space",
  [EditorEventActivationType.LANDON]: "Occurs when landing on the space",
  [EditorEventActivationType.BEGINORWALKOVER]: undefined,

  [EditorEventActivationType.BEFORE_TURN]: "Occurs once per turn, prior to seeing \"PLAYER START\" for the first player",
  [EditorEventActivationType.AFTER_TURN]: "Occurs once per turn, prior to the Mini-Game selection list appearing",
  [EditorEventActivationType.BEFORE_PLAYER_TURN]: "Occurs for each player prior to seeing \"PLAYER START\" on their turn",
  [EditorEventActivationType.BEFORE_DICE_ROLL]: "Occurs for each player prior to the dice roll",
};

interface IEventActivationTypeToggleProps {
  activationType: EditorEventActivationType;
  onEventActivationTypeToggle(): void;
}

class EventActivationTypeToggle extends React.Component<IEventActivationTypeToggleProps> {
  onTypeToggle = () => {
    this.props.onEventActivationTypeToggle();
  }

  render() {
    let activationType = this.props.activationType;

    const activationTypeText = ActivationTypeText[activationType];
    const activationTypeToggleImg = ActivationTypeImages[activationType];

    return (
      <div className="eventEntryItem eventEntryActivationTypeItem"
        onClick={this.onTypeToggle}>
        {activationTypeToggleImg &&
          <img className="eventEntryActivationTypeToggle"
            alt="Activation Type"
            src={activationTypeToggleImg}
            title={ActivationTypeTitles[activationType]} />}
        <span>{activationTypeText}</span>
      </div>
    );
  }
};

interface IEventNumberParameterButtonProps {
  parameter: IEventParameter;
  parameterValue: any;
  positiveOnly?: boolean;
  onEventParameterSet(name: string, value: number): any;
}

class EventNumberParameterButton extends React.Component<IEventNumberParameterButtonProps> {
  render() {
    const parameterValue = this.props.parameterValue;
    const valueHasBeenSet = parameterValue !== undefined && parameterValue !== null;
    const tooltip = `(Number) ${this.props.parameter.name}: ${valueHasBeenSet ? parameterValue : "null"}`;
    return (
      <div className="eventEntryItem" title={tooltip}
        onClick={this.onParameterClicked}>
        <span className="eventEntryItemParameterName">{this.props.parameter.name}:</span>
        &nbsp;
        {valueHasBeenSet ?
          <span>{this.props.parameterValue}</span>
          : <span className="eventEntryItemParameterUnset">null</span>
        }
      </div>
    );
  }

  onParameterClicked = async () => {
    const name = this.props.parameter.name;
    const positiveOnly = this.props.positiveOnly;
    // Prompt the user for a value.
    const userValue = await promptUser(
      `Enter a${positiveOnly ? " positive " : " "}numeric value for the ${name} parameter:`
    );
    if (!userValue) {
      return; // Enter nothing, ignore response.
    }
    const value = parseInt(userValue);
    if (isNaN(value)) {
      showMessage("The value entered could not be parsed into a number");
      return;
    }
    if (this.props.positiveOnly && value <= 0) {
      showMessage("The value entered must be a positive number");
      return;
    }
    this.props.onEventParameterSet(name, value);
  }
};

interface IEventBooleanParameterButtonProps {
  parameter: IEventParameter;
  parameterValue: any;
  positiveOnly?: boolean;
  onEventParameterSet(name: string, value: boolean): any;
}

class EventBooleanParameterButton extends React.Component<IEventBooleanParameterButtonProps> {
  render() {
    const parameterValue = this.props.parameterValue;
    const valueHasBeenSet = parameterValue !== undefined && parameterValue !== null;
    const tooltip = `(Boolean) ${this.props.parameter.name}: ${valueHasBeenSet ? parameterValue : "null"}`;
    return (
      <div className="eventEntryItem" title={tooltip}
        onClick={this.onParameterClicked}>
        <span className="eventEntryItemParameterName">{this.props.parameter.name}:</span>
        &nbsp;
        {valueHasBeenSet ?
          <span>{this.props.parameterValue.toString()}</span>
          : <span className="eventEntryItemParameterUnset">null</span>
        }
      </div>
    );
  }

  onParameterClicked = () => {
    const parameterValue = this.props.parameterValue;
    this.props.onEventParameterSet(this.props.parameter.name, !parameterValue);
  }
};

interface IEventSpaceParameterButtonProps {
  parameter: any;
  spaceParameterIndex: number;
  parameterValue: any;
  positiveOnly?: boolean;
  onEventParameterSet(name: string, value: number): any;
}

class EventSpaceParameterButton extends React.Component<IEventSpaceParameterButtonProps> {
  render() {
    const parameterValue = this.props.parameterValue;
    const valueHasBeenSet = parameterValue !== undefined && parameterValue !== null;
    const tooltip = `(Space) ${this.props.parameter.name}: ${valueHasBeenSet ? "set" : "null"}`
      + "\nDrag to a space to associate it";
    const color = getDistinctColor(this.props.spaceParameterIndex);
    const colorStyle = { backgroundColor: `rgb(${color.join(", ")})` };
    return (
      <div className="eventEntryItem eventEntryItemDraggable" title={tooltip}
        draggable={true}
        onDragStart={this.onDragStart}
        onClick={this.onParameterClicked}>
        <img alt="Target" src={targetImage} />
        <span className="eventEntryItemParameterName">{this.props.parameter.name}:</span>
        &nbsp;
        {valueHasBeenSet ?
          <span className="eventEntryItemParameterSpaceSetWrapper">set
            <span style={colorStyle} className="eventEntryItemParameterColorSwatch"></span>
          </span>
          : <span className="eventEntryItemParameterUnset">null</span>
        }
      </div>
    );
  }

  onDragStart = (event: React.DragEvent<any>) => {
    setEventParamDropHandler(this.onSpaceDroppedOn);
    event.dataTransfer.setDragImage(getImage("targetImg"), 3, 0);
    event.dataTransfer.setData("text", JSON.stringify({
      isEventParamDrop: true
    }));
  }

  onSpaceDroppedOn = (spaceIndex: number) => {
    setEventParamDropHandler(null);
    if (spaceIndex >= 0) {
      this.props.onEventParameterSet(this.props.parameter.name, spaceIndex);
    }
  }

  onParameterClicked = () => {
    showMessage("To associate a space with this event, click and drag from this list entry and release over the target space.");
  }
};

interface IEventAddProps {
  onEventAdded(event: IEvent): void;
}

interface IEventAddState {
  selectedValue: number;
  libraryEvents: IEvent[];
  boardEvents: IEvent[];
}

class EventAdd extends React.Component<IEventAddProps, IEventAddState> {
  constructor(props: IEventAddProps) {
    super(props);

    const eventSets = _getEventsForAddList();
    this.state = {
      selectedValue: -1,
      libraryEvents: eventSets.libraryEvents.sort(_sortEvents),
      boardEvents: eventSets.boardEvents.sort(_sortEvents),
    }
  }

  private _refreshLists() {
    const eventSets = _getEventsForAddList();
    this.setState({
      libraryEvents: eventSets.libraryEvents.sort(_sortEvents),
      boardEvents: eventSets.boardEvents.sort(_sortEvents),
    });
  }

  onSelection = (e: any) => {
    let selectedOption = e.target.value;
    if (selectedOption.toString() === "-1")
      return;

    const [collection, index] = selectedOption.split(",");

    let event = copyObject((this as any).state[collection][index]);
    if (!event)
      throw new Error(`Could not add event ${selectedOption}`);

    this.props.onEventAdded(event);

    this._refreshLists();
  }

  render() {
    if (!this.state.libraryEvents.length && !this.state.boardEvents.length)
      return null;

    const eventOptions = [
      <option value="-1" key="-1" disabled>Add event</option>
    ];

    let index = 0;

    if (this.state.boardEvents.length) {
      eventOptions.push(
        <optgroup label="Board Events" key="boardEvents">
          {
            this.state.boardEvents.map(event => {
              const identifier = "boardEvents," + index++;
              return (
                <option value={identifier} key={identifier}>{event.name}</option>
              );
            })
          }
        </optgroup>
      );
    }

    index = 0;
    eventOptions.push(
      <optgroup label="Library Events" key="libraryEvents">
        {
          this.state.libraryEvents.map(event => {
            const identifier = "libraryEvents," + index++;
            return (
              <option value={identifier} key={identifier}>{event.name}</option>
            );
          })
        }
      </optgroup>
    )

    return (
      <div className="eventAddSelectEntry">
        <select className="eventAddSelect" value={this.state.selectedValue} onChange={this.onSelection}>
          {eventOptions}
        </select>
      </div>
    );
  }
};

function _getEventsForAddList() {
  let libraryEvents = getAvailableEvents();

  let boardEvents = [];
  const board = getCurrentBoard();
  for (let eventName in board.events) {
    const boardEvent = getBoardEvent(board, eventName)!;
    boardEvents.push(createCustomEvent(boardEvent.language, boardEvent.code));
  }

  // Don't show library events that are also in the board events list.
  // Force the user to conscientiously go to Events to "upgrade" the version
  // of an event in use.
  libraryEvents = libraryEvents.filter(event => {
    return !(event.name in board.events);
  });

  return {
    libraryEvents,
    boardEvents,
  };
}

function _sortEvents(a: IEvent, b: IEvent) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
