import { Stack } from "@mui/material";
import { Body1, Subtitle1, Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import DifficultySlider from "../rps/DifficultySlider";
import GameBoard from "../rps/GameBoard";

const RPSContainer = () => {

    const t = useTranslations("games.rps");

    return (
        <Stack sx={{ width: "100%", py: "2rem", alignItems: "center" }}>
            <Stack sx={{ width: "40rem", alignItems: "center", gap: "2rem" }}>
                <Title1>{t("title")}</Title1>
                <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
                    <Subtitle1>{t("difficulty")}</Subtitle1>
                    <DifficultySlider />
                </ShadowedStack>
                <Stack direction="row" sx={{ width: "100%", gap: "2rem", }}>
                    <Stack sx={{ flex: 2 }}>
                        <GameBoard />
                    </Stack>
                    <Stack sx={{ flex: 1 }}>
                        <ShadowedStack sx={{ borderRadius: "1rem", p: "1rem", background: "#FFFFFF" }}>
                            ad
                        </ShadowedStack>
                    </Stack>
                </Stack>
                
            </Stack>
        </Stack>
    )
}

export default RPSContainer;