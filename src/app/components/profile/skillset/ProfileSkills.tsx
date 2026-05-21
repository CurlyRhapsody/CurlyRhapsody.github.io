import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import { Subtitle1, Subtitle2 } from "../../styled/text";
import CodingSelfScore from "./CodingSelfScore";
import SkillGroupText from "./SkillGroupText";


const ProfileSkills = () => {
    const t = useTranslations("profile.form");
    const isViewNarrow = useMediaQuery('(max-width: 300px)');
    
    return (
        <Box>
            <Subtitle1 sx={{ color: "#1E90FF" }}>{t("subtitle.coding")}</Subtitle1>
            <Stack direction="column" sx={{ justifyContent: "space-between", gap: "1rem" }}>
                <Stack>
                    <SkillGroupText
                        subtitle={"frontend title"}
                        content={[
                            "frontend desc1",
                            "frontend desc2",
                            "frontend desc3"
                        ]}
                    />
                    <SkillGroupText
                        subtitle={"backend title"}
                        content={[
                            "backend desc1",
                            "backend desc2"
                        ]}
                    />
                    <SkillGroupText
                        subtitle={"tools title"}
                        content={[
                            "tools desc1",
                            "tools desc2",
                            "tools desc3"
                        ]}
                    />
                </Stack>
                <Stack sx={{ alignItems: "center", height: isViewNarrow ? "auto" : "25rem", width: "100%", gap: "0.25rem" }}>
                    <Subtitle2>{t("skill.title")}</Subtitle2>
                    <CodingSelfScore narrow={isViewNarrow} />
                </Stack>
            </Stack>
        </Box>
    )
}

export default ProfileSkills;