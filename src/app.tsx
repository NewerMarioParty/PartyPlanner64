// This is the top level of the application, and includes the root React view.

import { View, Action } from "./types";
import { IBoard, ISpace, getBoards, getCurrentBoard, IEventInstance } from "./boards";
import * as React from "react";
import { IEvent } from "./events/events";
import { updateWindowTitle } from "./utils/browser";
import { Editor } from "./renderer";
import { Details } from "./views/details";
import { Settings } from "./views/settings";
import { About } from "./views/about";
import { ModelViewer } from "./views/models";
import { EventsView } from "./views/eventsview";
import { CreateASMEventView } from "./views/createevent_asm";
import { CreateCEventView } from "./views/createevent_c";
import { StringsViewer } from "./views/strings";
import { GamesharkView } from "./views/gameshark";
import { BoardMenu } from "./boardmenu";
import { Notification, NotificationBar, NotificationButton, NotificationColor } from "./components/notifications";
import { Header } from "./header";
import { ToolWindow } from "./toolwindow";
import { Toolbar } from "./toolbar";
import { SpaceProperties } from "./spaceproperties";
import { BoardProperties } from "./boardproperties";
import * as ReactDOM from "react-dom";
import "./utils/onbeforeunload";
import "./events/builtin/events.common";
import "./events/builtin/MP1/events.MP1";
import "./events/builtin/MP2/events.MP2";
import "./events/builtin/MP3/events.MP3";
import "file-saver";
import { DebugView } from "./views/debug";
import { AudioViewer } from "./views/audio";
import { AdditionalBgView } from "./views/additionalbgview";
import { IDecisionTreeNode } from "./ai/aitrees";
import { DecisionTreeEditor } from "./ai/aieditor";
import { isElectron } from "./utils/electron";
import { showMessage } from "./appControl";
import { Blocker } from "./components/blocker";
import { killEvent } from "./utils/react";

/* eslint-disable jsx-a11y/anchor-is-valid */

interface IPP64AppState {
  currentView: View;
  boards: IBoard[];
  currentBoard: IBoard;
  currentEvent: IEvent | null;
  currentEventIsBoardEvent: boolean;
  hoveredBoardEvent: IEventInstance | null;
  romLoaded: boolean;
  currentAction: Action;
  selectedSpaces: ISpace[] | null;
  aiTree: IDecisionTreeNode[] | null;
  blocked: boolean;
  prompt: boolean;
  confirm: boolean;
  message: string;
  messageHTML: string;
  onBlockerFinished?(value?: string): void;
  updateExists: boolean;
  updateHideNotification: boolean;
  notifications: React.ReactElement<Notification>[];
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class PP64App extends React.Component<{}, IPP64AppState> {
  state: IPP64AppState = {
    currentView: View.EDITOR,
    boards: getBoards(),
    currentBoard: getCurrentBoard(),
    currentEvent: null,
    currentEventIsBoardEvent: false,
    hoveredBoardEvent: null,
    romLoaded: false,
    currentAction: Action.MOVE,
    selectedSpaces: null,
    aiTree: null,
    blocked: false,
    prompt: false,
    confirm: false,
    message: "",
    messageHTML: "",
    updateExists: false,
    updateHideNotification: false,
    notifications: [],
    error: null,
    errorInfo: null,
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorDisplay error={this.state.error} errorInfo={this.state.errorInfo}
          onClearError={() => {
            this.setState({ error: null, errorInfo: null, blocked: false });
          }}/>
      );
    }

    updateWindowTitle(this.state.currentBoard.name);
    let mainView;
    switch (this.state.currentView) {
      case View.EDITOR:
        mainView = <Editor board={this.state.currentBoard}
          selectedSpaces={this.state.selectedSpaces}
          hoveredBoardEvent={this.state.hoveredBoardEvent}
          telescoping={this.state.currentAction === Action.TELESCOPE} />;
        break;
      case View.DETAILS:
        mainView = <Details board={this.state.currentBoard} />;
        break;
      case View.SETTINGS:
        mainView = <Settings />;
        break;
      case View.ABOUT:
        mainView = <About />;
        break;
      case View.MODELS:
        mainView = <ModelViewer />;
        break;
      case View.EVENTS:
        mainView = <EventsView board={this.state.currentBoard} />;
        break;
      case View.CREATEEVENT_ASM:
        mainView = <CreateASMEventView />;
        break;
      case View.CREATEEVENT_C:
        mainView = <CreateCEventView />;
        break;
      case View.STRINGS:
        mainView = <StringsViewer />;
        break;
      case View.PATCHES:
        mainView = <GamesharkView />;
        break;
      case View.DEBUG:
        mainView = <DebugView />;
        break;
      case View.AUDIO:
        mainView = <AudioViewer />;
        break;
      case View.ADDITIONAL_BGS:
        mainView = <AdditionalBgView board={this.state.currentBoard} />;
        break;
    }

    let sidebar;
    switch (this.state.currentView) {
      case View.EDITOR:
      case View.DETAILS:
      case View.EVENTS:
        sidebar = (
          <div className="sidebar">
            <BoardMenu
              boards={this.state.boards} />
          </div>
        );
        break;
    }

    let blocked;
    if (this.state.blocked) {
      blocked = <Blocker
        message={this.state.message}
        messageHTML={this.state.messageHTML}
        prompt={this.state.prompt}
        confirm={this.state.confirm}
        onAccept={(value?: string) => {
          showMessage();
          if (this.state.onBlockerFinished) {
            this.state.onBlockerFinished(value);
          }
        }}
        onCancel={() => {
          showMessage();
          if (this.state.onBlockerFinished) {
            this.state.onBlockerFinished();
          }
        }}
        onForceClose={() => this.setState({ blocked: false })} />
    }

