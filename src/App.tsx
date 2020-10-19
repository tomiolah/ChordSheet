import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as React from "react";
import { useState, createContext } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import Parser from "./Parser";

export const TextContext = createContext("");
export const TransposeContext = createContext(0);

import TextInput from "./TextInput";

export default function App(): JSX.Element {
  const [text, setText] = useState(
    localStorage.getItem("text") ? localStorage.getItem("text")! : ""
  );
  const [transpose, setTranspose] = useState(0);

  return (
    <TransposeContext.Provider value={transpose}>
      <TextContext.Provider value={text}>
        <Grid>
          <Grid.Row centered columns="2">
            <Grid.Column width="6">
              <TextInput
                setter={(value: string) => {
                  setText(value);
                  localStorage.setItem("text", value);
                }}
              />
              <Form>
                <Form.Input
                  label="Transpose by semitones"
                  min="-10"
                  max="10"
                  type="number"
                  defaultValue="0"
                  onChange={(e) => setTranspose(e.target.valueAsNumber || 0)}
                />
              </Form>
            </Grid.Column>
            <Grid.Column width="6">
              <Parser />
              <Button
                content="PRINT"
                onClick={() => {
                  const elem = document.getElementById("parsed")!;
                  html2canvas(elem).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF();
                    pdf.addImage(
                      imgData,
                      "PNG",
                      10,
                      10,
                      canvas.clientHeight,
                      canvas.clientWidth
                    );
                    pdf.save("sheet.pdf");
                  });
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </TextContext.Provider>
    </TransposeContext.Provider>
  );
}
