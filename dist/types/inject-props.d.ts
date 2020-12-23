import { FocusEvent, ReactElement, RefObject } from "react";
export declare type injectProps = <T>(child: ReactElement, ref: RefObject<T> | null, handleFocus: <T extends {
    name: string;
}>(event: FocusEvent<T>) => void) => ReactElement;
