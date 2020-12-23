import React, { ReactElement, CSSProperties } from "react";
import { Target } from "../types/index";
export declare const EventBoundary: ({ targets, initialFocus, children, className, style, }: {
    targets: Target[];
    initialFocus: string;
    children: ReactElement[];
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
}) => JSX.Element;
