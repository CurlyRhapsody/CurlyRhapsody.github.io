import { useTranslations } from "next-intl";
import { ObstacleType, PathfindMethod, usePathfindContext } from "../providers/PathfindProvider";
import { Box, Grid, IconButton, InputAdornment, Stack, SvgIcon, TextField } from "@mui/material";
import { Body1, Subtitle1, Subtitle2 } from "../../styled/text";
import { useMemo, useState } from 'react';
import { tileToIcon } from "./tileMaps";
import ChooseAlgoPopup from "./ChooseAlgoPopup";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const PathfindDropdown = () => {
    const t = useTranslations("project.pathfind");
    const { isSearching, pathfindAlgo } = usePathfindContext();
    const [isSelectingAlgo, setIsSelectingAlgo] = useState<boolean>(false);

    const isWeighted = useMemo(() => [PathfindMethod.DIJKSTRA, PathfindMethod.ASTAR].includes(pathfindAlgo as PathfindMethod), [pathfindAlgo])

    return (
        <>
            <ChooseAlgoPopup open={isSelectingAlgo} onClose={() => setIsSelectingAlgo(false)} />
            <Stack sx={{ gap: "1rem", alignItems: "center" }}>
                <Stack direction="row" sx={{ gap: "1.5rem", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Subtitle2>{t("algo")}</Subtitle2>
                    <TextField
                        disabled={isSearching}
                        value={t(`algos.${pathfindAlgo}`)}
                        onClick={() => setIsSelectingAlgo(true)}
                        sx={{
                            width: "20rem",
                            "& .MuiSelect-select": {
                                p: "1rem 2rem 1rem 0.875rem",
                                fontSize: "1.25rem",
                                lineHeight: "1.75rem",
                                fontWeight: 400,
                            }
                        }}
                        slotProps={{
                            input: {
                                readOnly: true,
                                endAdornment: (
                                <InputAdornment position="end">
                                    <ArrowDropDownIcon />
                                </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Stack>
                <Box sx={{ minWidth: "0.5rem", height: "1.75rem" }}>
                    {isWeighted && <Body1 sx={{ color: "#C20000" }}>{t("countWeight")}</Body1>}
                </Box>
            </Stack>
        </>
    )
}

export const ObstacleList = () => {

    const t = useTranslations("project.pathfind");
    const { isSearching, selectedTile, setSelectedTile } = usePathfindContext();

    const tileName = useMemo(() => {
        if (!selectedTile) return "";
        switch (selectedTile) {
            case ObstacleType.CLEAR: return "clear";
            case ObstacleType.START: return "start";
            case ObstacleType.END: return "end";
            case ObstacleType.SNOW: return "snow";
            case ObstacleType.FOREST: return "forest";
            case ObstacleType.WATER: return "water";
            case ObstacleType.MOUNTAIN: return "mountain";
            case ObstacleType.WALL: return "wall";
            default: return "clear";
        }
    }, [selectedTile])

    return (
        <Stack direction="row" sx={{ width: "100%", gap: "4rem", justifyContent: "center", alignItems: "center", mx: "auto" }}>
            <Stack sx={{ width: "15rem", gap: "1rem", alignItems: "center" }}>
                <Subtitle1>{t("nowSelecting")}</Subtitle1>
                <SvgIcon component={tileToIcon[selectedTile || ObstacleType.WALL]} sx={{ fontSize: "6.25rem" }} />
                <Body1>{t(tileName)}</Body1>
            </Stack>
            <Grid direction="row" columns={4} container spacing="1rem" sx={{ width: "22rem" }}>
                {Object.values(ObstacleType).map((obj) => {
                    if (obj === ObstacleType.AIR) return null;
                    return (
                        <Grid size={1} key={`select-grid-${obj}`}>
                            <IconButton disabled={isSearching} onClick={() => setSelectedTile(obj)}>
                                <SvgIcon component={tileToIcon[obj]} sx={{ fontSize: "3rem", color: "black" }} />
                            </IconButton>
                        </Grid>
                    )
                })}
            </Grid>
        </Stack>
    )
}

export const HintAndLegend = () => {

    const t = useTranslations("project.pathfind");

    return (
        <Stack sx={{ width: "100%", gap: "1rem",alignItems: "center" }}>
            <Subtitle2>{t("emptyIs1")}</Subtitle2>
            <Stack direction="row" sx={{ gap: "3rem", alignItems: "center", justifyContent: "center" }}>
                <Stack direction="row" sx={{ gap: "0.75rem" }}>
                    <Box sx={{ width: "2rem", height: "2rem", borderRadius: "0.375rem", bgcolor: "#A5D3FF", border: "0.0625rem solid #808080" }} />
                    <Body1>{t("visited")}</Body1>
                </Stack>
                <Stack direction="row" sx={{ gap: "0.75rem" }}>
                    <Box sx={{ width: "2rem", height: "2rem", borderRadius: "0.375rem", bgcolor: "#D2FFA5", border: "0.0625rem solid #808080" }} />
                    <Body1>{t("discovered")}</Body1>
                </Stack>
                <Stack direction="row" sx={{ gap: "0.75rem" }}>
                    <Box sx={{ width: "2rem", height: "2rem", borderRadius: "0.375rem", bgcolor: "#FFA5A5", border: "0.0625rem solid #808080" }} />
                    <Body1>{t("focused")}</Body1>
                </Stack>
                <Stack direction="row" sx={{ gap: "0.75rem" }}>
                    <Box sx={{ width: "2rem", height: "2rem", borderRadius: "0.375rem", bgcolor: "#FFFFA5", border: "0.0625rem solid #808080" }} />
                    <Body1>{t("path")}</Body1>
                </Stack>
            </Stack>
        </Stack>
    )
}