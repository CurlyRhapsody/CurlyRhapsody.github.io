import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Button, Stack } from "@mui/material";
import { Body1, Body2, Subtitle1 } from "../../styled/text";
import { useRPSContext } from "../providers/RPSProvider";
import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

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
        <Body2>
            {t.rich(title, {
                count: count,
                flash: (content) => (
                    <motion.span animate={controls} initial={{ color: "#000000" }}>
                        {content}
                    </motion.span>
                )
            })}
        </Body2>
    )
}

const RPSStatusContainer = () => {

    const t = useTranslations("games.rps");
    const { gameState, totalWins, totalLoses, totalDraws, totalGames, resetStats } = useRPSContext();

    return (
        <Stack sx={{ gap: "2rem", height: "100%" }}>
            <ShadowedStack
                sx={{
                    borderRadius: "1rem", p: "1rem", background: "#FFFFFF",
                    height: "3.5rem", width: "100%", justifyContent: "center"
                }}
            >
                <Body1>{!!gameState ? t(gameState) : ""}</Body1>
            </ShadowedStack>
            <ShadowedStack
                sx={{
                    borderRadius: "1rem", p: "1rem", background: "#FFFFFF",
                    height: "100%", width: "100%", justifyContent: "flex-start", gap: "1.25rem"
                }}
            >
                <Subtitle1 sx={{ textAlign: "center" }}>{t("stats.title")}</Subtitle1>
                <Body2>{t("stats.games", { count: totalGames })}</Body2>
                <FlashingStatus title={"stats.wins"} count={totalWins} color={"#00D40A"} />
                <FlashingStatus title={"stats.loses"} count={totalLoses} color={"#C20000"} />
                <FlashingStatus title={"stats.draws"} count={totalDraws} color={"#FFC500"} />
                <Button
                    variant="outlined"
                    onClick={resetStats}
                >
                    {t("stats.reset")}
                </Button>
            </ShadowedStack>
        </Stack>
    )
}

export default RPSStatusContainer;