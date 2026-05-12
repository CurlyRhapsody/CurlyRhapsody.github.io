import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Body1 } from "../../styled/text";
import { RPSDifficulty, RPSPlayer, RPSThrows, useRPSContext } from "../providers/RPSProvider";
import { Divider, Stack } from "@mui/material";

const Throw = ({ player }: {
    player: RPSPlayer;
    throw?: RPSThrows;
}) => {
    const t = useTranslations("games.rps");

    return (
        <Stack sx={{ flex: 1, height: "12.5rem", width: "100%", gap: "1rem", alignItems: "center" }}>
            <Stack sx={{ height: "10rem", width: "100%" }}></Stack>
            <Body1>{t(player === RPSPlayer.PLAYER ? "you" : "cpu")}</Body1>
        </Stack>
    )
    
}

const GameBoard = () => {

    const t = useTranslations("games.rps");
    const { difficulty } = useRPSContext();

    const difficultyColor = ((currDifficulty: RPSDifficulty) => {
        switch (currDifficulty) {
            case "EASY": return "#00d40a";
            case "NORMAL": return "#ffc500";
            case "HARD": return "#c20000";
            case "IMPOSSIBLE": return "#d882fc";
            default: return "#edd000";
        }
    })(difficulty)

    return (
        <ShadowedStack sx={{ borderRadius: "1rem", p: "1rem", background: "#FFFFFF", alignItems: "center", gap: "0.75rem" }}>
            <Body1>
                {t.rich("selectedDifficulty", {
                    difficulty: t(difficulty),
                    ind: (content) => <span style={{ color: difficultyColor }}>{content}</span>,
                })}
            </Body1>
            <Stack
                direction="row"
                sx={{ height: "12rem", width: "100%" }}
                divider={<Divider orientation="vertical" />}
            >
                <Throw player={RPSPlayer.PLAYER} />
                <Throw player={RPSPlayer.CPU} />
            </Stack>
        </ShadowedStack>
    )
}

export default GameBoard;