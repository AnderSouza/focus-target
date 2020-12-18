import React, {
  KeyboardEvent,
  FocusEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { produce } from "immer";
import { Config, FocusTarget, Props } from "../types/index";
import { WritableDraft } from "immer/dist/internal";

/* WRITE README FOR THE PROJECT */

/* TURN THE PROJECT INTO A NPM PACKAGE */

export const getUniqueFocusTargetsNames = (targets: FocusTarget[]) => {
  const set = new Set<string>();
  targets.forEach((target: FocusTarget) => set.add(target.name));
  return Array.from(set);
};

export const getFocusTarget = (
  targets: FocusTarget[],
  pressedKeys: string[],
  previous?: string
): [boolean, FocusTarget | null] => {
  for (let target of targets) {
    for (let targetKeys of target.keys) {
      const keysMatch = targetKeys.reduce(
        (acc: boolean, targetKey: string) =>
          acc ? pressedKeys.includes(targetKey) : false,
        true
      );

      const previousIsSet = target.previous;
      const previousMatch = previous === target.previous;

      const found = previousIsSet ? previousMatch && keysMatch : keysMatch;

      if (found) {
        return [true, target];
      }
    }
  }
  return [false, null];
};

export const addKey = (keyToAdd: string, pressedKeys: string[]) => {
  const draftFunction = (draft: WritableDraft<string[]>) => {
    draft.push(keyToAdd);
  };
  return produce(pressedKeys, draftFunction);
};

export const removeKey = (keyToRemove: string, pressedKeys: string[]) => {
  const draftFunction = (draft: WritableDraft<string[]>) => {
    return draft.filter((key) => key !== keyToRemove);
  };
  return produce(pressedKeys, draftFunction);
};

export const useFocusManager = (config: Config): Props => {
  const value: string[] = [];
  const [pressedKeys, setPressedKeys] = useState(value);

  const [currentlyFocused, setCurrentlyFocused] = useState("");

  const refs = useRef(
    getUniqueFocusTargetsNames(config.targets).map((name: string) => ({
      name: name,
      ref: React.createRef<HTMLInputElement>(),
    }))
  );

  const getRef = (name: string) => {
    for (let ref of refs.current) {
      if (ref.name === name) return ref.ref;
    }
    return null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void =>
    setPressedKeys(addKey(event.key, pressedKeys));

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>): void =>
    setPressedKeys(removeKey(event.key, pressedKeys));

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setCurrentlyFocused(event.target.name);
  };

  useEffect(() => {
    let ref = getRef(config.initial.target);
    setTimeout(() => {
      ref && ref.current && ref.current.focus();
    }, config.initial.delay);
  }, []);

  useEffect(() => {
    const [found, target] = getFocusTarget(
      config.targets,
      pressedKeys,
      currentlyFocused
    );
    if (found && target) {
      const ref = getRef(target.name);
      ref && ref.current && ref.current.focus();
    }
  }, [pressedKeys, refs, currentlyFocused, config.targets]);

  return {
    getRef,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
  };
};
