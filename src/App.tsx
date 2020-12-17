import React from "react";
import { FocusManager } from "./focus-manager/index";

const config = {
  initial: {
    target: "field1",
    delay: 250,
  },
  targets: [
    {
      name: "field1",
      previous: "field2",
      keys: [["Control", "ArrowLeft"]],
    },
    {
      name: "field1",
      previous: "field3",
      keys: [["Control", "ArrowRight"]],
    },
    {
      name: "field1",
      previous: "field3",
      keys: [["Control", "Shift"]],
    },
    {
      name: "field2",
      previous: "field1",
      keys: [["Control", "ArrowRight"]],
    },
    {
      name: "field2",
      previous: "field3",
      keys: [["Control", "ArrowLeft"]],
    },
    {
      name: "field3",
      previous: "field1",
      keys: [["Control", "ArrowLeft"]],
    },
    {
      name: "field3",
      previous: "field2",
      keys: [["Control", "ArrowRight"]],
    },
  ],
};

function App() {
  return (
    <FocusManager config={config}>
      <input name="field1" />
      <input name="field2" type="text" />
      <input name="field3" type="text" />
    </FocusManager>
  );
}

export default App;
