import { produce } from "immer";
import { Target } from "../types/index";
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
            acc
              ? pressedKeys.includes(
                  targetKey.length === 1 ? targetKey.toLowerCase() : targetKey
                )
              : false,
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
