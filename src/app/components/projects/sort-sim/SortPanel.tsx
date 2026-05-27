import { ShadowedStack } from '../../styled/component';
import { Stack } from "@mui/material";
import { Subtitle1 } from '@/app/components/styled/text';
import { useTranslations } from 'next-intl';

const SortPanel = () => {

    const t = useTranslations("project.sort-sim");

    return (
        <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
            <Stack sx={{ alignItems: "flex-start", width: "100%", p: "1rem" }}>
                <Subtitle1>{t("settings")}</Subtitle1>
            </Stack>
        </ShadowedStack>
    )
}

export default SortPanel;