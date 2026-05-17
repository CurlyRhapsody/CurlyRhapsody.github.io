import PokerCardIcon from "@/app/assets/svg/PokerCardIcon";
import { Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCasinoSimContext } from "../providers/CasinoSimProvider";
import { PokerCard } from "./PokerCard";

const PokerSimulator = () => {

    const { hand, drawCards } = useCasinoSimContext();
    const t = useTranslations("project.casino-sim.poker");

    console.log(hand)

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem" }}>
            <Button
                variant="contained"
                startIcon={<PokerCardIcon props={{ fontSize: "1.5rem", fill: "white" }} />}
                sx={{ p: "1rem", width: "fit-content", borderRadius: "0.5rem" }}
                onClick={drawCards}
            >
                {t("draw")}
            </Button>
            <Stack direction="row" sx={{ gap: "1rem" }}>
                {hand.map((card, index) => (
                    <PokerCard key={`card${index}-${card?.suit}${card?.rank}`} card={card} />
                ))}
            </Stack>
            
        </Stack>
    )
}

export default PokerSimulator;