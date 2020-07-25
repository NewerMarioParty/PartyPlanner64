import * as React from "react";
import { updateCreateEventViewInstance, ICreateEventView, EventDetailsForm } from "./createevent_shared";
import { Game, EventExecutionType, getExecutionTypeName, getGameName, EventCodeLanguage } from "../types";
import { ICustomEvent, CustomAsmHelper, validateCustomEvent, createCustomEvent } from "../events/customevents";
import { CodeMirrorWrapper } from "../components/codemirrorwrapper";
import { IEventParameter } from "../events/events";
import { getCurrentEvent, confirmFromUser, showMessage } from "../appControl";
import { TabStrip, Tab } from "../components/tabstrip";

const _defaultEventC = `// NAME:
// GAMES:
// EXECUTION: Direct

#include "ultra64.h"

void main() {
    // Your code here!
    // For code examples, see:
    // https://github.com/PartyPlanner64/events
}`;

interface ICreateEventViewState {
  eventName: string,
  supportedGames: Game[],
  executionType: EventExecutionType,
  code: string,
  parameters: IEventParameter[];
  hasError?: boolean;
  originalCode?: string;
  compiledAsm: string | null;
  activeCodeTabIndex: number;
}

export class CreateCEventView extends React.Component<{}, ICreateEventViewState> implements ICreateEventView {
  constructor(props: {}) {
    super(props);

    const currentEvent = getCurrentEvent() as ICustomEvent;
    if (currentEvent) {
      this.state = {
        eventName: currentEvent.name,
        supportedGames: currentEvent.supportedGames,
        executionType: currentEvent.executionType,
        code: currentEvent.asm,
        parameters: currentEvent.parameters!,
        originalCode: currentEvent.asm,
        compiledAsm: null,
        activeCodeTabIndex: 0,
      };
    }
    else {
      this.state = {
        eventName: "",
        supportedGames: [],
        executionType: EventExecutionType.DIRECT,
        code: _defaultEventC,
        parameters: [],
        compiledAsm: null,
        activeCodeTabIndex: 0,
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
        <TabStrip activeTabIndex={this.state.activeCodeTabIndex}
          className="createEventTabStrip"
          contentClassName="createEventTabStripContent"
          tabsClassName="createEventTabStripTabs"
          onActiveTabChanged={this.onActiveTabChanged}>
          <Tab caption="C Source" className="createEventTabStripTab">
            <CodeMirrorWrapper
              key="c"
              mode="c"
              className="eventcodemirror createeventcodemirror"
              value={this.state.code}
              onChange={this.onCodeChange} />
          </Tab>
          <Tab caption="MIPS Assembly" className="createEventTabStripTab">
            <CodeMirrorWrapper
              key="mips"
              mode="mips-pp64"
              className="eventcodemirror createeventcodemirror"
              value={this.state.compiledAsm || undefined}
              readOnly />
          </Tab>
        </TabStrip>
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
    this.syncTextToStateVars(newState, this.state.code);
  }

  onCodeChange = (asm: string) => {
    this.setState({ code: asm });
    this.syncStateVarsToText(asm);
  }

  updateLastSavedCode(code: string) {
    this.setState({ originalCode: code });
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
      this.syncTextToStateVars(newState, this.state.code);
    }
  }

  onExecTypeToggleClicked = (id: any, pressed: boolean) => {
    let newState = { ...this.state };
    newState.executionType = id;
    this.setState({ executionType: id });
    this.syncTextToStateVars(newState, this.state.code);
  }

  onAddEventParameter = (entry: IEventParameter) => {
    let newState = { ...this.state };
    newState.parameters = [...this.state.parameters, entry];
    this.setState(newState);
    this.syncTextToStateVars(newState, this.state.code);
  }

  onRemoveEventParameter = (removedEntry: IEventParameter) => {
    let newState = { ...this.state };
    newState.parameters = this.state.parameters.filter(entry => {
      return entry.name !== removedEntry.name;
    });
    this.setState(newState);
    this.syncTextToStateVars(newState, this.state.code);
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
    return this.state.code;
  }

  getLanguage(): EventCodeLanguage {
    return EventCodeLanguage.C;
  }

  /** Ensures the C text includes the discrete properties. */
  syncTextToStateVars = (newState: ICreateEventViewState, existingCode: string) => {
    let newCode = __clearDiscreteProperties(existingCode, [
      "NAME", "GAMES", "EXECUTION", "PARAM"
    ]);
    newCode = "\n" + newCode;
    newCode = __writeDiscretePropertyArray(newCode, "PARAM", newState.parameters.map(param => {
      return `${param.type}|${param.name}`;
    }));
    newCode = __writeDiscreteProperty(newCode, "EXECUTION", getExecutionTypeName(newState.executionType));
    newCode = __writeDiscreteProperty(newCode, "GAMES", newState.supportedGames.map(getGameName).join(","));
    newCode = __writeDiscreteProperty(newCode, "NAME", newState.eventName.trim());

    if (newCode !== existingCode) {
      this.setState({ code: newCode });
    }
  }

  /** Pulls out discrete properties from the C text back into state. */
  syncStateVarsToText = (code: string) => {
    let value: any = __readDiscreteProperty(code, "NAME");
    if (value !== null) {
      this.setState({ eventName: (value || "").trim() });
    }

    value = CustomAsmHelper.readSupportedGames(code);
    if (value !== null) {
      this.setState({ supportedGames: value });
    }

    value = CustomAsmHelper.readExecutionType(code);
    if (value) {
      this.setState({ executionType: value });
    }

    value = CustomAsmHelper.readParameters(code);
    if (value) {
      this.setState({ parameters: value });
    }
  }

  promptExit = async () => {
    const code = this.state.code;
    const oldAsm = this.state.originalCode;
    if (!oldAsm || oldAsm !== code) {
      return await confirmFromUser("Are you sure you want to exit without saving the event?");
    }
    return true;
  }

  onActiveTabChanged = async (index: number) => {
    switch (index) {
      case 0: // C Source
        this.setState({
          activeCodeTabIndex: 0,
          compiledAsm: null,
        });
        break;

      case 1: // MIPS
        if (!this.getEventName()) {
          showMessage("The event name is missing.");
          return;
        }
        if (!this.getSupportedGames().length) {
          showMessage("At least one game must be supported.");
          return;
        }

        let asm: string;
        const event = createCustomEvent(EventCodeLanguage.C, this.state.code);
        try {
          await validateCustomEvent(event);
        }
        catch (e) {
          showMessage(e.toString());
        }
        try {
          asm = await CustomAsmHelper.testCustomEvent(EventCodeLanguage.C, this.state.code, this.state.parameters, {
            game: event.supportedGames[0] // Pick one game randomly I guess
          }) as string;
        }
        catch (e) {
          showMessage(e.toString());
          return;
        }

        this.setState({
          activeCodeTabIndex: 1,
          compiledAsm: asm,
        });
        break;
    }
  }
}

function __clearDiscreteProperties(code: string, properties: string[]) {
  return CustomAsmHelper.clearDiscreteProperties(code, properties);
}

function __writeDiscreteProperty(code: string, propName: string, value: string) {
  return CustomAsmHelper.writeDiscreteProperty(code, propName, value, "//");
}

function __writeDiscretePropertyArray(code: string, propName: string, values: string[]) {
  return CustomAsmHelper.writeDiscretePropertyArray(code, propName, values, "//");
}

function __readDiscreteProperty(code: string, propName: string) {
  return CustomAsmHelper.readDiscreteProperty(code, propName);
}
