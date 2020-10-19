import * as React from "react";
import { useState, createContext } from "react";
import { Grid } from "semantic-ui-react";

export const TextContext = createContext("");

import TextInput from "./TextInput";

export default function App(): JSX.Element {
  const [text, setText] = useState("");

  return (
    <TextContext.Provider value={text}>
      <Grid>
        <Grid.Row centered verticalAlign="middle" columns="2">
          <Grid.Column width="6">
            <TextInput setter={(value: string) => setText(value)} />
          </Grid.Column>
          <Grid.Column width="6">
            <p>{text}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </TextContext.Provider>
  );
}
