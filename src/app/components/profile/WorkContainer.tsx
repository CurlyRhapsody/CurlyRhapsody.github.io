import { useTranslations } from "next-intl"
import { ShadowedStack } from "../styled/component";
import { Body1, Body2, Title1 } from "../styled/text";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { workExp, WorkHistory, WorkStatus } from "./CareerRecord";
import Image from "next/image";

const WorkUnit = ({ companyStruct }: {
    companyStruct: WorkHistory;
}) => {
    const { status, localeCode, imageLink, projects } = companyStruct;

    const t = useTranslations("profile.work");
    const tComp = useTranslations(`profile.work.${localeCode}`);

    const jobStatusStyle = ((state: WorkStatus) => {
        switch (state) {
            case WorkStatus.RESIGNED:
                return ({
                    bgcolor: "#1E90FF"
                })
            case WorkStatus.WORKING:
                return ({
                    '@keyframes flashColor': {
                        '0%': { bgcolor: '#0000001F' },
                        '50%': { bgcolor: '#1E90FF' },
                        '100%': { bgcolor: '#0000001F' },
                    },
                    bgcolor: "#0000001F",
                    animation: "flashColor 2.5s infinite"
                })
            default:
                return ({
                    bgcolor: "#0000001F"
                })
        }
    })(status);

    return (
        <Stack direction="row" sx={{ position: "relative" }}>
            <Stack
                direction="column"
                sx={{ alignItems: "center", minWidth: "2rem", mr: "1rem" }}
            >
                <Stack
                    sx={{
                        width: "1.5rem", height: "1.5rem", borderRadius: "50%",
                        zIndex: 1, mt: 0,
                        alignItems: "center", justifyContent: "center",
                        ...jobStatusStyle
                    }}
                />
                {status !== WorkStatus.UPCOMING && (
                    <Box sx={{ width: "0.125rem", bgcolor: "#0000001F", flexGrow: 1, my: 1 }} />
                )}
            </Stack>
            {(status === WorkStatus.UPCOMING)
                ? (
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.5rem" }}>{tComp("name")}</Typography>
                        <Body1>{tComp("desc")}</Body1>
                    </Box>
                )
                : (
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row">
                            <Image src={imageLink || ""} alt="HKTV" width={80} height={80} style={{ maxWidth: "5rem", maxHeight: "5rem" }} />
                            <Stack
                                sx={{ justifyContent: "flex-start", ml: "1.25rem", gap: "1rem", width: "100%" }}
                                divider={<Divider sx={{ borderTop: "0.0625rem" }} />}
                            >
                                <Box>
                                    <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.5rem" }}>{tComp("name")}</Typography>
                                    <Body1>{tComp("year")}</Body1>
                                    <Body1 component="div">{tComp.rich("highestPosition", { b: (content) => <b>{content}</b> })}</Body1>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "1.375rem", lineHeight: "1.625rem", fontWeight: 700, pb: "0.25rem" }}>{t("projectTitle")}</Typography>
                                    {projects?.map(({title, duties}) => (
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
                        <Divider sx={{ borderWidth: "0.0625rem", my: "1.25rem" }} />
                    </Box>
                )
            }
        </Stack>
    )
}

const WorkContainer = () => {
    const t = useTranslations("profile.work");

    return (
        <ShadowedStack
            id="work"
            sx={{ borderRadius: "2rem", width: "45rem", padding: "2rem", gap: "1rem", background: "#fff", scrollMarginTop: "6rem" }}
            divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}
        >
            <Title1>{t("title")}</Title1>
            {/* Stepper-like structure */}
            <Stack>
                {workExp.map((work) => (
                    <WorkUnit key={work.localeCode} companyStruct={work} />
                ))} 
            </Stack>
        </ShadowedStack>

    )
}

export default WorkContainer;