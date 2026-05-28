import { Button, Stack } from '@mui/material';
import { useSortSimContext } from '../providers/SortSimProvider';
import { useTranslations } from 'next-intl';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useMemo } from 'react';

const SortingBars = () => {

    const t = useTranslations("project.sort-sim");
    const { array, numElements, shuffle, sort } = useSortSimContext();

    const { min, max } = useMemo(() => ({
        min: Math.min(...array ?? []),
        max: Math.max(...array ?? [])
    }), [array]);

    const normalize = (value: number) => {
        if (min === max) return 50;
        return 5 + ((value - min) / (max - min)) * 95;
    }

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "2rem" }}>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "center", gap: "1.5rem" }}>
                <Button
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
                    startIcon={<PlayArrowIcon sx={{ fontSize: "1.5rem" }} />}
                    sx={{
                        p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                        "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                    }}
                    onClick={sort}
                >
                    {t("start")}
                </Button>
            </Stack>
            <Stack direction="row" sx={{ height: "25rem", gap: "0.125rem", width: "100%", alignItems: "flex-end", px: "1rem", mb: "2rem" }}>
                {array?.map((val) => (
                    <Stack 
                        direction="row"
                        sx={{
                            width: `calc(100% / ${numElements})`,
                            height: `${normalize(val)}%`,
                            backgroundColor: "#1E90FF"
                        }}
                    /> 
                ))}
            </Stack>
        </Stack>
    )
}

export default SortingBars;