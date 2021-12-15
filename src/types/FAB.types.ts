import type { CssColorClass } from "./materialize.types";

export interface FABButtons {
    icon: string,
    action: () => void,
    color: CssColorClass,
}