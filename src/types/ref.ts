import {RefObject} from "react";

export type Ref = {
  name: string;
  element: RefObject<HTMLElement>;
};
