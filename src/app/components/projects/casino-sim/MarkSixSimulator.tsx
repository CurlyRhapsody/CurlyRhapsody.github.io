import { Button, Grid, Stack } from "@mui/material";
import MarkSixBall from "./MarkSixBall";
import { useCasinoSimContext } from '../providers/CasinoSimProvider';
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Subtitle1, Body1 } from '../../styled/text';
import PickLotteryPopup from "./PickLotteryPopup";
import { motion } from "motion/react"

import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';

const ballIndex: { [index: number]: string } = {
    0: "1st",
    1: "2nd",
    2: "3rd",
    3: "4th",
    4: "5th",
    5: "6th",
    6: "SP"
}

const MarkSixSimulator = () => {

    const t = useTranslations("project.casino-sim.mark-six");
    const { markSixLottery, markSixDrawn, markSixPrize, drawMarkSix, markSixReset } = useCasinoSimContext();
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
    const [isAllDrawn, setIsAllDrawn] = useState<boolean>(true);

    const renderPrizeText = ((): string | undefined => {
        if (typeof markSixPrize === "undefined") return undefined;
        switch (markSixPrize) {
            case -1: return t("noParti");
            case 0: return t("0prize");
            case 1: return t("1prize");
            case 2: return t("2prize");
            case 3: return t("3prize");
            case 4: return t("4prize");
            case 5: return t("5prize");
            case 6: return t("6prize");
            case 7: return t("7prize");
        }
    })()

    return (
        <>
            <PickLotteryPopup open={isPopupOpened} onClose={() => setIsPopupOpened(false)} />
            <Stack sx={{ alignItems: "center", gap: "2rem", width: "100%" }}>
                <Stack direction="row" sx={{ width: "100%", justifyContent: "space-around" }}>
                    <Button
                        disabled={markSixDrawn.length > 0}
                        variant="contained"
                        startIcon={<BookOnlineIcon sx={{ fontSize: "1.5rem" }} />}
                        sx={{
                            p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                            "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                        }}
                        onClick={() => setIsPopupOpened(true)}
                    >
                        {t("buy")}
                    </Button>

                    <Button
                        disabled={markSixDrawn.length > 0}
                        variant="contained"
                        startIcon={<PlayArrowIcon sx={{ fontSize: "1.5rem" }} />}
                        sx={{
                            p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                            "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                        }}
                        onClick={() => {
                            setIsAllDrawn(false);
                            setTimeout(() => setIsAllDrawn(true), 9000)
                            drawMarkSix();
                        }}
                    >
                        {t("start")}
                    </Button>
                </Stack>

                <Stack sx={{ width: "100%", gap: "1rem", px: "2rem" }}>
                    <Subtitle1>{t("yourNum")}</Subtitle1>
                    <Grid container direction="row" columns={6} spacing="1.25rem" sx={{ height: "3.75rem" }}>
                        {markSixLottery.map((val, i) => (
                            <Grid key={`lottery-picked-${i}`} size={1} sx={{ width: "fit-content" }}>
                                <MarkSixBall val={val} />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>

                <Stack sx={{ width: "100%", gap: "1rem", px: "2rem" }}>
                    <Subtitle1>{t("drawnNumber")}</Subtitle1>
                    <Grid container direction="row" spacing="1.25rem" columns={7} sx={{ height: "6rem" }}>
                        {markSixDrawn.map((val, i) => (
                            <Grid key={`comp-drawn-${i}`} size={1} sx={{ width: "fit-content", }}>
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: isAllDrawn ? 0 : (i * 1.25),
                                        duration: isAllDrawn ? 0 : 0.25
                                    }}
                                >
                                    <MarkSixBall val={val} />
                                </motion.div>
                                <Body1 sx={{ textAlign: "center", mt: "0.5rem" }}>{ballIndex[i]}</Body1>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>

                <Subtitle1 sx={{ whiteSpace: "pre-wrap", textAlign: "center", minHeight: "3.5rem" }}>{renderPrizeText}</Subtitle1>
                <Button
                    disabled={!isAllDrawn || markSixDrawn.length === 0}
                    variant="contained"
                    startIcon={<ReplayIcon sx={{ fontSize: "1.5rem" }} />}
                    sx={{
                        p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                        "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                    }}
                    onClick={() => {
                        markSixReset();
                        setIsAllDrawn(true);
                    }}
                >
                    {t("reset")}
                </Button>
            </Stack>
        </>
    );
}

export default MarkSixSimulator;