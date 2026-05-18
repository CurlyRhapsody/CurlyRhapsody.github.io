"use client"

import { ShadowedStack } from "../../styled/component";
import { Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import DetailedColorInput from "../color-calc/DetailedColorInput";
import RelatedColorsContainer from "../color-calc/RelatedColorsContainer";
import PageContainer from "../../styled/PageContainer";

const ColorCalcContainer = () => {

    const t = useTranslations("project.color-calc");
    
    return (
        <PageContainer>
            <Title1>{t("title")}</Title1>
            <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
                <DetailedColorInput />
            </ShadowedStack>

            <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem" }}>
                <RelatedColorsContainer />
            </ShadowedStack>
        </PageContainer>
        
    )
}

export default ColorCalcContainer;