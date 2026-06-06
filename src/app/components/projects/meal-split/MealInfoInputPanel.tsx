import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Divider, Stack } from '@mui/material';
import { GrandTotalInputs } from "./MealInfoFields";

const MealInfoInputPanel = () => {
    
    const t = useTranslations("project.meal-split");
    
    return (
        <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
            <Stack sx={{ width: "100%" }} divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}>
                <GrandTotalInputs />
            </Stack>
        </ShadowedStack>
    )
}

export default MealInfoInputPanel;