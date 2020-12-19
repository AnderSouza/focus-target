import { ReactElement, RefObject } from "react";
import { handleFocus } from "./props";
export type injectProps = <T>(
  child: ReactElement,
  ref: RefObject<T> | null,
  handleFocus: handleFocus
) => ReactElement;
