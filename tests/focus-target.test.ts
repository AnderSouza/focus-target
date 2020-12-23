import {
  getUniqueTargetsNames,
  getTarget,
  addKey,
  removeKey,
} from "./../src/focus-target/func.focus-target";

const targets = [
  {
    name: "field1",
    keys: [
      ["Control", "ArrowUp"],
      ["Control", "ArrowDown"],
    ],
  },
  { name: "field3", keys: [["Control", "ArrowDown"]] },
  { name: "field3", previous: "field2", keys: [["Control", "Shift"]] },
  {
    name: "field2",
    keys: [
      ["Control", "ArrowUp"],
      ["Control", "Shift"],
    ],
  },
];

describe("FocusTarget", () => {
  it("gets only the unique focus targets names from the passed targets.", () => {
    const expected = ["field1", "field3", "field2"];

    const actual = getUniqueTargetsNames(targets);
    expect(actual).toMatchObject(expected);
  });
  it("gets the first target that matches the passed keys.", () => {
    const expected = {
      name: "field2",
      keys: [
        ["Control", "ArrowUp"],
        ["Control", "Shift"],
      ],
    };

    const [found, actual] = getTarget(targets, ["Control", "Shift"]);
    expect(found ? actual : {}).toMatchObject(expected);
  });
  it("gets the first target that matches the passed keys and previous.", () => {
    const expected = {
      name: "field3",
      previous: "field2",
      keys: [["Control", "Shift"]],
    };
    const [found, actual] = getTarget(targets, ["Control", "Shift"], "field2");
    expect(found ? actual : {}).toMatchObject(expected);
  });
  it("adds a key to the pressed keys array", () => {
    const pressedKeys = ["Control"];
    const expected = ["Control", "Shift"];
    const actual = addKey("Shift", pressedKeys);
    expect(actual).toMatchObject(expected);
  });
  it("removes a key from the pressed keys array", () => {
    const pressedKeys = ["Control", "ArrowUp"];
    const expected = ["Control"];
    const actual = removeKey("ArrowUp", pressedKeys);
    expect(actual).toMatchObject(expected);
  });
});
