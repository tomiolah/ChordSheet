import * as React from "react";
import { Header } from "semantic-ui-react";

type ParserLineProps = {
  line: string;
};

export default function ParserLine({ line }: ParserLineProps) {
  if (line.startsWith("#")) {
    const heading_level = line.split("#").length - 1;
    const heading_name = line.replace(/\#/g, "").trim();
    return (
      <Header as={`h${heading_level}`}>{heading_name}</Header>
    );
  }

  if (line.startsWith("---[")) {
    const sectionName = line.replace("---[", "").replace("]---", "");
    return (
      <b>{sectionName}</b>
    );
  }

  return <></>;
}
