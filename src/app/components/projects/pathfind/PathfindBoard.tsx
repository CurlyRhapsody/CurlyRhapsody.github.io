import { Box, Button, Grid, Stack, SvgIcon } from '@mui/material';
import { ObstacleType, usePathfindContext } from '../providers/PathfindProvider';
import { EmptyIcon, stateToColor, tileToIcon } from './tileMaps';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PathfindBoard = () => {

    const [isHoldDrawing, setIsHoldDrawing] = useState<boolean>(false);

    const { board, selectedTile = ObstacleType.CLEAR, isPaused, isSearching, addTile, togglePause, search, reset } = usePathfindContext();
    const t = useTranslations("project.pathfind");

    const onClickBoard = (row: number, column: number) => {
        if (isSearching) return;
        setIsHoldDrawing(true);
        if (board?.[row][column].obstacle === selectedTile) return;

        addTile(row, column, selectedTile);
    }

    const onHoverTile = (row: number, column: number) => {
        if (isSearching) return;
        if (board?.[row][column].obstacle === selectedTile) return;

        if (isHoldDrawing) {
            addTile(row, column, selectedTile);
        }
    }

    const onLeave = () => {
        setIsHoldDrawing(false);
    }

    return (
        <Stack sx={{ width: "100%", gap: "1rem" }}>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "center", gap: "2.5rem" }}>
                <Button
                    disabled={isSearching}
                    variant="contained"
                    startIcon={<ReplayIcon sx={{ fontSize: "1.5rem" }} />}
                    sx={{
                        p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                        "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                    }}
                    onClick={reset}
                >
                    {t("reset")}
                </Button>
                <Button
                        variant="contained"
                        startIcon={isSearching && !isPaused ? (
                            <PauseIcon sx={{ fontSize: "1.5rem" }} />
                        ) : (
                            <PlayArrowIcon sx={{ fontSize: "1.5rem" }} />
                        )}
                        sx={{
                            p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                            "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                        }}
                        onClick={isSearching ? togglePause : search}
                    >
                        {!isSearching
                            ? t("find")
                            : (isPaused ? t("resume") : t("pause"))
                        }
                </Button>
            </Stack>
            <Box
                sx={{ mx: "auto", touchAction: "none", width: `calc(${board?.[0]?.length ?? 0} * 2rem)` }}
                onMouseUp={() => onLeave()}
                onTouchEnd={() => onLeave()}
            >
                {board?.map((row, r) => (
                    <Stack direction="row" sx={{ width: "100%", height: "2rem" }} key={`pathfind-row-${r}`}>
                        {row.map((tile, c) => (
                            <Box
                                key={`pathfind-row-${r}-col-${c}-${tile.obstacle}-${tile.state}`}
                                sx={{ width: "2rem", height: "2rem", borderRadius: "0.25rem", border: "0.0625rem solid #808080", bgcolor: stateToColor[tile.state] }}
                                onPointerDown={() => onClickBoard(r, c)}
                                onPointerEnter={() => onHoverTile(r, c)}
                            >
                                <SvgIcon component={tileToIcon[tile.obstacle] || EmptyIcon} sx={{ fontSize: "1.5rem", color: "black", width: "100%", height: "100%", userSelect: "none" }} />
                            </Box>
                        ))}
                    </Stack>
                ))}
            </Box>
        </Stack>
    )
}

export default PathfindBoard;