import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ShadowedStack } from "../styled/component";
import { Body1, Body2, Title1, Title2 } from "../styled/text";
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from "next/image";
import Link from "next/link";
import { AcademicInstitutionHistory, academicsHist } from "./CareerRecord";

const InstitutionUnit  = ({ instutionStruct }: {
    instutionStruct: AcademicInstitutionHistory;
}) => {
    const { localeCode, imageLink, projects } = instutionStruct;

    const t = useTranslations("profile.academic.institutions");
    const tInst = useTranslations(`profile.academic.institutions.${localeCode}`);

    return (
        <Stack direction="row">
            <Image src={imageLink} alt="HKUST" width={128} height={128} style={{ maxWidth: "8rem", maxHeight: "8rem" }} />
            <Stack
                sx={{ justifyContent: "flex-start", gap: "1rem" }}
                divider={<Divider sx={{ borderTop: "0.0625rem" }} />}
            >
                <Box>
                    <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.5rem" }}>{tInst("name")}</Typography>
                    <Body1>{tInst("year")}</Body1>
                    <Body1>{tInst("title")}</Body1>
                    <Body1>{tInst("status")}</Body1>
                    <Body1 component="div" sx={{ pt: "1rem" }}>
                        {tInst.rich("stats", {
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
                    {projects.map(({ title, description, duties, projectUrl, projectUrlText }) => (
                        <Box sx={{ mb: "0.5rem" }}>
                            <Typography sx={{ fontSize: "1.125rem", lineHeight: "1.5rem", fontWeight: 700, pb: "0.5rem" }}>{tInst(title)}</Typography>
                            {description.map((desc) => (
                                <Body2 component="li" sx={{ ml: "1.25rem" }}>{tInst(desc)}</Body2>
                            ))}
                            <Box sx={{ ml: "1.25rem" }}>
                            <Typography sx={{ fontSize: "1.125rem", lineHeight: "1.5rem", fontWeight: 700, py: "0.25rem" }}>{t("roleTitle")}</Typography>
                                {duties.map((duty) => (
                                    <Body2 component="li" sx={{ ml: "1.25rem" }}>{tInst(duty)}</Body2>
                                ))}
                            </Box>
                            {(!!projectUrl && !!projectUrlText) && (
                                <Link href={projectUrl} target="__blank" style={{ display: "block", width: "fit-content" }}>
                                    <Stack direction="row"
                                        sx={{
                                            mt: "0.5rem",
                                            gap: "0.5rem",
                                            alignItems: "center", width: "fit-content",
                                            py: "0.75rem", borderRadius: "0.75rem"
                                        }}>
                                        <GitHubIcon sx={{ fontSize: "1.5rem" }} />
                                        <Body1>{tInst(projectUrlText)}</Body1>
                                    </Stack>
                                </Link>
                            )}
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Stack>
    );
}

const CertificateUnit = () => {
    return (
        <Stack direction="row">
            {/* TODO: Implement it, once I have a cert of course */}
        </Stack>
    )
}

const AcademicContainer = () => {
    const t = useTranslations("profile.academic");

    const { institutions, certificates } = academicsHist;

    return (
        <ShadowedStack id="education"
            sx={{ borderRadius: "2rem", width: "45rem", padding: "2rem", gap: "1rem", background: "#fff", scrollMarginTop: "6rem" }}
            divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}
        >
            <Title1>{t("title")}</Title1>
            
            <Box>
                <Title2>{t("institutions.subtitle")}</Title2>
                {institutions.map((institution) => (
                    <InstitutionUnit key={institution.localeCode} instutionStruct={institution} />
                ))}
            </Box>
            <Box>
                <Title2>{t("certificates.subtitle")}</Title2>
                {(!!certificates && certificates.length != 0)
                    ? (certificates.map((cert) => (
                        <CertificateUnit key={cert.localeCode} />
                    )))
                    : (
                        <Box sx={{ mt: "0.75rem" }}>
                            <Body1>{t("none")}</Body1>
                        </Box>
                    )
                }
            </Box>
        </ShadowedStack>
    )
}

export default AcademicContainer;