    let bodyClass = "body";
    if (this.state.currentAction === Action.ERASE)
      bodyClass += " eraser";

    return (
      <div className={bodyClass}>
        <NotificationBar>
          {this.getNotifications()}
        </NotificationBar>
        <Header view={this.state.currentView} romLoaded={this.state.romLoaded} board={this.state.currentBoard} />
        <div className="content"
          onKeyDownCapture={blocked ? killEvent : undefined}>
          {sidebar}
          <div className="main">
            {mainView}
            <div className="mainOverlay">
              <ToolWindow name="Toolbox" position="TopRight"
                visible={this.state.currentView === View.EDITOR}>
                <Toolbar currentAction={this.state.currentAction}
                  gameVersion={this.state.currentBoard.game}
                  boardType={this.state.currentBoard.type} />
              </ToolWindow>
              <ToolWindow name="Space Properties" position="BottomRight"
                visible={this.state.currentView === View.EDITOR}>
                <SpaceProperties selectedSpaces={this.state.selectedSpaces}
                  gameVersion={this.state.currentBoard.game}
                  boardType={this.state.currentBoard.type} />
              </ToolWindow>
              <ToolWindow name="Board Properties" position="BottomLeft"
                visible={this.state.currentView === View.EDITOR}>
                <BoardProperties currentBoard={this.state.currentBoard} />
              </ToolWindow>
              {this.state.aiTree &&
                <ToolWindow name="AI Decision Tree" position="TopLeft"
                  visible={this.state.currentView === View.EDITOR}
                  canClose onCloseClick={() => this.setState({ aiTree: null })}>
                  <DecisionTreeEditor root={this.state.aiTree} />
                </ToolWindow>
              }
            </div>
            <div id="dragZone"></div>
          </div>
        </div>
        {blocked}
      </div>
    );
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    _onError(this, error, errorInfo);
  }

  componentDidMount() {
    if (isElectron) {
      try {
        const ipcRenderer = (window as any).require("electron").ipcRenderer;
        ipcRenderer.on("update-check-hasupdate", this._onUpdateCheckHasUpdate);
        ipcRenderer.send("update-check-start");
      }
      catch (e) {
        console.error("Auto update failed in componentDidMount: ", e);
      }
    }
  }

  componentWillUnmount() {
    if (isElectron) {
      try {
        const ipcRenderer = (window as any).require("electron").ipcRenderer;
        ipcRenderer.removeListener("update-check-hasupdate", this._onUpdateCheckHasUpdate);
      }
      catch (e) {
        console.error("Auto update failed in componentWillUnmount: ", e);
      }
    }
  }

  _onUpdateCheckHasUpdate = () => {
    this.setState({ updateExists: true });
  }

  getNotifications(): React.ReactElement<Notification>[] {
    const notifications = this.state.notifications.slice();

    if (this.state.updateExists && !this.state.updateHideNotification) {
      notifications.push(
        <Notification key="update"
          color={NotificationColor.Blue}
          onClose={this._onUpdateNotificationClosed}>
          An update is available.
          <NotificationButton onClick={this._onUpdateNotificationInstallClicked}>
            Install
          </NotificationButton>
        </Notification>
      );
    }

    return notifications;
  }

  _onUpdateNotificationClosed = () => {
    this.setState({ updateHideNotification: true });
  }

  _onUpdateNotificationInstallClicked = () => {
    this.setState({
      updateHideNotification: true,
      blocked: true,
    });

    if (isElectron) {
      const ipcRenderer = (window as any).require("electron").ipcRenderer;
      ipcRenderer.send("update-check-doupdate");
    }
  }
};

// Capture errors that don't happen during rendering.
window.onerror = function (msg, url, lineNo, columnNo, error) {
  const app = (window as any)._PP64instance;
  if (error) {
    if (app) {
      _onError(app, error, null);
    }
    else { // Occurred during ReactDOM.render?
      alert(error);
    }
  }
};

const body = document.getElementById("body");
(window as any)._PP64instance = ReactDOM.render(<PP64App /> as any, body);

function _onError(app: PP64App, error: Error, errorInfo: React.ErrorInfo | null) {
  app.setState({
    error,
    errorInfo,
  });
  console.error(error, errorInfo);
}

interface IErrorDisplayProps {
  error: Error,
  errorInfo: React.ErrorInfo | null,
  onClearError(): void;
}

function ErrorDisplay(props: IErrorDisplayProps) {
  const componentStack = props.errorInfo && props.errorInfo.componentStack;
  return (
    <div className="errorDiv selectable">
      <h2>Hey, it seeems like something's wrong in&nbsp;
        <span className="errorStrikeoutText">Mushroom Village</span>&nbsp;
        PartyPlanner64.</h2>
      <p>Please &nbsp;
        <a href="https://github.com/PartyPlanner64/PartyPlanner64/issues" target="_blank" rel="noopener noreferrer">
          file an issue
        </a>
        &nbsp; with the following details, and refresh the page. Or &nbsp;
        <a href="#" onClick={props.onClearError}>click here</a>&nbsp;
        to dismiss this error, but you may be in a bad state.
      </p>
      <pre>{props.error.toString()}</pre>
      {props.error.stack ? <React.Fragment>
          <div>Stack Error Details:</div>
          <pre>{props.error.stack}</pre>
        </React.Fragment>
        : null
      }
      <div>Component Stack Error Details:</div>
      <pre>{componentStack || "N/A"}</pre>
    </div>
  );
}