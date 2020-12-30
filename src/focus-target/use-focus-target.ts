import React, { FocusEvent, useRef, useEffect, RefObject } from "react";
import { Props, Refs, Target } from "../types/index";
import {
  getUniqueTargetsNames,
  getTarget,
  addKey,
  removeKey,
} from "./func.focus-target";

export default (targets: Target[], global: boolean): Props => {
  const refs = useRef<Refs>(
    getUniqueTargetsNames(targets).map((name: string) => ({
      name: name,
      ref: React.createRef<any>(),
    }))
  );

  const pressedKeys = useRef<string[]>([]);
  const currentlyFocused = useRef("");

  const getRef = (name: string) => {
    // console.log("trying to get ref for " + name);
    // console.log("internal refs seen from getRef", refs);
    for (let ref of refs.current) {
      if (ref.name === name) {
        // console.log(`Returning this ref for ${name}`, ref.ref);
        return ref.ref;
      }
    }
    return undefined;
  };

  const setRef = (newRef: RefObject<any>) => {
    // console.log("setting new ref", newRef);
    if (newRef && newRef.current) {
      const name = newRef.current.name;
      refs.current.forEach(
        (
          ref: { name: string; ref: RefObject<HTMLInputElement> },
          index: number
        ) => {
          if (ref.name === name) refs.current[index].ref = newRef;
        }
      );
    }
  };

  const handleKeyDown = <T>(event: T): void => {
    //@ts-ignore
    pressedKeys.current = addKey(event.key, pressedKeys.current);
    console.log("these are my pressedkeys", pressedKeys.current);
    const [found, target] = getTarget(
      targets,
      pressedKeys.current,
      currentlyFocused.current
    );
    console.log("and this is my target", target);
    if (found && target) {
      const ref = getRef(target.name);
      console.log('i"m about to focus on', ref);
      ref && ref.current && ref.current.focus();
    }
  };

  const handleKeyUp = <T>(event: T): void => {
    //@ts-ignore
    pressedKeys.current = removeKey(event.key, pressedKeys.current);
  };

  const handleFocus = <T>(event: FocusEvent<T>) => {
    //@ts-ignore
    currentlyFocused.current = event.target.name;
  };

  const focus = (name: string) => {
    let ref = getRef(name);
    ref && ref.current && ref.current.focus();
  };

  useEffect(() => {
    if (global) {
      window.onkeydown = handleKeyDown;
      window.onkeyup = handleKeyUp;
    }
  }, []);

  return {
    getRef,
    setRef,
    handleFocus,
    handleKeyDown,
    handleKeyUp,
    focus,
  };
};
