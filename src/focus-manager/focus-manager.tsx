import React, {
  RefObject,
  ReactElement,
  cloneElement,
  CSSProperties,
} from "react";
import { Config, handleFocus } from "./../types/index";

import { useFocusManager } from "./use-focus-manager";

const injectProps = (
  child: ReactElement,
  ref: RefObject<HTMLInputElement> | null,
  handleFocus: handleFocus
) => {
  return cloneElement(child, { ref, onFocus: handleFocus });
};

const isSupported = (type: any) => {
  console.log("type", type);
  switch (type) {
    case "input":
    case "textarea":
      return true;
    default:
      return false;
  }
};

export const FocusManager = ({
  config,
  children,
  className,
  style,
}: {
  config: Config;
  children: ReactElement[];
  className?: string;
  style?: CSSProperties;
}) => {
  const { getRef, handleKeyDown, handleKeyUp, handleFocus } = useFocusManager(
    config
  );
  return (
    <div
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className={className}
      style={{ outline: "none", ...style }}
      tabIndex={1000}
    >
      {children.map((child: ReactElement) =>
        isSupported(child.type)
          ? injectProps(child, getRef(child.props.name), handleFocus)
          : child
      )}
    </div>
  );
};
