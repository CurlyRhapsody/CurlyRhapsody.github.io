import { ShadowedStack } from '../../styled/component';
import { Stack } from "@mui/material";
import { Subtitle1 } from '@/app/components/styled/text';
import { useTranslations } from 'next-intl';
import { ElementCountSlider, ElementSettingRadio, SortDropdown, SortIntervalSlider } from './SortSettingsFields';
import useResponsiveSizing from '../../hooks/useResponsiveSizing';
import SortingBars from './SortingBars';

const SortPanel = () => {

    const { isMobile } = useResponsiveSizing()
    const t = useTranslations("project.sort-sim");

    return (
        <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
            <Stack sx={{ alignItems: "flex-start", width: "100%", p: "1rem" }}>
                <Subtitle1>{t("settings")}</Subtitle1>
            </Stack>
            <SortDropdown />
            <ElementSettingRadio />
            <Stack direction="row" sx={{ width: "100%", px: isMobile ? "3rem" : "5rem", justifyContent: "space-around" }}>
                <ElementCountSlider />
                <SortIntervalSlider />
            </Stack>
            <SortingBars />
        </ShadowedStack>
    )
}

export default SortPanel;