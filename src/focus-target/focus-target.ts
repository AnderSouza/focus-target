import React, { FocusEvent } from "react";
import { Props, Refs, Target } from "../types/index";
import {
  getUniqueTargetsNames,
  getTarget,
  addKey,
  removeKey,
} from "./func.focus-target";

let pressedKeys: string[] = [];
let currentlyFocused = "";
let refs: Refs = { current: [] };

export default (targets: Target[], global: boolean) : Props => {
  const getRef = (name: string) => {
    for (let ref of refs.current) {
      if (ref.name === name) return ref.ref;
    }
    return null;
  };

  const handleKeyDown = <T>(event: T): void => {
    //@ts-ignore
    pressedKeys = addKey(event.key, pressedKeys);
    const [found, target] = getTarget(targets, pressedKeys, currentlyFocused);
    if (found && target) {
      const ref = getRef(target.name);
      ref && ref.current && ref.current.focus();
    }
  };

  const handleKeyUp = <T>(event: T): void => {
    //@ts-ignore
    pressedKeys = removeKey(event.key, pressedKeys);
  };

  const handleFocus = <T extends { name: string }>(event: FocusEvent<T>) => {
    currentlyFocused = event.target.name;
  };

  const focus = (name: string) => {
    let ref = getRef(name);
    ref && ref.current && ref.current.focus();
  };

  const setup = () => {
    if (!refs.current.length) {
      refs = {
        current: getUniqueTargetsNames(targets).map((name: string) => ({
          name: name,
          ref: React.createRef<any>(),
        })),
      };
      if (global) {
        window.onkeydown = handleKeyDown;
        window.onkeyup = handleKeyUp;
      }
    }
  };

  setup();

  return {
    getRef,
    handleFocus,
    handleKeyDown,
    handleKeyUp,
    focus,
  };
};
