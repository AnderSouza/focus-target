import { FocusEvent, ReactElement, RefObject } from "react";
export type injectProps = <T>(
  child: ReactElement,
  ref: RefObject<T> | undefined,
  handleFocus: <T>(event: FocusEvent<T>) => void
) => ReactElement;
