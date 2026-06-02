import { useTranslations } from 'next-intl';
import { ShadowedStack } from '../../styled/component';
import useResponsiveSizing from '../../hooks/useResponsiveSizing';
import { Stack } from '@mui/material';
import { Subtitle1 } from '../../styled/text';
import { HintAndLegend, ObstacleList, PathfindDropdown } from './PathfindSettingsFields';
import PathfindBoard from './PathfindBoard';

const PathfindPanel = () => {

    const t = useTranslations("project.pathfind");

    return (
        <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
            <Stack sx={{ alignItems: "flex-start", width: "100%", p: "1rem 0 0 1rem" }}>
                <Subtitle1>{t("settings")}</Subtitle1>
            </Stack>
            <PathfindDropdown />
            <Stack sx={{ alignItems: "flex-start", width: "100%",p: "1rem 0 0 1rem" }}>
                <Subtitle1>{t("obstacle")}</Subtitle1>
            </Stack>
            <ObstacleList />
            <PathfindBoard />
            <HintAndLegend />
        </ShadowedStack>
    )
}

export default PathfindPanel;
    