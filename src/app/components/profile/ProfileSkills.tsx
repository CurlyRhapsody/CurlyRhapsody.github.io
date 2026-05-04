import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import { Subtitle1, Subtitle2 } from "../styled/text";
import CodingSelfScore from "./CodingSelfScore";


const ProfileSkills = () => {
    const t = useTranslations("profile.form");
    const isViewNarrow = useMediaQuery('(max-width: 420px)');
    
    return (
        <Box>
            <Subtitle1 sx={{ color: "#1E90FF" }}>{t("subtitle.coding")}</Subtitle1>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Stack>
                    
                </Stack>
                <Stack sx={{ alignItems: "center", height: isViewNarrow ? "auto" : "22rem", width: "20rem", gap: "0.25rem" }}>
                    <Subtitle2>{t("skill.title")}</Subtitle2>
                    <CodingSelfScore narrow={isViewNarrow} />
                </Stack>
                
            </Stack>
        </Box>
    )
}

export default ProfileSkills;