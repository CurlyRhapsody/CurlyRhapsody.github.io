import { keyframes, Stack, Typography } from "@mui/material";
import { CatState } from "./PetCatGameBoard";
import { useMemo } from "react";

const shake = keyframes`
  0% { transform: translate(2px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(0px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
`;

const catIcon: Record<CatState, string> = {
    "CALM": "😸",
    "WARNING": "😼",
    "GLARING": "😾",
    "ATTACKED": "💥"
}

const Cat = ({ gameState, onPet }: {
    gameState: CatState;
    onPet: () => void;
}) => {

    const transformEffect = useMemo(() => {
        if (gameState === CatState.GLARING) {
            return "scale(1.05)";
        }
        return "scale(1)";
    }, [gameState])

    const animationEffect = useMemo(() => {
        if (gameState === CatState.ATTACKED) {
            return `${shake} 0.2s infinite`;
        }
        return "none";
    }, [gameState]);

    return (
        <Stack
            onTouchMove={onPet}
            onMouseMove={onPet}
            sx={{
                width: "30rem",
                height: "30rem",
                alignItems: "center",
                justifyContent: "center",
                border: "0.0625rem solid #161616",
                cursor: gameState === CatState.ATTACKED ? "unset" : "grab",
                userSelect: "none",
                flexDirection: "column",
            }}
        >
            <Stack
                sx={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20rem",
                    lineHeight: "20rem",
                    cursor: gameState === CatState.ATTACKED ? "unset" : "grab",
                    userSelect: "none",
                    flexDirection: "column",
                    transform: transformEffect,
                    animation: animationEffect,
                }}
            >
                {catIcon[gameState]}
            </Stack>
        </Stack>
    )
}

export default Cat;