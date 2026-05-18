"use client"

import { ButtonBase, Stack } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Body1, Subtitle1, Title1 } from "../styled/text";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import { ShadowedStack } from "../styled/component";
import Link from "next/link";
import { gameList } from "./ProjectGameList";
import { SvgIconComponent } from "@mui/icons-material";

const EmptyGameList = () => {
    const t = useTranslations("games");

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem" }}>
            <VideogameAssetOffIcon sx={{ fontSize: "10rem" }} />
            <Subtitle1>{t("soon")}</Subtitle1>
        </Stack>
    )
}

const Game = ({ href, name, Icon }: { href: string, name: string, Icon: SvgIconComponent }) => {
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

const GameCenterPage = () => {

    const t = useTranslations("games");
    const locale = useLocale();

    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <Title1>{t("title")}</Title1>
            <Subtitle1>{t("subtitle")}</Subtitle1>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem" }}>
                {gameList.map((game) =>(
                    <Game
                        key={game.id}
                        href={`/${locale}/games/${game.id}`}
                        name={t(`menu.${game.id}`)}
                        Icon={game.Icon}
                    />
                ))}
            </Stack>
        </Stack>
    )
}

export default GameCenterPage;