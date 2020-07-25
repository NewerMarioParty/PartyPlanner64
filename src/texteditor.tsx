import * as Draft from "draft-js";
import * as React from "react";
import { splice } from "./utils/string";

import defaultImage from "./img/richtext/default.png";
import blackImage from "./img/richtext/black.png";
import whiteImage from "./img/richtext/white.png";
import redImage from "./img/richtext/red.png";
import greenImage from "./img/richtext/green.png";
import blueImage from "./img/richtext/blue.png";
import purpleImage from "./img/richtext/purple.png";
import yellowImage from "./img/richtext/yellow.png";
import AImage from "./img/richtext/A.png";
import BImage from "./img/richtext/B.png";
import SImage from "./img/richtext/S.png";
import CupImage from "./img/richtext/Cup.png";
import CdownImage from "./img/richtext/Cdown.png";
import CleftImage from "./img/richtext/Cleft.png";
import CrightImage from "./img/richtext/Cright.png";
import ZImage from "./img/richtext/Z.png";
import RImage from "./img/richtext/R.png";
import analogImage from "./img/richtext/analog.png";
import coinImage from "./img/richtext/coin.png";
import starImage from "./img/richtext/star.png";
import pauseImage from "./img/richtext/pause.png";
import feedImage from "./img/richtext/feed.png";
import darklightImage from "./img/richtext/darklight.png";

import divotImage from "./img/richtext/divot.png";

import "./css/texteditor.scss";

// Rich text editor for strings in Mario Party.
const {Editor, EditorState, ContentState, SelectionState, Modifier, RichUtils, CompositeDecorator} = Draft;

export enum MPEditorTheme {
  Light = 0,
  Dark = 1,
};

export enum MPEditorDisplayMode {
  Edit = 0,
  Readonly = 1,
  Display = 2,
};

export enum MPEditorToolbarPlacement {
  Top = 0,
  Bottom = 1,
};

export interface IMPEditorProps {
  value?: string;
  id?: string;
  theme?: MPEditorTheme;
  displayMode?: MPEditorDisplayMode;
  showToolbar?: boolean;
  toolbarPlacement?: MPEditorToolbarPlacement;
  itemBlacklist?: any;
  onValueChange?: any;
  onBlur?: any;
  onFocus?: any;
  maxlines?: number;
}

export interface IMPEditorState {
  editorState: Draft.EditorState;
  theme: MPEditorTheme;
}

export class MPEditor extends React.Component<IMPEditorProps, IMPEditorState> {
  private editor: any;

  constructor(props: IMPEditorProps) {
    super(props);

    let editorState;
    if (props.value) {
      editorState = MPEditorStringAdapter.stringToEditorState(props.value);
    }
    else {
      editorState = EditorState.createEmpty();
    }

    // Take a specified theme, or make an educated guess.
    let theme: MPEditorTheme = props.theme as MPEditorTheme;
    if (typeof props.theme !== "number") {
      if (props.value && props.value.indexOf("WHITE") >= 0)
        theme = MPEditorTheme.Dark;
      else
        theme = MPEditorTheme.Light;
    }

    this.state = {
      editorState,
      theme,
    };
  }

  componentDidUpdate() {
    if ((this.props.displayMode || MPEditorDisplayMode.Edit) !== MPEditorDisplayMode.Edit) {
      const oldValue = MPEditorStringAdapter.editorStateToString(this.state.editorState, {
        theme: this.state.theme,
      });
      if (oldValue !== this.props.value) {
        const newEditorState = MPEditorStringAdapter.stringToEditorState(this.props.value!);
        this.setState({ editorState: newEditorState });
      }
    }
  }

