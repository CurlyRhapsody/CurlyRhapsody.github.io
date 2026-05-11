"use client"

import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Subtitle1, Title1 } from "../styled/text";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';

const EmptyGameList = () => {
    const t = useTranslations("games");

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem" }}>
            <VideogameAssetOffIcon sx={{ fontSize: "10rem" }} />
            <Subtitle1>{t("soon")}</Subtitle1>
        </Stack>
    )
}

const GameCenterPage = () => {

    const t = useTranslations("games");

    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <Title1>{t("title")}</Title1>
            <Subtitle1>{t("subtitle")}</Subtitle1>
            <EmptyGameList />           
        </Stack>
    )
}

export default GameCenterPage;