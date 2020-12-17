import { RefObject } from "react";
import { FocusTarget } from "./focus-target";

type Config = {
  initial: {
    target: string;
    delay: number;
  };
  targets: FocusTarget[];
};

export type { Config };
