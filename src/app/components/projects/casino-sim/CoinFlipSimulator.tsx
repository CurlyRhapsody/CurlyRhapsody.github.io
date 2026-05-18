import { useTranslations } from "next-intl";
import { useCasinoSimContext } from "../providers/CasinoSimProvider";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { Box, Button, Grid, IconButton, Stack } from "@mui/material";
import TossingCoin from "./TossingCoin";
import { useMemo, useState } from "react";
import { Body1, Subtitle2 } from "../../styled/text";

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CoinFlipSimulator = () => {

    const t = useTranslations("project.casino-sim.coin-flip");
    const { coins, flipCoins, addCoins, removeCoins } = useCasinoSimContext();
    const [animationTrigger, setAnimationTrigger] = useState<number>(0);
    const numCoins = useMemo(() => coins.length, [coins]);
    const numHeads = useMemo(() => coins.filter(coin => coin === true).length, [coins]);
    const numTails = useMemo(() => numCoins - numHeads, [coins]);

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem" }}>
            <Button
                variant="contained"
                startIcon={<PaidOutlinedIcon sx={{ fontSize: "1.5rem" }} />}
                sx={{ p: "1rem", width: "fit-content", borderRadius: "0.5rem" }}
                onClick={() => { 
                    setAnimationTrigger(Math.random());
                    setTimeout(flipCoins, 600);
                }}
            >
                {t("toss")}
            </Button>
            <Grid container columns={5} direction="row" spacing="1rem" sx={{ justifyContent: "center" }}>
                {coins.map((coin, index) => (
                    <Grid size={1} sx={{ width: "7.25rem", height: "7.25rem" }}>
                        <TossingCoin key={`coin-${index}`} isHead={coin} animationTrigger={animationTrigger} />
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "space-around" }}>
                <Subtitle2>{t("numHeads", { count: numHeads })}</Subtitle2>
                <Subtitle2>{t("numTails", { count: numTails })}</Subtitle2>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-around", gap: "2.5rem" }}>
                <Box>
                    <Body1 sx={{ width: "100%", textAlign: "center", mt: "0.25rem" }}>{t("adjust")}</Body1>
                    <Body1 sx={{ width: "100%", textAlign: "center", mt: "0.25rem" }}>{t("limit")}</Body1>
                </Box>
                <Stack direction="row" sx={{ gap: "0.75rem", alignItems: "center" }}>
                    <IconButton disabled={numCoins <= 1} onClick={removeCoins}>
                        <RemoveIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                    <Subtitle2>{numCoins}</Subtitle2>
                    <IconButton disabled={numCoins >= 10} onClick={addCoins}>
                        <AddIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </Stack>
                
            </Stack>
        </Stack>
    )

}

export default CoinFlipSimulator;