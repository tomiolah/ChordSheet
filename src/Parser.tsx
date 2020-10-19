import * as React from "react";
import { useContext } from "react";
import { TextContext } from "./App";
import ParserLine from "./ParserLine";

export default function Parser() {
  const text = useContext(TextContext);

  return (
    <div id="parsed">
      {text
        .split("\n")
        .filter((l) => l !== "")
        .map((line, i) => {
          return (
            <div key={i}>
              <ParserLine line={line} />
            </div>
          );
        })}
    </div>
  );
}
