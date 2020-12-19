import React, {
  RefObject,
  ReactElement,
  cloneElement,
  CSSProperties,
} from "react";
import { injectProps, Config } from "../types/index";
import { useFocusTarget } from "./use-focus-target";

const inject: injectProps = (child, ref, handleFocus) => {
  return cloneElement(child, { ref, onFocus: handleFocus });
};

const isSupported = (type: any) => {
  switch (type) {
    case "input":
    case "textarea":
      return true;
    default:
      return false;
  }
};

export const FocusTarget = ({
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
  const { getRef, handleKeyDown, handleKeyUp, handleFocus } = useFocusTarget(
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
          ? inject(child, getRef(child.props.name), handleFocus)
          : child
      )}
    </div>
  );
};
