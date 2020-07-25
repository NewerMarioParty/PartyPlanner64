import { useState, ReactElement, PropsWithChildren } from "react";
import React from "react";

interface ITabStripProps {
  activeTabIndex?: number;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
  onActiveTabChanged?(index: number): void;
}

/** Allows swapping between several content areas. */
export const TabStrip: React.FC<ITabStripProps> = (props) => {
  const [stateActiveTabIndex, setStateActiveTabIndex] = useState(0);

  const controlled = typeof props.activeTabIndex === "number";
  const activeTabIndex = controlled ? props.activeTabIndex! : stateActiveTabIndex;

  const activeTabChildren =
    (React.Children.toArray(props.children)[activeTabIndex] as ReactElement<PropsWithChildren<ITabProps>>).props.children
  return (
    <div className={props.className}>
      <div className={props.tabsClassName}>
        {React.Children.map(props.children, (child, index) => {
          if (!child) {
            return null;
          }

          const tabChild = child as ReactElement<ITabProps>;
          let tabClassName = tabChild.props.className;
          if (index === activeTabIndex) {
            tabClassName += " activeTab";
          }
          return (
            <Tab caption={tabChild.props.caption}
              className={tabClassName}
              onClick={() => {
                if (activeTabIndex === index) {
                  return;
                }
                if (!controlled) {
                  setStateActiveTabIndex(index);
                }
                if (props.onActiveTabChanged) {
                  props.onActiveTabChanged(index);
                }
              }} />
          );
        })}
      </div>
      <div className={props.contentClassName}>
        {activeTabChildren}
      </div>
    </div>
  )
}

interface ITabProps {
  caption: string;
  className?: string;
  onClick?(): void;
}

export const Tab: React.FC<ITabProps> = (props) => {
  return (
    <div className={props.className}
      onClick={props.onClick}>
      {props.caption}
    </div>
  );
}
