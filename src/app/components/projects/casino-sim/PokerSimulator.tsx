import PokerCardIcon from "@/app/assets/svg/PokerCardIcon";
import { Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCasinoSimContext } from "../providers/CasinoSimProvider";
import { PokerCard } from "./PokerCard";
import HandBoard from "./HandBoard";
import { useState } from "react";

const PokerSimulator = () => {

    const { drawnCards, drawCards } = useCasinoSimContext();
    const [animationTrigger, setAnimationTrigger] = useState<number>(0);
    const t = useTranslations("project.casino-sim.poker");

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem" }}>
            <Button
                variant="contained"
                startIcon={<PokerCardIcon props={{ fontSize: "1.5rem", fill: "white" }} />}
                sx={{
                    p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem", 
                    "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                }}
                onClick={() => { drawCards(); setAnimationTrigger(Math.random()); }}
            >
                {t("draw")}
            </Button>
            <Stack direction="row" sx={{ gap: "1rem" }}>
                {drawnCards.map((card, index) => (
                    <PokerCard key={`card${index}-${card?.suit}${card?.rank}`} card={card} animationTrigger={animationTrigger} />
                ))}
            </Stack>
            <HandBoard />
        </Stack>
    )
}

export default PokerSimulator;