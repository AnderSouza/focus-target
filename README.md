# Focus Target

![GitHub repo size](https://img.shields.io/github/repo-size/andersouza/focus-target?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/andersouza/focus-target?style=for-the-badge) ![npm](https://img.shields.io/npm/v/focus-target?style=for-the-badge)

Focus Target is a focus management utility that allows React developers to easily create navigation flows and control where and how the focus in the page goes.
You can set keyboard shortcuts and define what element will have the initial focus.

## :star2: Features

- :+1: React Component with a non-intrusive syntax.
- :keyboard: Set your own keyboard shortcuts. As many as you like.
- :mag: Initial focus definition.
- :gear: Also offers a custom React Hook.
- :shield: Build with TypeScript.

## :computer: Installation

You can get it through NPM.

```
npm install --save focus-target
```

## :hammer_and_wrench: Usage

#### Here's how to use the component:

```react
import React from "react";
import { FocusTarget } from "focus-target";
const config = {
  initialFocus: {
    target: "firstName",
    delay: 250,
  },
  targets: [
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
      keys: [["Control", "Alt", "3"]],
    },
  ],
};
export function App() {
  return (
    <FocusTarget config={config}>
      <label>
        First name: <input name="firstName" type="text" />
      </label>
      <label>
        Last name: <input name="lastName" type="text" />
      </label>
      <label>
        Age: <input name="age" type="number" />
      </label>
    </FocusTarget>
  );
}
```

This is the **`Config`** type:

```typescript
 type Config = {
     initialFocus: {
         target: string;
         delay: number;
     };
	targets: Target[];
}
```

And this is the **`Target`** type:

``` typescript
 type Target = {
 	name: string;
  	previous?: string;
 	keys: string[][];
};
```

The **`Config`** takes an object with the initial focus and the targets. 

The `initialFocus` basically receives the name of the input and the delay in millisseconds used to apply the focus. The delay exists for cases in which you might apply the focus on a component that takes a little time to mount.

The `targets` themselves are composed of the values of the `name` attribute of the inputs and the ```event.key``` value for any keys you decide to use. 

In all, the refs and event handlers themselves are being passed to the elements under the hood.

#### Here's how to use the Hook:

``` react
import React from "react";
import { useFocusTarget } from "focus-target";

const config = {
  initialFocus: {
    target: "firstName",
    delay: 250,
  },
  targets: [
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
      keys: [["Control", "Alt", "3"]],
    },
  ],
};

export function App() {
  const { getRef, handleKeyDown, handleKeyUp, handleFocus } = useFocusTarget(
    config
  );
  return (
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <label>
        First name:
        <input
          name="firstName"
          type="text"
          onFocus={handleFocus}
          ref={getRef("firstName")}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          type="text"
          onFocus={handleFocus}
          ref={getRef("lastName")}
        />
      </label>
      <label>
        Age:
        <input
          name="age"
          type="number"
          onFocus={handleFocus}
          ref={getRef("age")}
        />
      </label>
    </div>
  );
}
```

These are the types for the returned props:

**``` type getRef = <T>(name: string) => RefObject<T> | null;```**

**`` type handleKeyDown = <T>(event: KeyboardEvent<T>) => void``**

**`` type handleKeyUp = <T>(event: KeyboardEvent<T>) => void;``**

**`` type handleFocus = <T extends {name: string}>(event: FocusEvent<T>) => void;``**

We're using the `handleFocus` to let the hook know which input is currently focused and `getRef` to retrieve an internal reference to be applied to the element.

The enclosing div was made focusable through the `tabIndex` property. Therefore it must be focused in order to capture keyboard events. `handleKeyUp` and `handleKeyDown`were associated to it in order to make it work as a event boundary around the inputs. 

In case you want the events to be captured on the page as a whole, associating `handleKeyDown` and `handleKeyUp` to the window object could solve your problem.

## :email: Contact

If you want to contact me you can reach me at <andersonoliveira_souza@outlook.com>.

## :page_facing_up: License

This project is licensed under the [MIT License](./LICENSE).