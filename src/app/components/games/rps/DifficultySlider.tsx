import { Stack, styled, Tab, Tabs } from "@mui/material";
import { RPSDifficulty, useRPSContext } from "../providers/RPSProvider";
import { useTranslations } from "next-intl";
import useResponsiveSizing from "../../hooks/useResponsiveSizing";

const StyledTab = styled(Tab)<{ isMobile: boolean }>(({ isMobile }) => ({
    minWidth: "auto",
    width: "auto",
    maxHeight: "3rem",
    minHeight: "3rem",
    height: "3rem",
    fontSize: "1.25rem",
    flex: 1,
    zIndex: 1,
    padding: "0",
    color: "#00000099"
}));

const DifficultySlider = () => {

    const { isMobile } = useResponsiveSizing();
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
        <Stack sx={{ background: "#E0E0E0", height: "3rem", borderRadius: "1.5rem", width: "100%" }}>
            <Tabs
                centered
                sx={{
                    minHeight: "100%", maxHeight: "100%", height: "3rem",
                    ".MuiTabs-indicator": {
                        background: "white",
                        height: "2.5rem", top: "0.25rem", zIndex: 0, borderRadius: "1.25rem",
                        boxShadow: "0rem 0.125rem 0.125rem -0.125px rgba(0,0,0,0.5);",
                        width: "calc(25% - 0.5rem) !important",
                        left: `calc(25% * ${idx} + 0.25rem) !important`,
                    }
                }}
                value={difficulty}
                onChange={(e, newValue) => switchDifficulty(newValue)}
            >
                <StyledTab isMobile={isMobile} disableRipple value={"EASY"} label={(t("EASY"))} disabled={!!gameState} />
                <StyledTab isMobile={isMobile} disableRipple value={"NORMAL"} label={(t("NORMAL"))} disabled={!!gameState} />
                <StyledTab isMobile={isMobile} disableRipple value={"HARD"} label={(t("HARD"))} disabled={!!gameState} />
                <StyledTab isMobile={isMobile} disableRipple value={"IMPOSSIBLE"} label={(t("IMPOSSIBLE"))} disabled={!!gameState} />
            </Tabs>
        </Stack>
    )
}

export default DifficultySlider;