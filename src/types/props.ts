import { KeyboardEvent, FocusEvent, RefObject } from "react";

type getRef = (name: string) => RefObject<HTMLInputElement> | null;
type handleKeyDown = (event: KeyboardEvent<HTMLElement>) => void;
type handleKeyUp = (event: KeyboardEvent<HTMLElement>) => void;
type handleFocus = (event: FocusEvent<HTMLInputElement>) => void;

type Props = {
  getRef: getRef;
  handleKeyDown: handleKeyDown;
  handleKeyUp: handleKeyUp;
  handleFocus: handleFocus;
};

export type { Props, getRef, handleKeyDown, handleKeyUp, handleFocus };
