import { SxProps } from "@mui/material";
import { DiceType } from "./types";

export const diceStyles: Record<DiceType, SxProps> = {
    [DiceType.FOUR]: {
        clipPath: "polygon(50% 6.67%, 0% 93.33%, 100% 93.33%)",
        background: "#E74C3C",
    },
    [DiceType.SIX]: {
        background: "#2980B9",
    },
    [DiceType.EIGHT]: {
        clipPath: "polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)",
        background: "#27AE60",
    },
    [DiceType.TEN]: {
        clipPath: "polygon(50% 0%, 0% 80%, 50% 100%, 100% 80%)",
        background: "#8E44AD",
    },
    [DiceType.TWLEVE]: {
        clipPath: "polygon(50% 2.5%, 100% 40.7%, 80.9% 97.5%, 19.1% 97.5%, 0% 40.7%)",
        background: "#E67E22",
    },
    [DiceType.TWENTY]: {
        clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);",
        background: "#34495E",
    }
}