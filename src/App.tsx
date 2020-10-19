import * as React from "react";
import { useState, createContext } from "react";
import { Grid } from "semantic-ui-react";

export const TextContext = createContext("");

export default function App(): JSX.Element {
  const [text, setText] = useState("");

  return (
    <TextContext.Provider value={text}>
      <Grid>
        <Grid.Row centered verticalAlign="middle" columns="2">
          <Grid.Column width="6">
            <h1>RIGHT</h1>
          </Grid.Column>
          <Grid.Column width="6">
            <p>LEFT</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </TextContext.Provider>
  );
}
