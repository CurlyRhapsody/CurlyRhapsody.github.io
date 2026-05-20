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
        if (markSixLottery.length === 0) return t("noParti");
        switch (markSixPrize) {
            case 0: return t("0Prize");
            case 1: return t("1Prize");
            case 2: return t("2Prize");
            case 3: return t("3Prize");
            case 4: return t("4Prize");
            case 5: return t("5Prize");
            case 6: return t("6Prize");
            case 7: return t("7Prize");
        }
    })()

    return (
        <>
            <PickLotteryPopup open={isPopupOpened} onClose={() => setIsPopupOpened(false)} />
            <Stack sx={{ alignItems: "center", gap: "1rem", width: "100%" }}>
                <Stack direction="row" sx={{ width: "100%" }}>
                    <Stack sx={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                        <Button
                            disabled={markSixDrawn.length > 0}
                            variant="contained"
                            startIcon={<BookOnlineIcon sx={{ fontSize: "1.5rem" }} />}
                            sx={{
                                p: "1rem", width: "10rem", borderRadius: "0.5rem",
                                "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                            }}
                            onClick={() => setIsPopupOpened(true)}
                        >
                            {t("buy")}
                        </Button>
                    </Stack>
                    <Stack direction="column" sx={{ flex: 5, gap: "1rem" }}>
                        <Subtitle1>{t("yourNum")}</Subtitle1>
                        <Grid container direction="row" columns={6} spacing="0.625rem" sx={{ height: "3.75rem" }}>
                            {markSixLottery.map((val, i) => (
                                <Grid key={`lottery-picked-${i}`} size={1} sx={{ width: "fit-content" }}>
                                    <MarkSixBall val={val} />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Stack>

                <Stack direction="row" sx={{ width: "100%" }}>
                    <Stack sx={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                        <Button
                            disabled={markSixDrawn.length > 0}
                            variant="contained"
                            startIcon={<PlayArrowIcon sx={{ fontSize: "1.5rem" }} />}
                            sx={{
                                p: "1rem", width: "10rem", borderRadius: "0.5rem",
                                "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                            }}
                            onClick={() => {
                                setIsAllDrawn(false);
                                drawMarkSix();
                            }}
                        >
                            {t("start")}
                        </Button>
                    </Stack>
                    <Stack direction="column" sx={{ flex: 5, gap: "1rem" }}>
                        <Subtitle1>{t("drawnNumber")}</Subtitle1>
                        <Grid container direction="row" spacing="0.625rem" columns={7} sx={{ height: "6rem" }}>
                            {markSixDrawn.map((val, i) => (
                                <Grid key={`comp-drawn-${i}`} size={1} sx={{ width: "fit-content", }}>
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            delay: isAllDrawn ? 0 : (i * 1.5),
                                            duration: isAllDrawn ? 0 : 0.5
                                        }}
                                    >
                                        <MarkSixBall val={val} />
                                    </motion.div>
                                    <Body1 sx={{ textAlign: "center", mt: "0.5rem" }}>{ballIndex[i]}</Body1>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Stack>

                <Subtitle1 sx={{ whiteSpace: "pre-wrap", textAlign: "center", minHeight: "1.75rem" }}>{renderPrizeText}</Subtitle1>
                <Button
                    disabled={typeof renderPrizeText === "undefined"}
                    variant="contained"
                    startIcon={<ReplayIcon sx={{ fontSize: "1.5rem" }} />}
                    sx={{
                        p: "1rem", width: "10rem", borderRadius: "0.5rem",
                        "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                    }}
                    onClick={() => {
                        markSixReset();
                        setIsAllDrawn(false);
                    }}
                >
                    {t("reset")}
                </Button>
            </Stack>
        </>
    );
}

export default MarkSixSimulator;