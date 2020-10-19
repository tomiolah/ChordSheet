import * as React from "react";
import { Divider, Header } from "semantic-ui-react";
import { TransposeContext } from "./App";
import transpose from "./util/transpose";

type ParserLineProps = {
  line: string;
};

export default function ParserLine(props: ParserLineProps) {
  const transp = React.useContext(TransposeContext);
  let line = `${props.line}`;

  if (line.startsWith("#")) {
    const heading_level = line.split("#").length - 1;
    const heading_name = line.replace(/\#/g, "").trim();
    return (
      <>
        <Header as={`h${heading_level}`}>{heading_name}</Header>
        <Divider />
      </>
    );
  }

  if (line.startsWith("[")) {
    const sectionName = line.replace("[", "").replace("]", "");
    return (
      <>
        <b className="sectionName">{sectionName}</b>
        <br />
        <br />
      </>
    );
  }

  let bold = line.startsWith("*");

  const boldWrapper = (children: JSX.Element): JSX.Element => {
    if (bold) {
      return <b>{children}</b>;
    }
    return children;
  };

  return boldWrapper(
    <div className="chordline">
      {(bold ? line.substr(1) : line)
        .replace(/[\{]{1}/g, "\n")
        .split("\n")
        .filter((v) => v !== "")
        .map((v) => (v.includes("}") ? v.split("}") : [v]))
        .map((v, i) => {
          if (v.length === 1) {
            return <span key={i}>{v[0]}</span>;
          }

          const [key, text] = v;

          return (
            <span key={i}>
              <strong>
                <span>[</span>
                {transpose(key, transp)}
                <span>]</span>
              </strong>
              {text}
            </span>
          );
        })}
    </div>
  );
}
