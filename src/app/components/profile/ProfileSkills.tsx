import { Box, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Subtitle1 } from "../styled/text";
import { RadarAxis, RadarChart } from "@mui/x-charts";

const ProfileSkills = () => {
    const t = useTranslations("profile");
    
    return (
        <Box>
            <Subtitle1 sx={{ color: "#1E90FF" }}>{t("form.subtitle.coding")}</Subtitle1>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <RadarChart
                    sx={{ width: "15rem", height: "18em" }}
                    shape="circular"
                    series={[{ data: [9, 4, 5, 7, 2, 1, 5, 6] }]}
                    radar={{
                        metrics: ["Web/App", "Cybersecurity", "Database", "Server API", "Cloud &\n Infrastructure", "DevOps & CI/CD", "AI Engineering", "System Design"],
                        max: 10,
                    }}    
                >
                    <RadarAxis
                        metric="Web/App"
                        divisions={5}
                        labelOrientation="horizontal"
                        angle={22.5}
                    />
                </RadarChart>
            </Stack>
        </Box>
    )
}

export default ProfileSkills;