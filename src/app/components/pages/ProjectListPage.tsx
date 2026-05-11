"use client"

import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Subtitle1, Title1 } from "../styled/text";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const EmptyProjectList = () => {
    const t = useTranslations("project");

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem" }}>
            <SettingsSuggestIcon sx={{ fontSize: "10rem" }} />
            <Subtitle1>{t("soon")}</Subtitle1>
        </Stack>
    )
}

const ProjectListPage = () => {

    const t = useTranslations("project");

    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <Title1>{t("title")}</Title1>
            <Subtitle1>{t("subtitle")}</Subtitle1>
            <EmptyProjectList />           
        </Stack>
    )
}

export default ProjectListPage;