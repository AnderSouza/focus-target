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

// WRITE UNIT TESTS FOR ALL THESE FUNCTIONS
const getUniqueTargets = (targets: FocusTarget[]) => {
  const set = new Set();
  return targets.filter((target: FocusTarget) => {
    if (set.has(target.name)) {
      return false;
    } else {
      set.add(target.name);
      return true;
    }
  });
};

export const useFocusManager = (config: Config): Props => {
  const value: string[] = [];
  const [pressedKeys, setPressedKeys] = useState(value);

  const [currentlyFocused, setCurrentlyFocused] = useState("");

  const refs = useRef(
    getUniqueTargets(config.targets).map((target) => ({
      name: target.name,
      ref: React.createRef<HTMLInputElement>(),
    }))
  );

  const getTarget = (keys: string[], previous?: string) => {
    for (let target of config.targets) {
      for (let targetKeys of target.keys) {
        const KEYS_MATCH = targetKeys.reduce(
          (acc: boolean, targetKey: string) =>
            acc ? keys.includes(targetKey) : false,
          true
        );

        const PREVIOUS_IS_SET = previous && target.previous;
        const PREVIOUS_MATCH = previous === target.previous;

        const FOUND = PREVIOUS_IS_SET
          ? PREVIOUS_MATCH && KEYS_MATCH
          : KEYS_MATCH;

        if (FOUND) {
          return target;
        }
      }
    }
    return null;
  };

  const getRef = (name: string) => {
    for (let ref of refs.current) {
      if (ref.name === name) return ref.ref;
    }
    return null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    const addKey = (draft: WritableDraft<string[]>) => {
      draft.push(event.key);
    };
    handleKey(event, addKey);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>): void => {
    const removeKey = (draft: WritableDraft<string[]>) => {
      return draft.filter((key) => key !== event.key);
    };
    handleKey(event, removeKey);
  };

  const handleKey = (
    event: KeyboardEvent<HTMLElement>,
    draftFunction: (draft: WritableDraft<string[]>) => any
  ) => {
    const updatedPressedKeys = produce(pressedKeys, draftFunction);
    setPressedKeys(updatedPressedKeys);
  };

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
    const target = getTarget(pressedKeys, currentlyFocused);
    if (target) {
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
