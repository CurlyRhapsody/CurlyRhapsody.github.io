import { Button, Stack } from '@mui/material';
import { ElementState, useSortSimContext } from '../providers/SortSimProvider';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


const SortingBars = () => {

    const t = useTranslations("project.sort-sim");
    const { isSorting, isPaused, array, numElements, shuffle, sort, togglePause } = useSortSimContext();

    const { min, max } = useMemo(() => ({
        min: Math.min(...(array?.map((el) => el.value) ?? [])),
        max: Math.max(...(array?.map((el) => el.value) ?? []))
    }), [array]);

    const normalize = (value: number) => {
        if (min === max) return 50;
        return 5 + ((value - min) / (max - min)) * 95;
    }

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "2rem" }}>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "center", gap: "1.5rem" }}>
                <Button
                    disabled={isSorting}
                    variant="contained"
                    startIcon={<ShuffleIcon sx={{ fontSize: "1.5rem" }} />}
                    sx={{
                        p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                        "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                    }}
                    onClick={shuffle}
                >
                    {t("shuffle")}
                </Button>
                <Button
                    variant="contained"
                    startIcon={isSorting && !isPaused ? (
                        <PauseIcon sx={{ fontSize: "1.5rem" }} />
                    ) : (
                        <PlayArrowIcon sx={{ fontSize: "1.5rem" }} />
                    )}
                    sx={{
                        p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                        "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                    }}
                    onClick={isSorting ? togglePause : sort}
                >
                    {!isSorting
                        ? t("start")
                        : (isPaused ? t("resume") : t("pause"))
                    }
                </Button>
            </Stack>
            <Stack direction="row" sx={{ height: "25rem", gap: "0.125rem", width: "100%", alignItems: "flex-end", px: "1rem", mb: "2rem" }}>
                {array?.map(({ value, state }) => (
                    <Stack 
                        direction="row"
                        sx={{
                            width: `calc(100% / ${numElements})`,
                            height: `${normalize(value)}%`,
                            backgroundColor: state === ElementState.NORMAL
                                                ? "#1E90FF"
                                                : (state === ElementState.SWAPPING
                                                        ? "#FF1F1F"
                                                        : (state === ElementState.FINISHED ? "#1FFF1F" : "#FFFF1F"))
                        }}
                    /> 
                ))}
            </Stack>
        </Stack>
    )
}

export default SortingBars;