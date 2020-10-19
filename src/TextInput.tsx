import * as React from "react";
import { useContext } from "react";
import { Form } from "semantic-ui-react";
import { TextContext } from "./App";

type TextInputProps = {
  setter(value: string): void;
};

export default function TextInput(props: TextInputProps) {
  const text = useContext(TextContext);

  return (
    <Form>
      <Form.TextArea
        rows={Math.floor(window.innerHeight / 20)}
        label="Input"
        value={text}
        onChange={(e) => {
          e.preventDefault();
          props.setter(e.target.value);
        }}
      />
    </Form>
  );
}
