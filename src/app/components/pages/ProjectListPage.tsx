"use client"

import { ButtonBase, Stack } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Body1, Subtitle1, Title1 } from "../styled/text";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Link from "next/link";
import { ShadowedStack } from "../styled/component";
import { SvgIconComponent } from "@mui/icons-material";
import { projectList } from "./ProjectGameList";

const EmptyProjectList = () => {
    const t = useTranslations("project");

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem" }}>
            <SettingsSuggestIcon sx={{ fontSize: "10rem" }} />
            <Subtitle1>{t("soon")}</Subtitle1>
        </Stack>
    )
}

const Project = ({ href, name, Icon }: { href: string, name: string, Icon: SvgIconComponent }) => {
    return (
        <Link href={href}>
            <ButtonBase sx={{ borderRadius: "1rem" }}>
                <ShadowedStack
                    direction="row"
                    sx={{
                        width: "40rem", height: "3.25rem", p: "1rem 1.5rem", borderRadius: "1rem",
                        justifyContent: "flex-start", alignItems: "center", gap: "1rem",
                        background: "#FFFFFF"
                    }}
                >
                    <Icon sx={{ fontSize: "1.25rem" }} />
                    <Body1>{name}</Body1>
                </ShadowedStack>
            </ButtonBase>
        </Link>
    )
}

const ProjectListPage = () => {

    const t = useTranslations("project");
    const locale = useLocale();

    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <Title1>{t("title")}</Title1>
            <Subtitle1 sx={{ mx: "2rem", textAlign: "center" }}>{t("subtitle")}</Subtitle1>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem" }}>
                {projectList.map((project) =>(
                    <Project
                        key={project.id}
                        href={`/${locale}/projects/${project.id}`}
                        name={t(`menu.${project.id}`)}
                        Icon={project.Icon}
                    />
                ))}
            </Stack>
                   
        </Stack>
    )
}

export default ProjectListPage;