import { useTranslations } from "next-intl";
import PageContainer from "../../styled/PageContainer";
import { Stack } from '@mui/material';
import useAccessPlatform from "../../hooks/useAccessPlatform";
import { Subtitle2, Title1, Title3, Subtitle1, Body1 } from '../../styled/text';
import Link from "next/link";
import BroadcastPlatform from "../broadcast/BroadcastPlatform";

const BroadcastContainer = () => {

    const t = useTranslations("project.broadcast");
    const { currentPlatform } = useAccessPlatform();

    if (currentPlatform === "MOBILE") {
        return (
            <PageContainer>
                <Stack
                    sx={{
                        width: "100%", height: "calc(100dvh - 4rem - var(--header-height))",
                        alignItems: "center", justifyContent: "center",
                        gap: "1rem", textAlign: "center"
                    }}
                >
                    <Title1>{t("title")}</Title1>
                    <Title3>{t("mobileTitle")}</Title3>
                    <Subtitle2>{t("plzUsePC")}</Subtitle2>
                </Stack>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <Stack
                sx={{
                    width: "100%", height: "calc(100dvh - 4rem - var(--header-height))",
                    alignItems: "center", gap: "1rem", position: "relative"
                }}
            >
                <Title1>{t("title")}</Title1>
                <Subtitle1>
                    {t.rich("shoutout", { link: (content) => (
                        <Link
                            href="https://gist.github.com/000hen/59800f20c9f5af9e1e317beb0a767635"
                            target="_blank" style={{ textDecoration: "underline" }}
                        >
                            {content}
                        </Link>
                    ) })}    
                </Subtitle1>
                <Body1>{t("effect")}</Body1>
            </Stack>
            <BroadcastPlatform />
        </PageContainer>
    )
}

export default BroadcastContainer;