  render() {
    const {editorState} = this.state;
    const displayMode = this.props.displayMode || MPEditorDisplayMode.Edit;

    let toolbar;
    const showToolbar = this.props.showToolbar;
    if (showToolbar && displayMode === MPEditorDisplayMode.Edit) {
      toolbar = (
        <MPEditorToolbar onItemClick={this.onToolbarClick}
          itemBlacklist={this.props.itemBlacklist} />
      );
    }

    const toolbarPlacement = this.props.toolbarPlacement || MPEditorToolbarPlacement.Top;

    let className = "mpEditor";

    if (displayMode === MPEditorDisplayMode.Display)
      className += " mpDisplay";

    if (this.state.theme === MPEditorTheme.Light)
      className += " mpEditorLight";
    if (this.state.theme === MPEditorTheme.Dark)
      className += " mpEditorDark";

    if (toolbar) {
      if (toolbarPlacement === MPEditorToolbarPlacement.Bottom)
        className += " mpEditorShowToolbarBottom";
      else
        className += " mpEditorShowToolbarTop";
    }

    return (
      <div className={className}>
        {toolbarPlacement === MPEditorToolbarPlacement.Top && toolbar}
        <div className="mpEditorWrapper">
          <Editor ref={editor => { this.editor = editor; }}
            editorState={editorState}
            stripPastedStyles={true}
            readOnly={displayMode !== MPEditorDisplayMode.Edit}
            customStyleMap={colorStyleMap}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            handleReturn={this.handleReturn} />
        </div>
        {toolbarPlacement === MPEditorToolbarPlacement.Bottom && toolbar}
      </div>
    );
  }

  focus = () => {
    this.editor.focus();
  }

  onChange = (editorState: Draft.EditorState) => {
    this.setState({editorState});
    this.setState((prevState, props: IMPEditorProps) => {
      if (props.onValueChange)
        props.onValueChange(props.id, MPEditorStringAdapter.editorStateToString(prevState.editorState, {
          theme: prevState.theme,
        }));
    });
  }

  handleReturn = (e: any, editorState: any) => {
    if (this.props.maxlines) {
      let text = editorState.getCurrentContent().getPlainText();

      // = because Return would create an additional line
      if (text.split("\n").length >= this.props.maxlines)
        return "handled";
    }

    return "not-handled";
  }

  onFocus = (event: any) => {
    if (this.props.onFocus)
      this.props.onFocus(event);
  }

  onBlur = (event: any) => {
    if (this.props.onBlur)
      this.props.onBlur(event);
  }

  onToolbarClick = (item: IToolbarItem) => {
    switch (item.type) {
      case "COLOR":
        this.toggleColor(item.key);
        break;
      case "IMAGE":
        this.addImage(item.char!);
        break;
      case "ACTION":
        switch (item.key) {
          case "DARKLIGHT":
            const nextTheme = this.state.theme === MPEditorTheme.Light
              ? MPEditorTheme.Dark
              : MPEditorTheme.Light
            this.setState({ theme: nextTheme });
            break;
        }
        break;
    }

    setTimeout(() => {
      this.focus();
    }, 0);
  }

  toggleColor = (toggledColor: string) => {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const prevContentState = editorState.getCurrentContent();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, prevContentState);

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state!, color!);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  addImage = (char: string) => {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Insert a character that will be styled into an image.
    const nextContentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      char
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "insert-characters"
    );

    this.onChange(nextEditorState);
  }
};

function imageStrategy(contentBlock: Draft.ContentBlock, callback: any, contentState: unknown) {
  const text = contentBlock.getText();
  for (let i = 0; i < text.length; i++) {
    if (_ToolbarCharToKey[text.charAt(i)])
      callback(i, i + 1);
  }
}

const MPImageComponent = (props: any) => {
  let ch = props.children[0].props.text; // 1337 draft.js h4x
  let className = "mpImage";
  let key = _ToolbarCharToKey[ch];
  className += " mpImageKey-" + key;

  // Stop React warnings from unwanted spreaded props...
  let outerSpanProps = {...props};
  delete outerSpanProps.contentState;
  delete outerSpanProps.decoratedText;
  delete outerSpanProps.entityKey;
  delete outerSpanProps.offsetKey;
  delete outerSpanProps.blockKey;

  return (
    <span {...outerSpanProps} className={className}>
      <span className="mpImageTextWrapper">{props.children}</span>
    </span>
  );
};

