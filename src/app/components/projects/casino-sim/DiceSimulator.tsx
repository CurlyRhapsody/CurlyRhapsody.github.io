import { Box, Button, Grid, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCasinoSimContext } from "../providers/CasinoSimProvider";
import { useMemo, useState } from "react";
import { Body1, Subtitle2 } from "../../styled/text";

import CasinoIcon from '@mui/icons-material/Casino';
import AddIcon from '@mui/icons-material/Add';
import EditableDice from "./EditableDice";


const DiceSimulator = () => {

    const t = useTranslations("project.casino-sim.dice");
    const { dice, rollDice, addDice, removeDice, changeDiceType } = useCasinoSimContext();
    const [animationTrigger, setAnimationTrigger] = useState<number>(0);
    
    const numDice = useMemo(() => dice.length, [dice]);
    const diceSum = useMemo(() => dice.reduce((acc, curr) => acc + curr.value, 0), [dice]);

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem" }}>
            <Button
                variant="contained"
                startIcon={<CasinoIcon sx={{ fontSize: "1.5rem" }} />}
                sx={{
                    p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                    "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                }}
                onClick={() => { 
                    setAnimationTrigger(Math.random());
                    setTimeout(rollDice, 600);
                }}
            >
                {t("roll")}
            </Button>
            <Grid container columns={5} direction="row" columnSpacing="1rem" rowSpacing="2rem" sx={{ justifyContent: "center", maxWidth: "40.25rem" }}>
                {dice.map((die, index) => (
                    <Grid size={1} sx={{ width: "7.25rem", height: "10rem" }}>
                        <EditableDice
                            key={`dice-${index}`}
                            dice={die}
                            animationTrigger={animationTrigger}
                            isDeleteDisabled={numDice <= 1}
                            onDelete={() => removeDice(index)}
                            onClick={() => changeDiceType(index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Subtitle2>{t("sum", { sum: diceSum })}</Subtitle2>
            <Stack direction="column" sx={{ alignItems: "center", justifyContent: "space-around", gap: "2rem" }}>
                <Box>
                    <Subtitle2 sx={{ width: "100%", textAlign: "center", mt: "0.25rem" }}>{t("click2Change")}</Subtitle2>
                    <Body1 sx={{ width: "100%", textAlign: "center", mt: "0.25rem" }}>{t("available")}</Body1>
                </Box>
                <Box>
                    <Button
                        startIcon={<AddIcon sx={{ fontSize: "1.5rem" }} />}
                        sx={{
                            p: "1rem", width: "20rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                            "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                        }}
                        variant="contained"
                        disabled={numDice >= 10}
                        onClick={addDice}
                    >
                        {t("adjust")}
                    </Button>
                    <Body1 sx={{ width: "100%", textAlign: "center", mt: "0.25rem" }}>{t("limit")}</Body1>
                </Box>
            </Stack>
            
        </Stack>
    )
}

export default DiceSimulator;