import * as React from "react";
import { updateCreateEventViewInstance, ICreateEventView, EventDetailsForm } from "./createevent_shared";
import { Game, EventExecutionType, getExecutionTypeName, getGameName, EventCodeLanguage } from "../types";
import { ICustomEvent, CustomAsmHelper } from "../events/customevents";
import { CodeMirrorWrapper } from "../components/codemirrorwrapper";
import { IEventParameter } from "../events/events";
import { getCurrentEvent, confirmFromUser } from "../appControl";

const _defaultEventAsm = `; NAME:
; GAMES:
; EXECUTION: Direct

ADDIU SP SP -4
SW RA 0(SP)

; Your code here
; For code examples, see:
; https://github.com/PartyPlanner64/events

LW RA 0(SP)
JR RA
ADDIU SP SP 4`;

interface ICreateEventViewState {
  eventName: string,
  supportedGames: Game[],
  executionType: EventExecutionType,
  asm: string,
  parameters: IEventParameter[];
  hasError?: boolean;
  originalAsm?: string;
}

export class CreateASMEventView extends React.Component<{}, ICreateEventViewState> implements ICreateEventView {
  constructor(props: {}) {
    super(props);

    const currentEvent = getCurrentEvent() as ICustomEvent;
    if (currentEvent) {
      this.state = {
        eventName: currentEvent.name,
        supportedGames: currentEvent.supportedGames,
        executionType: currentEvent.executionType,
        asm: currentEvent.asm,
        parameters: currentEvent.parameters!,
        originalAsm: currentEvent.asm,
      };
    }
    else {
      this.state = {
        eventName: "",
        supportedGames: [],
        executionType: EventExecutionType.DIRECT,
        asm: _defaultEventAsm,
        parameters: [],
      };
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>An error was encountered.</p>
      );
    }

    return (
      <div className="createEventViewContainer">
        <CodeMirrorWrapper
          mode="mips-pp64"
          className="eventcodemirror createeventcodemirror"
          value={this.state.asm}
          onChange={this.onAsmChange} />
        <EventDetailsForm name={this.state.eventName}
          onEventNameChange={this.onEventNameChange}
          supportedGames={this.state.supportedGames}
          onGameToggleClicked={this.onGameToggleClicked}
          executionType={this.state.executionType}
          onExecTypeToggleClicked={this.onExecTypeToggleClicked}
          parameters={this.state.parameters}
          onAddEventParameter={this.onAddEventParameter}
          onRemoveEventParameter={this.onRemoveEventParameter} />
      </div>
    );
  }

  componentDidMount() {
    updateCreateEventViewInstance(this);
  }

  componentWillUnmount() {
    updateCreateEventViewInstance(null);
  }

  onEventNameChange = (eventName: string) => {
    const newState = { ...this.state, eventName };
    this.setState({ eventName });
    this.syncTextToStateVars(newState, this.state.asm);
  }

  onAsmChange = (asm: string) => {
    this.setState({ asm });
    this.syncStateVarsToText(asm);
  }

  updateLastSavedCode(code: string) {
    this.setState({ originalAsm: code });
  }

  onGameToggleClicked = (id: any, pressed: boolean) => {
    const supportedGames = this.state.supportedGames;
    const gameIndex = supportedGames.indexOf(id);

    let newState;
    if (gameIndex === -1 && pressed) {
      this.setState({
        supportedGames: [...supportedGames, id],
      });
      newState = { ...this.state };
      newState.supportedGames = [...supportedGames, id];
    }
    else if (gameIndex >= 0 && !pressed) {
      supportedGames.splice(gameIndex, 1);
      this.setState({
        supportedGames: supportedGames,
      });
      newState = { ...this.state };
      newState.supportedGames = supportedGames;
    }

    if (newState) {
      this.syncTextToStateVars(newState, this.state.asm);
    }
  }

  onExecTypeToggleClicked = (id: any, pressed: boolean) => {
    let newState = { ...this.state };
    newState.executionType = id;
    this.setState({ executionType: id });
    this.syncTextToStateVars(newState, this.state.asm);
  }

  onAddEventParameter = (entry: IEventParameter) => {
    let newState = { ...this.state };
    newState.parameters = [...this.state.parameters, entry];
    this.setState(newState);
    this.syncTextToStateVars(newState, this.state.asm);
  }

  onRemoveEventParameter = (removedEntry: IEventParameter) => {
    let newState = { ...this.state };
    newState.parameters = this.state.parameters.filter(entry => {
      return entry.name !== removedEntry.name;
    });
    this.setState(newState);
    this.syncTextToStateVars(newState, this.state.asm);
  }

  getEventName = () => {
    return this.state.eventName;
  }

  getSupportedGames = () => {
    return this.state.supportedGames;
  }

  getExecutionType = () => {
    return this.state.executionType;
  }

  getEventCode = () => {
    return this.state.asm;
  }

  getLanguage(): EventCodeLanguage {
    return EventCodeLanguage.MIPS;
  }

  /** Ensures the ASM text includes the discrete properties. */
  syncTextToStateVars = (newState: ICreateEventViewState, existingAsm: string) => {
    let newAsm = __clearDiscreteProperties(existingAsm, [
      "NAME", "GAMES", "EXECUTION", "PARAM"
    ]);
    newAsm = "\n" + newAsm;
    newAsm = __writeDiscretePropertyArray(newAsm, "PARAM", newState.parameters.map(param => {
      return `${param.type}|${param.name}`;
    }));
    newAsm = __writeDiscreteProperty(newAsm, "EXECUTION", getExecutionTypeName(newState.executionType));
    newAsm = __writeDiscreteProperty(newAsm, "GAMES", newState.supportedGames.map(getGameName).join(","));
    newAsm = __writeDiscreteProperty(newAsm, "NAME", newState.eventName.trim());

    if (newAsm !== existingAsm) {
      this.setState({ asm: newAsm });
    }
  }

  /** Pulls out discrete properties from the ASM text back into state. */
  syncStateVarsToText = (asm: string) => {
    let value: any = __readDiscreteProperty(asm, "NAME");
    if (value !== null) {
      this.setState({ eventName: (value || "").trim() });
    }

    value = CustomAsmHelper.readSupportedGames(asm);
    if (value !== null) {
      this.setState({ supportedGames: value });
    }

    value = CustomAsmHelper.readExecutionType(asm);
    if (value) {
      this.setState({ executionType: value });
    }

    value = CustomAsmHelper.readParameters(asm);
    if (value) {
      this.setState({ parameters: value });
    }
  }

  promptExit = async () => {
    const asm = this.state.asm;
    const oldAsm = this.state.originalAsm;
    if (!oldAsm || oldAsm !== asm) {
      return await confirmFromUser("Are you sure you want to exit without saving the event?");
    }
    return true;
  }
}

function __clearDiscreteProperties(asm: string, properties: string[]) {
  return CustomAsmHelper.clearDiscreteProperties(asm, properties);
}

function __writeDiscreteProperty(asm: string, propName: string, value: string) {
  return CustomAsmHelper.writeDiscreteProperty(asm, propName, value, ";");
}

function __writeDiscretePropertyArray(asm: string, propName: string, values: string[]) {
  return CustomAsmHelper.writeDiscretePropertyArray(asm, propName, values, ";");
}

function __readDiscreteProperty(asm: string, propName: string) {
  return CustomAsmHelper.readDiscreteProperty(asm, propName);
}
