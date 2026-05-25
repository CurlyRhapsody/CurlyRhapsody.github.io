"use client"

import { ButtonBase, Stack } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Subtitle1, Subtitle2, Title1 } from "../styled/text";
import Link from "next/link";
import { ShadowedStack } from "../styled/component";
import { SvgIconComponent } from "@mui/icons-material";
import { projectList } from "./ProjectGameList";
import useAccessPlatform from "../hooks/useAccessPlatform";

const Project = ({ href, name, Icon }: { href: string, name: string, Icon: SvgIconComponent }) => {
    return (
        <Link href={href}>
            <ButtonBase sx={{ borderRadius: "1.5rem" }}>
                <ShadowedStack
                    direction="row"
                    sx={{
                        width: "40rem", height: "4.5rem", p: "2rem", borderRadius: "1.5rem",
                        justifyContent: "flex-start", alignItems: "center", gap: "1.25rem",
                        background: "#FFFFFF"
                    }}
                >
                    <Icon sx={{ fontSize: "1.5rem" }} />
                    <Subtitle2>{name}</Subtitle2>
                </ShadowedStack>
            </ButtonBase>
        </Link>
    )
}

const ProjectListPage = () => {

    const t = useTranslations("project");
    const locale = useLocale();
    const { currentPlatform } = useAccessPlatform();

    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <Title1>{t("title")}</Title1>
            <Subtitle1 sx={{ mx: "2rem", textAlign: "center" }}>{t("subtitle")}</Subtitle1>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1.5rem" }}>
                {projectList.map((project) => {
                    
                    const isSupported = !project.available
                                    || project.available === currentPlatform

                    if (!isSupported) return null;

                    return (
                        <Project
                            key={project.id}
                            href={`/${locale}/projects/${project.id}`}
                            name={t(`menu.${project.id}`)}
                            Icon={project.Icon}
                        />
                    )
                })}
            </Stack>
                   
        </Stack>
    )
}

export default ProjectListPage;