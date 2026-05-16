import { Stack } from "@mui/material";
import { ShadowedStack } from "../../styled/component";
import { Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import DetailedColorInput from "../color-calc/DetailedColorInput";
import RelatedColorsContainer from "../color-calc/RelatedColorsContainer";

const ColorCalcContainer = () => {

    const t = useTranslations("project.color-calc");
    
    return (
        <Stack sx={{ width: "100%", py: "2rem", alignItems: "center" }}>
            <Stack sx={{ width: "45rem", alignItems: "center", gap: "2rem" }}>
                <Title1>{t("title")}</Title1>
                <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
                    <DetailedColorInput />
                </ShadowedStack>

                <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem" }}>
                    <RelatedColorsContainer />
                </ShadowedStack>
            </Stack>
        </Stack>
        
    )
}

export default ColorCalcContainer;