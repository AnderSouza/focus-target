import { Target } from "./target";

export type Config = {
  initialFocus: {
    target: string;
    delay: number;
  };
  targets: Target[];
};
