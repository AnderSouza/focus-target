import {RefObject} from "react";

export type Refs = {
  current: {
    name: string;
    ref: React.RefObject<HTMLInputElement>;
  }[];
}