export const MPCompositeDecorator = new CompositeDecorator([
  {
    strategy: imageStrategy,
    component: MPImageComponent,
  }
]);

const colorStyleMap: { [name: string]: { color: string } } = {
  DEFAULT: {
    color: "#200E71",
  },
  BLACK: {
    color: '#000000',
  },
  WHITE: {
    color: '#FFFFFF',
  },
  RED: {
    color: '#E70014',
  },
  GREEN: {
    color: '#00AB29',
  },
  BLUE: {
    color: "#003EF9",
  },
  PURPLE: {
    color: "#E847CD",
  },
  YELLOW: {
    color: '#FFEA38',
  },
};

interface IToolbarItem {
  key: string;
  type: string;
  icon: string;
  desc: string;
  char?: string;
  items?: IToolbarItem[];
}

const _ToolbarItems: IToolbarItem[] = [
  { key: "COLOR", type: "SUBMENU", icon: defaultImage, desc: "Font color",
    items: [
      { key: "DEFAULT", type: "COLOR", icon: defaultImage, desc: "Default" },
      { key: "BLACK", type: "COLOR", icon: blackImage, desc: "Black" },
      { key: "WHITE", type: "COLOR", icon: whiteImage, desc: "White" },
      { key: "RED", type: "COLOR", icon: redImage, desc: "Red" },
      { key: "GREEN", type: "COLOR", icon: greenImage, desc: "Green" },
      { key: "BLUE", type: "COLOR", icon: blueImage, desc: "Blue" },
      { key: "PURPLE", type: "COLOR", icon: purpleImage, desc: "Purple" },
      { key: "YELLOW", type: "COLOR", icon: yellowImage, desc: "Yellow" },
    ],
  },
  { key: "IMAGE", type: "SUBMENU", icon: AImage, desc: "Insert image",
    items: [
      { key: "A", type: "IMAGE", icon: AImage, desc: "A button", "char": "\u3000" },
      { key: "B", type: "IMAGE", icon: BImage, desc: "B button", "char": "\u3001" },
      { key: "S", type: "IMAGE", icon: SImage, desc: "Start button", "char": "\u3010" },
      { key: "CUP", type: "IMAGE", icon: CupImage, desc: "C-up button", "char": "\u3002" },
      { key: "CDOWN", type: "IMAGE", icon: CdownImage, desc: "C-down button", "char": "\u3005" },
      { key: "CLEFT", type: "IMAGE", icon: CleftImage, desc: "C-left button", "char": "\u3004" },
      { key: "CRIGHT", type: "IMAGE", icon: CrightImage, desc: "C-right button", "char": "\u3003" },
      { key: "Z", type: "IMAGE", icon: ZImage, desc: "Z button", "char": "\u3006" },
      { key: "R", type: "IMAGE", icon: RImage, desc: "R button", "char": "\u3011" },
      { key: "ANALOG", type: "IMAGE", icon: analogImage, desc: "Analog stick", "char": "\u3007" },
      { key: "COIN", type: "IMAGE", icon: coinImage, desc: "Coin", "char": "\u3008" },
      { key: "STAR", type: "IMAGE", icon: starImage, desc: "Star", "char": "\u3009" },
    ],
  },
  { key: "ADVANCED", type: "SUBMENU", icon: pauseImage, desc: "Advanced text features",
    items: [
      { key: "PAUSE", type: "IMAGE", icon: pauseImage, desc: "Pause to continue", "char": "\u3015" },
      { key: "FEED", type: "IMAGE", icon: feedImage, desc: "Feed new page", "char": "\u3014" },
    ],
  },
  { key: "DARKLIGHT", type: "ACTION", icon: darklightImage, desc: "Toggle background color (has no effect on actual game)" },
];

