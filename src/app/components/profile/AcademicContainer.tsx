import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ShadowedStack } from "../styled/component";
import { Body1, Body2, Title1 } from "../styled/text";
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from "next/image";

import HKUSTLogo from "@/app/assets/images/hkust-logo.png"
import { useRouter } from "next/navigation";
import Link from "next/link";

const AcademicContainer = () => {
    const t = useTranslations("profile.academic");
    const router = useRouter();

    return (
        <ShadowedStack id="education" sx={{ borderRadius: "2rem", width: "45rem", padding: "2rem", gap: "1rem", background: "#fff" }}>
            <Title1>{t("title")}</Title1>
            <Divider sx={{ borderWidth: "0.0625rem" }} />
            <Stack direction="row">
                <Image src={HKUSTLogo.src} alt="HKUST" width={160} height={160} style={{ maxWidth: "10rem", maxHeight: "10rem" }} />
                <Stack
                    sx={{ justifyContent: "flex-start", gap: "1rem" }}
                    divider={<Divider sx={{ borderTop: "0.0625rem" }} />}
                >
                    <Box>
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
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.25rem" }}>{t("projectTitle")}</Typography>
                        <Typography sx={{ fontSize: "1.125rem", lineHeight: "1.5rem", fontWeight: 700, py: "0.25rem" }}>{t("hkust.project.e2ee.name")}</Typography>
                        <Body2 component="li" sx={{ ml: "1.25rem" }}>{t("hkust.project.e2ee.desc1")}</Body2>
                        <Body2 component="li" sx={{ ml: "1.25rem" }}>{t("hkust.project.e2ee.desc2")}</Body2>
                        <Body2 component="li" sx={{ ml: "1.25rem" }}>{t("hkust.project.e2ee.desc3")}</Body2>
                        <Typography sx={{ fontSize: "1.125rem", lineHeight: "1.5rem", fontWeight: 700, py: "0.25rem" }}>{t("roleTitle")}</Typography>
                        <Body2 component="li" sx={{ ml: "1.25rem" }}>{t("hkust.project.e2ee.role1")}</Body2>
                        <Body2 component="li" sx={{ ml: "1.25rem" }}>{t("hkust.project.e2ee.role2")}</Body2>
                        <Body2 component="li" sx={{ ml: "1.25rem" }}>{t("hkust.project.e2ee.role3")}</Body2>
                        <Link href="https://github.com/chanjeff2/fyp-chat-app" target="__blank" style={{ display: "block", width: "fit-content" }}>
                            <Stack direction="row"
                                sx={{
                                    mt: "0.5rem",
                                    gap: "0.5rem",
                                    alignItems: "center", width: "fit-content",
                                    py: "0.75rem", borderRadius: "0.75rem"
                                }}>
                                <GitHubIcon sx={{ fontSize: "1.5rem" }} />
                                <Body1>{t("hkust.project.e2ee.repository")}</Body1>
                            </Stack>
                        </Link>
                    </Box>
                </Stack>
            </Stack>
        </ShadowedStack>
    )
}

export default AcademicContainer;