import { Config, Target, Props } from "../types/index";
export declare const getUniqueTargetsNames: (targets: Target[]) => string[];
export declare const getTarget: (targets: Target[], pressedKeys: string[], previous?: string | undefined) => [boolean, Target | null];
export declare const addKey: (keyToAdd: string, pressedKeys: string[]) => string[];
export declare const removeKey: (keyToRemove: string, pressedKeys: string[]) => string[];
export declare const useFocusTarget: (config: Config) => Props;