let _ToolbarCharToKey: { [char: string]: string } = {};
let _ToolbarKeyToChar: { [char: string]: string } = {};
_ToolbarItems.forEach(_populateItemMaps);
function _populateItemMaps(item: any) {
  if (item.items) {
    item.items.forEach(_populateItemMaps);
  }
  if (item.char) {
    _ToolbarCharToKey[item["char"]] = item.key;
    _ToolbarKeyToChar[item.key] = item["char"];
  }
}

function _toolbarItemToComponent(item: IToolbarItem, onItemClick: any) {
  // if (item.type === "SEP") {
  //   return (
  //     <MPEditorToolbarSeparator key={key} />
  //   );
  // }

  switch (item.type) {
    case "SUBMENU":
      return (
        <MPEditorToolbarSubmenu key={item.key}
          item={item}
          onItemClick={onItemClick}
          items={item.items!} />
      );

    default:
      return (
        <MPEditorToolbarButton key={item.key}
          item={item}
          onItemClick={onItemClick} />
      );
  }
}

interface MPEditorToolbarProps {
  itemBlacklist: any;
  onItemClick: any;
}

class MPEditorToolbar extends React.Component<MPEditorToolbarProps> {
  state = {}

  render() {
    const blacklist = this.props.itemBlacklist;
    let items = _ToolbarItems.map(itemDef => {
      if (blacklist && blacklist.indexOf(itemDef.key) !== -1) {
        return null;
      }

      return _toolbarItemToComponent(itemDef, this.onItemClick);
    });
    return (
      <div className="mpEditorToolbar">
        {items}
      </div>
    );
  }

  onItemClick = (item: any) => {
    if (this.props.onItemClick)
      this.props.onItemClick(item);
  }
};

interface MPEditorToolbarSubmenuProps {
  item: IToolbarItem;
  items: IToolbarItem[];
  onItemClick: any;
}

class MPEditorToolbarSubmenu extends React.Component<MPEditorToolbarSubmenuProps> {
  private expMenu: HTMLDivElement | null = null;

  state = {
    expanded: false,
  }

  render() {
    const item = this.props.item;

    let expansion;
    if (this.state.expanded) {
      const submenuItems = this.props.items.map(itemDef => {
        return _toolbarItemToComponent(itemDef, this.onItemClick);
      });
      expansion = (
        <div ref={(expMenu => { this.expMenu = expMenu; })}
          className="mpEditorToolbarSubmenuExp"
          tabIndex={-1}
          onBlur={this.onBlur}>
          {submenuItems}
        </div>
      );
    }
    return (
      <div className="mpEditorToolbarButton" title={item.desc} onClick={this.onClick}>
        <img src={item.icon} alt={item.desc}></img>
        <img src={divotImage} alt="" />
        {expansion}
      </div>
    );
  }

  componentDidMount() {
    if (this.state.expanded)
      this.expMenu!.focus();
  }

  componentDidUpdate() {
    if (this.state.expanded)
      this.expMenu!.focus();
  }

  onBlur = () => {
    this.setState({ expanded: false });
  }

  onClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  onItemClick = (item: IToolbarItem) => {
    if (this.props.onItemClick)
      this.props.onItemClick(item);
  }
};

interface MPEditorToolbarButtonProps {
  item: IToolbarItem;
  onItemClick: any;
}

class MPEditorToolbarButton extends React.Component<MPEditorToolbarButtonProps> {
  state = {}

  onClick = () => {
    this.props.onItemClick(this.props.item);
  }

  render() {
    const item = this.props.item;
    return (
      <div className="mpEditorToolbarButton" title={item.desc} onClick={this.onClick}>
        <img src={item.icon} alt={item.desc}></img>
      </div>
    );
  }
};

class MPEditorToolbarSeparator extends React.Component { // eslint-disable-line
  state = {}

  render() {
    return (
      <div className="mpEditorToolbarSeparator"></div>
    );
  }
};

/**
 * Converts bReadonlyetween game strings and Draft.js editor state.
 */
