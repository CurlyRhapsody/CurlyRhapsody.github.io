import { Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ShadowedStack } from "../styled/component";
import { Body1, Subtitle2, Title1 } from "../styled/text";
import Image from "next/image";

import HKUSTLogo from "@/app/assets/images/hkust-logo.png"

const AcademicContainer = () => {
    const t = useTranslations("profile.academic")

    return (
        <ShadowedStack sx={{ borderRadius: "2rem", width: "45rem", padding: "2rem", gap: "2rem", background: "#fff" }}>
            <Title1>{t("title")}</Title1>
            <Stack direction="row">
                <Image src={HKUSTLogo.src} alt="HKUST" width={160} height={160} style={{ maxWidth: "10rem", maxHeight: "10rem" }} />
                <Stack sx={{ justifyContent: "center" }}>
                    <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.5rem" }}>{t("hkust.name")}</Typography>
                    <Body1>{t("hkust.major")}</Body1>
                    <Body1>{t("hkust.honors")}</Body1>
                    <Body1 sx={{ pt: "1rem" }}>
                        {t.rich("hkust.stats", {
                            vd: () => (
                                <Divider
                                    orientation="vertical"
                                    sx={{ height: "1.125rem", mx: "0.5rem", borderWidth: "0.0625rem", borderRadius: "0.0625rem", display: "inline-block" }}
                                />
                            ),
                            b: (content) => <b>{content}</b>
                        })}
                    </Body1>
                </Stack>
            </Stack>
        </ShadowedStack>
    )
}

export default AcademicContainer;