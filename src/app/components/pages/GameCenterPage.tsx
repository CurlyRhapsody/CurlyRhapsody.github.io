"use client"

import { ButtonBase, Stack } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Body1, Subtitle1, Subtitle2, Title1 } from "../styled/text";
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import { ShadowedStack } from "../styled/component";
import Link from "next/link";
import { gameList } from "./ProjectGameList";
import { SvgIconComponent } from "@mui/icons-material";

const Game = ({ href, name, Icon }: { href: string, name: string, Icon: SvgIconComponent }) => {
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

const GameCenterPage = () => {

    const t = useTranslations("games");
    const locale = useLocale();

    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <Title1>{t("title")}</Title1>
            <Subtitle1 sx={{ mx: "2rem", textAlign: "center" }}>{t("subtitle")}</Subtitle1>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1.5rem" }}>
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