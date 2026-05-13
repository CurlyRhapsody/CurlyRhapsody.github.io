import { Stack, styled, Tab, Tabs } from "@mui/material";
import { RPSDifficulty, useRPSContext } from "../providers/RPSProvider";
import { useTranslations } from "next-intl";

const StyledTab = styled(Tab)({
    minWidth: "auto",
    width: "auto",
    textTransform: "none",
    maxHeight: "2rem",
    minHeight: "2rem",
    height: "2rem",
    flex: 1,
    zIndex: 1,
    padding: "0",
    color: "#00000099"
})

const DifficultySlider = () => {

    const { difficulty, switchDifficulty, gameState } = useRPSContext();
    const t = useTranslations("games.rps");
    const idx = ((currDifficulty: RPSDifficulty) => {
        switch (currDifficulty) {
            case "EASY": return 0;
            case "NORMAL": return 1;
            case "HARD": return 2;
            case "IMPOSSIBLE": return 3;
            default: return 0;
        }
    })(difficulty)

    return (
        <Stack sx={{ background: "#E0E0E0", height: "2rem", borderRadius: "1rem", width: "100%" }}>
            <Tabs
                centered
                sx={{
                    minHeight: "100%", maxHeight: "100%", height: "2rem",
                    ".MuiTabs-indicator": {
                        background: "white",
                        height: "1.5rem", top: "0.25rem", zIndex: 0, borderRadius: "0.875rem",
                        boxShadow: "0rem 0.125rem 0.125rem -0.125px rgba(0,0,0,0.5);",
                        width: "calc(25% - 0.5rem) !important",
                        left: `calc(25% * ${idx} + 0.25rem) !important`,
                        
                    }
                }}
                value={difficulty}
                onChange={(e, newValue) => switchDifficulty(newValue)}
            >
                <StyledTab disableRipple value={"EASY"} label={(t("EASY"))} disabled={!!gameState} />
                <StyledTab disableRipple value={"NORMAL"} label={(t("NORMAL"))} disabled={!!gameState} />
                <StyledTab disableRipple value={"HARD"} label={(t("HARD"))} disabled={!!gameState} />
                <StyledTab disableRipple value={"IMPOSSIBLE"} label={(t("IMPOSSIBLE"))} disabled={!!gameState} />
            </Tabs>
        </Stack>
    )
}

export default DifficultySlider;