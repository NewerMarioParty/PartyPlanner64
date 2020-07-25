import * as React from "react";

interface ISectionHeadingProps {
  text: string;
}

export const SectionHeading: React.FC<ISectionHeadingProps> = (props) => {
  return (
    <span className="propertySectionTitle">
      {props.text}
      {props.children}
    </span>
  );
};
