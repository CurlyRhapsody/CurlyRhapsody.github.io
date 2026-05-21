import { useTranslations } from "next-intl";
import { Body1, Title2 } from "../../styled/text";
import { Divider, Stack } from "@mui/material";
import { ColorBlindnessContainer, ColorHarmonyContainer, ColorScaleContainer } from "./ColorVariantSections";
import useResponsiveSizing from '../../hooks/useResponsiveSizing';

const RelatedColorsContainer = () => {
    const t = useTranslations("project.color-calc");

    const { isMobile } = useResponsiveSizing();

    return (
        <Stack
            sx={{ gap: "1.25rem" }}
            divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}
        >
            <Stack direction={isMobile ? "column" : "row"} sx={{ gap: "0.25rem", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between" }}>
                <Title2>{t("related")}</Title2>
                <Body1>{t("click2copy")}</Body1>
            </Stack>
            <ColorScaleContainer />
            <ColorHarmonyContainer />
            <ColorBlindnessContainer />
        </Stack>
    )
}

export default RelatedColorsContainer;