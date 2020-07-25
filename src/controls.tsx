import * as React from "react";
import { makeKeyClick } from "./utils/react";

export interface IButtonProps {
  onClick: (id?: string) => any;
  id?: string;
  css?: string;
  title?: string;
}

export const Button = class Button extends React.Component<IButtonProps> {
  state = {}

  onClick = () => {
    this.props.onClick(this.props.id);
  }

  render() {
    let css = "nbButton";
    if (this.props.css)
      css += " " + this.props.css;
    return (
      <div className={css} title={this.props.title} tabIndex={0}
        onClick={this.onClick}
        onKeyDown={makeKeyClick(this.onClick)}>
        {this.props.children}
      </div>
    );
  }
};

export interface IToggleButtonProps {
  onToggled: (id: any, pressed: boolean) => any;
  allowDeselect?: boolean;
  id: string | number;
  pressed?: boolean;
  css?: string;
  title?: string;
}

export const ToggleButton = class ToggleButton extends React.Component<IToggleButtonProps> {
  state = {}

  onClick = () => {
    if (this.props.allowDeselect === false && this.props.pressed)
      return;
    this.props.onToggled(this.props.id, !this.props.pressed);
  }

  render() {
    let css = "toggleButton" + (this.props.pressed ? " pressed" : "");
    if (this.props.css)
      css += " " + this.props.css;
    return (
      <div className={css} title={this.props.title} tabIndex={0}
        onClick={this.onClick}
        onKeyDown={makeKeyClick(this.onClick)}>
        {this.props.children}
      </div>
    );
  }
};

interface IToggleItem<Tid> {
  id: Tid;
  selected: boolean;
  title?: string;
  text: string;
}

export interface IToggleGroupProps<Tid = number | string> {
  onToggleClick: (id: Tid, pressed: boolean) => any;
  groupCssClass?: string;
  items: IToggleItem<Tid>[];
  allowDeselect?: boolean;
}

export class ToggleGroup<Tid extends number | string> extends React.Component<IToggleGroupProps<Tid>> {
  state = {}

  render() {
    const items = this.props.items;
    let toggles = items.map(item => {
      return (
        <ToggleButton id={item.id}
          key={item.id}
          pressed={item.selected}
          allowDeselect={this.props.allowDeselect}
          title={item.title}
          onToggled={this.props.onToggleClick}>
          {item.text}
        </ToggleButton>
      );
    });

    return (
      <div className={this.props.groupCssClass}>
        {toggles}
      </div>
    );
  }
}
