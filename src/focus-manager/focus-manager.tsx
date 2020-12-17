import React, { RefObject, ReactElement, cloneElement } from "react";
import { Config, handleFocus } from "./../types/index";

import { useFocusManager } from "./use-focus-manager";

const injectProps = (
  child: ReactElement,
  ref: RefObject<HTMLInputElement> | null,
  handleFocus: handleFocus
) => {
  return cloneElement(child, { ref, onFocus: handleFocus });
};

export const FocusManager = ({
  config,
  children,
}: {
  config: Config;
  children: ReactElement[];
}) => {
  const { getRef, handleKeyDown, handleKeyUp, handleFocus } = useFocusManager(
    config
  );
  return (
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      {children.map((child: ReactElement) =>
        injectProps(child, getRef(child.props.name), handleFocus)
      )}
    </div>
  );
};
