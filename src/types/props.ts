import { KeyboardEvent, FocusEvent, RefObject } from "react";

type Props = {
  getRef: (name: string) => RefObject<any> | undefined;
  setRef: (ref: RefObject<any>) => void;
  handleKeyDown: <T>(event: KeyboardEvent<T>) => void;
  handleKeyUp: <T>(event: KeyboardEvent<T>) => void;
  handleFocus: <T>(event: FocusEvent<T>) => void;
  focus: (name: string) => void;
};

export type { Props };
