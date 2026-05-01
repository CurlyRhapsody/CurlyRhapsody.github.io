import { SvgIconComponent } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { Body1, Subtitle1, Title1 } from "../styled/text";
import { Grid, Stack, SvgIcon } from "@mui/material";
import useResponsiveSizing from "../hooks/useResponsiveSizing";
import { ShadowedStack } from "../styled/component";

import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const ContentOption = ({
    Icon, title, tag
}: {
    Icon: SvgIconComponent;
    title: string;
    tag: string;
}) => {
    const { isMobile } = useResponsiveSizing();

    return (
        <Grid size={isMobile ? 6 : 3}>
            <ShadowedStack
                sx={{
                    width: isMobile ? "100%" : "10rem",
                    height: "12rem",
                    p: "1.5rem",
                    borderRadius: "1.5rem",
                    alignItems: "center",
                    justifyContent: "space-around",
                    background: "#FFFFFF"
                }}
            >
                <Icon sx={{ fontSize: "2rem" }} />
                <Body1 sx={{ textAlign: "center" }}>{title}</Body1>
            </ShadowedStack>
        </Grid>
    )
}

const ProfileContents = () => {
    const t = useTranslations("profile");
    const { isMobile } = useResponsiveSizing();

    return (
        <Stack sx={{ gap: "1rem", alignItems: "center", width: "100%", px: "2rem" }}>
            <Title1>{t("title")}</Title1>
            <Subtitle1>{t("content title")}</Subtitle1>
            <Grid container spacing="2rem">
                <ContentOption Icon={BadgeIcon} title={t("content profile")} tag="profile" />
                <ContentOption Icon={SchoolIcon} title={t("content education")} tag="education" />
                <ContentOption Icon={WorkIcon} title={t("content work")} tag="work" />
                <ContentOption Icon={QuestionMarkIcon} title={t("content QnA")} tag="qna" />
            </Grid>
        </Stack>
        
    );
}

export default ProfileContents;