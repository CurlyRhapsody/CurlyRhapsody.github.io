"use client"

import { Stack } from "@mui/material";
import { Body1, Subtitle1, Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import DifficultySlider from "../rps/DifficultySlider";
import GameBoard from "../rps/GameBoard";
import RPSStatusContainer from "../rps/RPSStatusContainer";
import PageContainer from "../../styled/PageContainer";

const RPSContainer = () => {

    const t = useTranslations("games.rps");

    return (
        <PageContainer>
            <Title1>{t("title")}</Title1>
            <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
                <Subtitle1>{t("difficulty")}</Subtitle1>
                <DifficultySlider />
                <Body1>{t("statsTip")}</Body1>
            </ShadowedStack>
            <Stack direction="row" sx={{ width: "100%", gap: "2rem", }}>
                <Stack sx={{ flex: 2 }}>
                    <GameBoard />
                </Stack>
                <Stack sx={{ flex: 1 }}>
                    <RPSStatusContainer />
                </Stack>
            </Stack>
        </PageContainer>
    )
}

export default RPSContainer;