export const MPEditorStringAdapter = new class MPEditorStringAdapter {
  editorStateToString(editorState: Draft.EditorState, args: { theme: MPEditorTheme }) {
    const contentState = editorState.getCurrentContent();

    let textBlocks: string[] = [];

    const defaultColor = args.theme === MPEditorTheme.Light ? "DEFAULT" : "WHITE";

    const blockMap = contentState.getBlockMap();
    let blockIndex = -1; // forEach is from immutable, no index param?
    blockMap.forEach((block) => {
      blockIndex++;

      let currentColor: string;
      let defaulting: boolean;
      const changes: { [index: number]: string} = {};
      block!.findStyleRanges(
        (characterMetadata) => {
          const style = characterMetadata.getStyle();
          let color = style.find(value => { return !!colorStyleMap[value!]; });
          if (!color) {
            defaulting = true;
            color = defaultColor;
          }
          else
            defaulting = false;
          currentColor = color;
          return true;
        },
        (start, end) => {
          if (defaulting && start === 0 && blockIndex === 0)
            return; // Avoid always starting strings with color.

          changes[start] = "<" + currentColor + ">";
        }
      );

      let currentIndexOffset = 0;
      let blockText = block!.getText();
      for (let index in changes) {
        const replaceIndex = currentIndexOffset + parseInt(index);
        blockText = splice(blockText, replaceIndex, 0, changes[index]);
        currentIndexOffset += changes[index].length;
      }

      textBlocks.push(blockText);
    });

    return textBlocks.join("\n");
  }

  stringToEditorState(str: string) {
    let contentState = ContentState.createFromText(str || "");

    // Go through each block (line) and convert color tags to Draft.js inline styles.
    let contentBlocks = contentState.getBlocksAsArray();
    for (let i = 0; i < contentBlocks.length; i++) {
      let contentBlock = contentBlocks[i];
      let text = contentBlock.getText();

      let [styleTag, tagStartIndex, tagEndIndex] = _getNextStyleTag(text);
      while (styleTag) {
        // Create a "selection" around the <tag>
        let contentBlockKey = contentBlock.getKey();
        let selection: any = SelectionState.createEmpty(contentBlock.getKey());
        selection = selection.merge({
          anchorOffset: tagStartIndex,
          focusKey: contentBlockKey,
          focusOffset: tagEndIndex,
        });

        // Remove the <tag>
        contentState = Modifier.replaceText(contentState, selection, "");
        contentBlocks = contentState.getBlocksAsArray();
        contentBlock = contentBlocks[i];
        text = contentBlock.getText();

        // Make the "selection" go to the end of the entire string
        const lastContentBlock = contentBlocks[contentBlocks.length - 1];
        selection = selection.merge({
          focusKey: lastContentBlock.getKey(),
          focusOffset: lastContentBlock.getText().length,
        });

        // Remove any pre-existing colors from the tag index to end of string.
        contentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
          return Modifier.removeInlineStyle(contentState, selection, color)
        }, contentState);

        // Apply the new tag.
        contentState = Modifier.applyInlineStyle(contentState, selection, styleTag as string);

        contentBlocks = contentState.getBlocksAsArray();
        contentBlock = contentBlocks[i];
        text = contentBlock.getText();
        [styleTag, tagStartIndex, tagEndIndex] = _getNextStyleTag(text);
      }
    }

    return EditorState.createWithContent(contentState, MPCompositeDecorator);
  }
}();

function _getNextStyleTag(rawString: string) {
  let startingIndex = 0;
  while (startingIndex < rawString.length) {
    let styleStart = rawString.indexOf("<", startingIndex) + 1;
    if (!styleStart) // indexOf yielded -1
      return [];

    let styleEnd = rawString.indexOf(">", styleStart);
    if (styleEnd === -1)
      return [];

    const styleTag = rawString.substring(styleStart, styleEnd);
    if (!colorStyleMap[styleTag]) {
      // Could be something like "<<BLUE>"
      startingIndex = styleStart;
      continue;
    }

    return [styleTag, styleStart - 1, styleEnd + 1];
  }

  return [];
}
