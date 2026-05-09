import { useTranslations } from "next-intl"
import { ShadowedStack } from "../styled/component";
import { Body1, Body2, Title1 } from "../styled/text";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { workExp, WorkHistory } from "./WorkHistory";
import Image from "next/image";

const WorkUnit = ({ companyStruct }: {
    companyStruct: WorkHistory;
}) => {
    const { status, localeCode, imageLink, projects } = companyStruct;

    const t = useTranslations("profile.work");
    const tComp = useTranslations(`profile.work.${localeCode}`)

    return (
        <Stack direction="row" sx={{ position: "relative" }}>
            <Stack
                direction="column"
                sx={{ alignItems: "center", minWidth: "2rem", mr: "1rem" }}
            >
                <Stack
                    sx={{
                        width: "2rem", height: "2rem", borderRadius: "50%",
                        bgcolor: "#1E90FF", zIndex: 1, mt: 1,
                        alignItems: "center", justifyContent: "center"
                    }}
                >
                    
                </Stack>
                <Box sx={{ width: "0.125rem", bgcolor: "divider", flexGrow: 1, my: 1 }} />
            </Stack>
            <Box>
                <Stack direction="row">
                    <Image src={imageLink} alt="HKTV" width={80} height={80} style={{ maxWidth: "5rem", maxHeight: "5rem" }} />
                    <Stack
                        sx={{ justifyContent: "flex-start", ml: "1.25rem", gap: "1rem" }}
                        divider={<Divider sx={{ borderTop: "0.0625rem" }} />}
                    >
                        <Box>
                            <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.5rem" }}>{tComp("name")}</Typography>
                            <Body1>{tComp("year")}</Body1>
                            <Body1 component="div">{tComp.rich("highestPosition", { b: (content) => <b>{content}</b> })}</Body1>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.25rem" }}>{t("projectTitle")}</Typography>
                            {projects.map(({title, duties}) => (
                                <Box sx={{ mb: "0.5rem" }}>
                                    <Typography sx={{ fontSize: "1.125rem", lineHeight: "1.5rem", fontWeight: 700, pb: "0.5rem" }}>{tComp(title)}</Typography>
                                    {duties.map((duty) => (
                                        <Body2 component="li" sx={{ ml: "1.25rem" }}>{tComp(duty)}</Body2>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Stack>
                </Stack>
                <Divider sx={{ borderWidth: "0.0625rem" }} />
            </Box>
        </Stack>
    )
}

const WorkContainer = () => {
    const t = useTranslations("profile.work");

    return (
        <ShadowedStack id="work" sx={{ borderRadius: "2rem", width: "45rem", padding: "2rem", gap: "1rem", background: "#fff" }}>
            <Title1>{t("title")}</Title1>
            <Divider sx={{ borderWidth: "0.0625rem" }} />
            {/* Stepper-like structure */}
            <Stack>
                {workExp.map((work) => (
                    <WorkUnit companyStruct={work} />
                ))} 
                
            </Stack>
        </ShadowedStack>

    )
}

export default WorkContainer;