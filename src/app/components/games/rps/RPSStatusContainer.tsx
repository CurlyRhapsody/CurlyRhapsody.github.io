import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Button, Stack, Grid } from '@mui/material';
import { Body1, Subtitle1, Subtitle2 } from '../../styled/text';
import { useRPSContext } from "../providers/RPSProvider";
import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import useResponsiveSizing from '../../hooks/useResponsiveSizing';

const FlashingStatus = ({ title, count, color }: {
    title: string;
    count: number;
    color: string;
}) => {
    const t = useTranslations("games.rps");
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            color: [color, "#000000"],
            transition: { duration: 1, times: [0, 1] }
        });
    }, [count, color, controls]);

    return (
        <Body1>
            {t.rich(title, {
                count: count,
                flash: (content) => (
                    <motion.span animate={controls} initial={{ color: "#000000" }}>
                        {content}
                    </motion.span>
                )
            })}
        </Body1>
    )
}

const RPSStatusContainer = () => {

    const t = useTranslations("games.rps");
    const { gameState, totalWins, totalLoses, totalDraws, totalGames, resetStats } = useRPSContext();
    const { isMobile } = useResponsiveSizing();

    return (
        <Stack sx={{ gap: "2rem", height: "100%" }}>
            <ShadowedStack
                sx={{
                    borderRadius: "1rem", p: "1rem", background: "#FFFFFF",
                    height: "3.75rem", width: "100%", justifyContent: "center"
                }}
            >
                <Subtitle2 sx={{ height: "1.75rem" }}>{!!gameState ? t(gameState) : ""}</Subtitle2>
            </ShadowedStack>
            <ShadowedStack
                sx={{
                    borderRadius: "1rem", p: "1rem", background: "#FFFFFF",
                    height: "100%", width: "100%", justifyContent: "flex-start", gap: "1.25rem"
                }}
            >
                <Subtitle1 sx={{ textAlign: "center" }}>{t("stats.title")}</Subtitle1>
                <Grid container direction="row" columns={isMobile ? 2 : 1} spacing="1.25rem">
                    <Grid size={1}>
                        <Body1>{t("stats.games", { count: totalGames })}</Body1>
                    </Grid>
                    <Grid size={1}>
                        <FlashingStatus title={"stats.wins"} count={totalWins} color={"#00D40A"} />
                    </Grid>
                    <Grid size={1}>
                        <FlashingStatus title={"stats.loses"} count={totalLoses} color={"#C20000"} />
                    </Grid>
                    <Grid size={1}>
                        <FlashingStatus title={"stats.draws"} count={totalDraws} color={"#FFC500"} />
                    </Grid>
                </Grid>
                <Button
                    variant="outlined"
                    onClick={resetStats}
                    sx={{ fontSize: "1.375rem", borderRadius: "0.75rem" }}
                >
                    {t("stats.reset")}
                </Button>
            </ShadowedStack>
        </Stack>
    )
}

export default RPSStatusContainer;