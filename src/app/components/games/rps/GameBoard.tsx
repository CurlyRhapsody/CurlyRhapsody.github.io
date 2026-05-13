import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Body1 } from "../../styled/text";
import { RPSDifficulty, RPSPlayer, RPSThrows, useRPSContext } from "../providers/RPSProvider";
import { ButtonBase, Divider, Grid, Stack, Typography } from "@mui/material";

const ThrowBoard = ({ player, playerThrow, mapThrowToHand }: {
    player: RPSPlayer;
    playerThrow?: RPSThrows;
    mapThrowToHand: (hand: RPSThrows) => string;
}) => {
    const t = useTranslations("games.rps");
    
    return (
        <Stack sx={{ flex: 1, height: "12.5rem", width: "100%", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ lineHeight: "8rem", fontSize: "8rem", mt: "1.5rem" }}>
                {(typeof playerThrow !== "undefined") ? mapThrowToHand(playerThrow) : ""}
            </Typography>
            <Body1>{t(player === RPSPlayer.PLAYER ? "you" : "cpu")}</Body1>
        </Stack>
    )
}

const ThrowButton = ({
    selectThrow,
    disabled,
    mapThrowToHand,
    makeThrow,
}: {
    selectThrow: RPSThrows;
    disabled: boolean;
    mapThrowToHand: (hand: RPSThrows) => string;
    makeThrow: (hand: RPSThrows) => void;
}) => {

    return (
        <Grid key={selectThrow} size={4} sx={{ flex: 1 }}>
            <ButtonBase sx={{ borderRadius: "1rem", width: "100%" }} disabled={disabled} onClick={() => makeThrow(selectThrow)}>
                <ShadowedStack sx={{ borderRadius: "1rem", width: "100%", aspectRatio: "1/1", background: "#FFFFFF", justifyContent: "center" }}>
                    <Typography
                        sx={{
                            fontSize: "5rem", lineHeight: "1",
                            filter: disabled ? "grayscale(100%)" : "unset"
                        }}
                    >
                        {mapThrowToHand(selectThrow)}
                    </Typography>
                </ShadowedStack>
            </ButtonBase>
        </Grid>
    );
}

const GameBoard = () => {

    const t = useTranslations("games.rps");
    const { difficulty, playerThrow, cpuThrow, gameState, makeThrow, mapThrowToHand } = useRPSContext();

    const difficultyColor = ((currDifficulty: RPSDifficulty) => {
        switch (currDifficulty) {
            case "EASY": return "#00D40A";
            case "NORMAL": return "#FFC500";
            case "HARD": return "#C20000";
            case "IMPOSSIBLE": return "#D882FC";
            default: return "#EDD000";
        }
    })(difficulty)

    return (
        <Stack sx={{ gap: "2rem"}} >
            <ShadowedStack sx={{ borderRadius: "1rem", p: "1rem", background: "#FFFFFF", alignItems: "center", gap: "0.75rem" }}>
                <Body1>
                    {t.rich("selectedDifficulty", {
                        difficulty: t(difficulty),
                        ind: (content) => <span style={{ color: difficultyColor, fontWeight: 600 }}>{content}</span>,
                    })}
                </Body1>
                <Stack
                    direction="row"
                    sx={{ height: "12.5rem", width: "100%", userSelect: "none" }}
                    divider={<Divider orientation="vertical" />}
                >
                    <ThrowBoard player={RPSPlayer.PLAYER} playerThrow={playerThrow} mapThrowToHand={mapThrowToHand} />
                    <ThrowBoard player={RPSPlayer.CPU} playerThrow={cpuThrow} mapThrowToHand={mapThrowToHand} />
                </Stack>
            </ShadowedStack>
            <Grid container direction="row" spacing="2rem">
                {Object.values(RPSThrows).filter(key => isNaN(Number(key))).map((play, index) => (
                    <ThrowButton
                        key={play}
                        selectThrow={index}
                        disabled={!!gameState}
                        mapThrowToHand={mapThrowToHand}
                        makeThrow={makeThrow}
                    />
                ))}
            </Grid>
        </Stack>
    )
}

export default GameBoard;