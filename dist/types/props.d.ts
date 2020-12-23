import { KeyboardEvent, FocusEvent, RefObject } from "react";
declare type Props = {
    getRef: (name: string) => RefObject<any> | null;
    handleKeyDown: <T>(event: KeyboardEvent<T>) => void;
    handleKeyUp: <T>(event: KeyboardEvent<T>) => void;
    handleFocus: <T extends {
        name: string;
    }>(event: FocusEvent<T>) => void;
    focus: (name: string) => void;
};
export type { Props };
