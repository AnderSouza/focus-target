# Focus Target

![GitHub repo size](https://img.shields.io/github/repo-size/andersouza/focus-target?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/andersouza/focus-target?style=for-the-badge) ![npm](https://img.shields.io/npm/v/focus-target?style=for-the-badge)

Focus Target is a focus management utility that allows React developers to easily create navigation flows and control where and how the focus in the page goes.
You can set keyboard shortcuts and define what element will have the initial focus.

**You can find a [live demo](https://andersonsouza.dev/focus-target) here**.

## :star2: Features

- :thumbsup: React Component with a non-intrusive syntax.
- :gear: Custom hook to provide more flexibility.
- :keyboard: Set your own keyboard shortcuts. As many as you like.
- :mag: Initial focus definition.
- :shield: Built with TypeScript.

## :computer: Installation

You can get it through NPM.

```
npm install --save focus-target
```

## :hammer_and_wrench: Usage

#### Here's how to use the component:

```typescript
import React from "react";
import { EventBoundary } from "focus-target";
const targets = [
  {
    name: "firstName",
    keys: [["Control", "Alt", "1"]],
  },
  {
    name: "lastName",
    keys: [["Control", "Alt", "2"]],
  },
  {
    name: "age",
    previous: "lastName",
    keys: [["Control", "Alt", "3"]],
  },
];
export function App() {
  return (
    <EventBoundary targets={targets} initialFocus="firstName">
      <label>First name:</label>
      <input name="firstName" type="text" />
      <label>Last name:</label>
      <input name="lastName" type="text" />
      <label>Age:</label>
      <input name="age" type="number" />
    </EventBoundary>
  );
}
```

This is the **`Target`** type:

```typescript
 type Target = {
  name: string;
  previous?: string;
  keys: string[][];
}
```

The **`EventBoundary`** takes an array of **`Target`** objects. The `initialFocus` basically receives the name of the input used to apply the focus on once the component mounts. 

The `targets` themselves are composed of the values of the `name` attribute of the inputs, the ```event.key``` value for any keys you decide to use and the `previous` element. The previous element corresponds to the element that is focused at the moment you press the keys shortcut. Look at this target taken from the example:

```typescript
{
  name: "age",
  previous: "lastName",
  keys: [["Control", "Alt", "3"]],
}
```

This `target` determines that the shortcut `Control` + `Alt` + `3` is only going to work if the input with the name `lastName` is focused at the moment the shortcut is pressed.

**`EventBoundary`** only captures events when itself or its inputs are focused. In order to capture events globally, you should use the **`useFocusTarget`** hook described further down.

Lastly, you should know that refs and event handlers are being passed to the elements under the hood. They are required to make the event capturing and focus work properly. But **they are only going to work if the inputs are at the first nesting level**. The following example **wouldn't** work. Note how the inputs are inside the labels, therefore not in the first nesting level.

```typescript
export function App() {
  return (
    <EventBoundary targets={targets} initialFocus="firstName">
      <label>
        First name: <input name="firstName" type="text" />
      </label>
      <label>
        Last name: <input name="lastName" type="text" />
      </label>
      <label>
        Age:
        <input name="age" type="number" />
      </label>
    </EventBoundary>
  );
}
```

#### Here's how to use the useFocusTarget hook:

``` typescript
import React, { useEffect } from "react";
import { useFocusTarget } from "focus-target";

const targets = [
  {
    name: "firstName",
    keys: [["Control", "Alt", "1"]],
  },
  {
    name: "lastName",
    keys: [["Control", "Alt", "2"]],
  },
  {
    name: "age",
    previous: "lastName",
    keys: [["Control", "Alt", "3"]],
  },
];

export function App() {
  const {
    getRef,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
    focus,
  } = useFocusTarget(targets, false);
  useEffect(() => {
    focus("firstName");
  }, []);
  return (
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <label>First name:</label>
      <input
        name="firstName"
        type="text"
        ref={getRef("firstName")}
        onFocus={handleFocus}
      />
      <label>Last name:</label>
      <input
        name="lastName"
        type="text"
        ref={getRef("lastName")}
        onFocus={handleFocus}
      />
      <label>Age:</label>
      <input
        name="age"
        type="number"
        ref={getRef("age")}
        onFocus={handleFocus}
      />
    </div>
  );
}
```

The **`useFocusTarget`** hook can be used instead of the **`EventBoundary`** component. It takes two arguments: the targets and a boolean to indicate whether the event capturing will be global or not.

In the above example the global event capturing is deactivated and a `div` was used to wrap the inputs inside the `handleKeyDown` and `handleKeyUp` handlers. Activating global event capturing would make these two handlers be attached to the `window`  object. In addition, `useEffect` was used to setup the initial focus on the `firstName` input once the component mounts.

`getRef` returns a referent to be attached to the correspondent input and `handleFocus` is used in order to know which component is currently focused.

## :email: Contact

If you want to contact me, checkout my website https://andersonsouza.dev.

## :page_facing_up: License

This project is licensed under the [MIT License](./LICENSE).
