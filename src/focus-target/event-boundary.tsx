import React, {
  ReactElement,
  cloneElement,
  CSSProperties,
  useEffect,
} from "react";
import { injectProps, Target } from "../types/index";
import FocusTarget from "./focus-target";

const inject: injectProps = (child, ref, handleFocus) =>
  cloneElement(child, { ref, onFocus: handleFocus });

const isSupported = (type: any) => {
  switch (type) {
    case "input":
    case "textarea":
      return true;
    default:
      return false;
  }
};

export const EventBoundary = ({
  targets,
  initialFocus,
  children,
  className,
  style,
}: {
  targets: Target[];
  initialFocus: string;
  children: ReactElement[];
  className?: string;
  style?: CSSProperties;
}) => {
  const {
    getRef,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
    focus,
  } = FocusTarget(targets, false);

  useEffect(() => {
    focus(initialFocus);
  }, []);
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
