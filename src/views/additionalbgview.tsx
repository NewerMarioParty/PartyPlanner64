import * as React from "react";
import { CodeMirrorWrapper } from "../components/codemirrorwrapper";
import { ToggleGroup } from "../controls";
import { showMessage, confirmFromUser } from "../appControl";
import { IBoard, getAdditionalBackgroundCode, setAdditionalBackgroundCode } from "../boards";
import { Game, EventCodeLanguage } from "../types";
import { defaultAdditionalBgAsm, makeFakeBgSyms, defaultAdditionalBgC, testAdditionalBgCode } from "../events/additionalbg";

import "../css/additionalbg.scss";

let _viewInstance: AdditionalBgView | null = null;

interface IAdditionalBgViewProps {
  board: IBoard;
}

interface IAdditionalBgViewState {
  code: string;
  language: EventCodeLanguage;
}

export class AdditionalBgView extends React.Component<IAdditionalBgViewProps, IAdditionalBgViewState> {
  constructor(props: IAdditionalBgViewProps) {
    super(props);

    const currentCode = getAdditionalBackgroundCode(this.props.board);
    if (currentCode) {
      this.state = {
        code: currentCode.code,
        language: currentCode.language
      };
    }
    else {
      this.state = {
        code: defaultAdditionalBgC,
        language: EventCodeLanguage.C,
      };
    }
  }

  render() {
    const languageToggles = [
      { id: EventCodeLanguage.C, text: "C", selected: this.state.language === EventCodeLanguage.C },
      { id: EventCodeLanguage.MIPS, text: "MIPS", selected: this.state.language === EventCodeLanguage.MIPS },
    ];

    const codeMirrorMode = this.state.language === EventCodeLanguage.C ? "c" : "mips-pp64";

    return (
      <div className="additionalBgViewContainer">
        <h2>Additional Background Configuration</h2>
        <div className="editorSettingsSplit">
          <div>
            <CodeMirrorWrapper
              key={codeMirrorMode}
              mode={codeMirrorMode}
              className="eventcodemirror additionalbgcodemirror"
              value={this.state.code}
              onChange={this.onCodeChange} />
          </div>
          <div className="createEventForm">
            <label>Language:</label>
            <ToggleGroup items={languageToggles}
              onToggleClick={this.onLanguageToggleClicked} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    _viewInstance = this;
  }

  componentWillUnmount() {
    _viewInstance = null;
  }

  onCodeChange = (code: string) => {
    this.setState({ code });
  }

  onLanguageToggleClicked = async (language: EventCodeLanguage) => {
    if (!this.codeHasChanged({ fromDefaultOnly: true }) || await confirmFromUser("Are you sure you want to switch languages? The current code will not be kept.")) {
      this.setState({
        language,
        code: getDefaultCodeForLanguage(language)
      });
    }
  }

  getCode = () => this.state.code;

  getLanguage = () => this.state.language;

  getBoard = () => this.props.board;

  promptExit = async () => {
    if (this.codeHasChanged()) {
      return await confirmFromUser("Are you sure you want to exit without saving your code?");
    }
    return true;
  }

  private codeHasChanged(opts?: { fromDefaultOnly?: boolean }): boolean {
    const code = this.state.code;
    const oldCode = getAdditionalBackgroundCode(this.props.board);

    const differentFromOldCode = oldCode && oldCode.code !== code;
    let differentFromDefaultCode = code !== getDefaultCodeForLanguage(this.state.language);
    if (differentFromDefaultCode && (!opts || !opts.fromDefaultOnly)) {
      differentFromDefaultCode = !oldCode;
    }
    return differentFromOldCode || differentFromDefaultCode;
  }
}

function getDefaultCodeForLanguage(language: EventCodeLanguage): string {
  switch (language) {
    case EventCodeLanguage.C:
      return defaultAdditionalBgC;

    case EventCodeLanguage.MIPS:
      return defaultAdditionalBgAsm;
  }

  throw new Error(`Unrecognized event code language ${language}`);
}

export async function saveAdditionalBgCode() {
  let code = _viewInstance!.getCode();
  const language = _viewInstance!.getLanguage();
  const board =  _viewInstance!.getBoard();

  if (!code) {
    showMessage("No code was provided, any existing code will be removed.");
    setAdditionalBackgroundCode(board, "", language);
    return;
  }

  const bgIndices = makeFakeBgSyms(board);
  const possibleGameVersions = getGameVersionsToTestCompile(board);

  let failures: string[] = [];

  for (const game of possibleGameVersions) {
    failures = failures.concat(await testAdditionalBgCode(code, language, bgIndices, game));
  }

  if (failures.length === possibleGameVersions.length) {
    showMessage(`One or more possible target game versions failed to compile/assemble.\n${failures.join("\n")}`);
    return;
  }

  if (code === getDefaultCodeForLanguage(language)) {
    code = "";
  }

  setAdditionalBackgroundCode(board, code, language);
}

export function additionalBgViewPromptExit(): Promise<boolean> {
  if (_viewInstance) {
    return _viewInstance.promptExit();
  }
  return Promise.resolve(true);
}

function getGameVersionsToTestCompile(board: IBoard): Game[] {
  switch (board.game) {
    case 1:
      return [Game.MP1_USA, Game.MP1_PAL, Game.MP1_JPN];
    case 2:
      return [Game.MP2_USA, Game.MP2_PAL, Game.MP2_JPN];
    case 3:
      return [Game.MP3_USA, Game.MP3_PAL, Game.MP3_JPN];
  }
}