import React from "react";
import { FocusManager } from "./focus-manager/index";

const config = {
  initial: {
    target: "field3",
    delay: 250,
  },
  targets: [
    {
      name: "field1",
      keys: [["Control", "ArrowLeft"]],
    },
    {
      name: "field2",
      keys: [["Control", "ArrowDown"]],
    },
    { name: "field2", previous: "field1", keys: [["Control", "ArrowUp"]] },
    {
      name: "field3",
      keys: [["Control", "ArrowRight"]],
    },
  ],
};

function App() {
  return (
    <FocusManager config={config}>
      <input name="field1" />
      <textarea name="field2"></textarea>
      <input name="field3" />
    </FocusManager>
  );
}

export default App;
