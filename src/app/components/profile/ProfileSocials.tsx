import { IconButton, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Body1, Body2, Subtitle1 } from "../styled/text";

import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";

const ProfileSocials = () => {
    const t = useTranslations("profile.form");

    return (
        <Stack sx={{ gap: "0.25rem" }}>
            <Stack sx={{ gap: "0.25rem" }}>
                <Subtitle1 sx={{ color: "#1E90FF" }}>{t("subtitle.social")}</Subtitle1>
                <Body1>{t("content.noSocial")}</Body1>
            </Stack>
            <Stack direction="row" sx={{ gap: "0.5rem", alignItems: "center" }}>
                <Link href="https://github.com/CurlyRhapsody" target="__blank">
                    <IconButton>
                        <GitHubIcon sx={{ fontSize: "2rem", color: "black" }} />
                    </IconButton>
                </Link>
                <Body2 sx={{ fontStyle: "italic" }}>{t("content.moreLater")}</Body2>
            </Stack>
        </Stack>
    )
}

export default ProfileSocials;