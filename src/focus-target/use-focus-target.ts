import React, {
  KeyboardEvent,
  FocusEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { produce } from "immer";
import { Config, Target, Props } from "../types/index";
import { WritableDraft } from "immer/dist/internal";

export const getUniqueTargetsNames = (targets: Target[]) => {
  const set = new Set<string>();
  targets.forEach((target: Target) => set.add(target.name));
  return Array.from(set);
};

export const getTarget = (
  targets: Target[],
  pressedKeys: string[],
  previous?: string
): [boolean, Target | null] => {
  for (let target of targets) {
    for (let targetKeys of target.keys) {
      const sizeMatches = targetKeys.length === pressedKeys.length;
      const keysMatch =
        sizeMatches &&
        targetKeys.reduce(
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
    !draft.includes(keyToAdd) && draft.push(keyToAdd);
  };
  return produce(pressedKeys, draftFunction);
};

export const removeKey = (keyToRemove: string, pressedKeys: string[]) => {
  const draftFunction = (draft: WritableDraft<string[]>) => {
    return draft.filter((key) => key !== keyToRemove);
  };
  return produce(pressedKeys, draftFunction);
};

export const useFocusTarget = (config: Config): Props => {
  const value: string[] = [];
  const [pressedKeys, setPressedKeys] = useState(value);

  const [currentlyFocused, setCurrentlyFocused] = useState("");

  const refs = useRef(
    getUniqueTargetsNames(config.targets).map((name: string) => ({
      name: name,
      ref: React.createRef<any>(),
    }))
  );

  const getRef = (name: string) => {
    for (let ref of refs.current) {
      if (ref.name === name) return ref.ref;
    }
    return null;
  };

  const handleKeyDown = <T>(event: KeyboardEvent<T>): void =>
    setPressedKeys(addKey(event.key, pressedKeys));

  const handleKeyUp = <T>(event: KeyboardEvent<T>): void =>
    setPressedKeys(removeKey(event.key, pressedKeys));

  const handleFocus = <T extends { name: string }>(event: FocusEvent<T>) => {
    setCurrentlyFocused(event.target.name);
  };

  useEffect(() => {
    let ref = getRef(config.initialFocus.target);
    setTimeout(() => {
      ref && ref.current && ref.current.focus();
    }, config.initialFocus.delay);
  }, []);

  useEffect(() => {
    const [found, target] = getTarget(
      config.targets,
      pressedKeys,
      currentlyFocused
    );
    if (found && target) {
      const ref = getRef(target.name);
      ref && ref.current && ref.current.focus();
    }
  }, [pressedKeys]);

  return {
    getRef,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
  };
};
