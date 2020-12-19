import { KeyboardEvent, FocusEvent, RefObject } from "react";
declare type getRef = <T>(name: string) => RefObject<T> | null;
declare type handleKeyDown = <T>(event: KeyboardEvent<T>) => void;
declare type handleKeyUp = <T>(event: KeyboardEvent<T>) => void;
declare type handleFocus = <T extends {
    name: string;
}>(event: FocusEvent<T>) => void;
declare type Props = {
    getRef: getRef;
    handleKeyDown: handleKeyDown;
    handleKeyUp: handleKeyUp;
    handleFocus: handleFocus;
};
export type { Props, getRef, handleKeyDown, handleKeyUp, handleFocus };
