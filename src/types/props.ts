import { KeyboardEvent, FocusEvent, RefObject } from "react";

type getRef = <T>(name: string) => RefObject<T> | null;
type handleKeyDown = <T>(event: KeyboardEvent<T>) => void;
type handleKeyUp = <T>(event: KeyboardEvent<T>) => void;
type handleFocus = <T extends {name: string}>(event: FocusEvent<T>) => void;

type Props = {
  getRef: getRef;
  handleKeyDown: handleKeyDown;
  handleKeyUp: handleKeyUp;
  handleFocus: handleFocus;
};

export type { Props, getRef, handleKeyDown, handleKeyUp, handleFocus };
