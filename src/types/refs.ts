import { RefObject } from "react";

export type Refs = {
  name: string;
  ref: RefObject<HTMLInputElement>;
}[];
