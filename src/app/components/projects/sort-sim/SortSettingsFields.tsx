import { FormControlLabel, InputAdornment, Radio, RadioGroup, Slider, Stack, TextField } from "@mui/material";
import { useTranslations } from "next-intl"
import { Subtitle2 } from "../../styled/text";
import { ShuffleMethod, SortMethod, useSortSimContext } from '../providers/SortSimProvider';
import { useEffect, useMemo, useState } from "react";
import ChooseAlgoPopup from "./ChooseAlgoPopup";

import DialogSelect from "../../common/DialogSelect";

export const SortDropdown = () => {
    const t = useTranslations("project.sort-sim");
    const { isSorting, sortAlgo } = useSortSimContext();
    const [isSelectingAlgo, setIsSelectingAlgo] = useState<boolean>(false);

    return (
        <>
            <ChooseAlgoPopup open={isSelectingAlgo} onClose={() => setIsSelectingAlgo(false)} />
            <Stack direction="row" sx={{ gap: "1.5rem", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <Subtitle2>{t("select")}</Subtitle2>
                <DialogSelect
                    disabled={isSorting}
                    value={t(`sort.${sortAlgo}`)}
                    onOpen={() => setIsSelectingAlgo(true)}
                />
            </Stack>
        </>
    )
}

export const ElementSettingRadio = () => {
    const t = useTranslations("project.sort-sim");
    const { isSorting, shufflePattern, changeElementSettings } = useSortSimContext();

    return (
        <Stack direction="row" sx={{ gap: "1.5rem", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Subtitle2>{t("elementSetting")}</Subtitle2>
            <RadioGroup
                value={shufflePattern}
                onChange={(e) => changeElementSettings(e.target.value as ShuffleMethod)}
                sx={{ flexDirection: "row", gap: "2rem" }}
            >
                <FormControlLabel
                    value={ShuffleMethod.INORDER}
                    control={<Radio sx={{ padding: "0.5rem" }} disabled={isSorting} />}
                    label={t("inorder")}
                    sx={{
                        ml: "-0.625rem", mr: "1rem",
                        "& .MuiFormControlLabel-label": {
                            fontSize: "1.25rem",
                            lineHeight: "1.75rem",
                            fontWeight: 400,
                        }
                    }}
                />
                <FormControlLabel
                    value={ShuffleMethod.WITH_REPEAT}
                    control={<Radio sx={{ padding: "0.5rem" }} disabled={isSorting} />}
                    label={t("repeated")}
                    sx={{
                        ml: "-0.625rem", mr: "1rem",
                        "& .MuiFormControlLabel-label": {
                            fontSize: "1.25rem",
                            lineHeight: "1.75rem",
                            fontWeight: 400,
                        }
                    }}
                />
            </RadioGroup>
        </Stack>
    )
}

export const ElementCountSlider = () => {
    const t = useTranslations("project.sort-sim");
    const { isSorting, sortAlgo, numElements, setNumElements } = useSortSimContext();

    // if is bogo sort, limit max Element to 10 or else the algo would take years to solve
    const isBogo = useMemo(() => sortAlgo === SortMethod.BOGO, [sortAlgo]);

    useEffect(() => {
        if (isBogo) {
            setNumElements(Math.min(10, numElements ?? 11)); 
        }
    }, [sortAlgo])

    return (
        <Stack direction="column" sx={{ gap: "1rem", alignItems: "flex-start", width: "15rem" }}>
            <Subtitle2>{t("numElements", { count: numElements ?? NaN })}</Subtitle2>
            <Slider
                disabled={isSorting}
                value={numElements}
                onChange={(_, num: number) => setNumElements(num)}
                min={5}
                max={isBogo ? 10 : 100}
                step={1}
                sx={{
                    py: "0.875rem",
                    "& .MuiSlider-thumb": {
                        height: "1.25rem",
                        width: "1.25rem"
                    },
                    "& .MuiSlider-thumb::after": {
                        height: "1.25rem",
                        width: "1.25rem"
                    }
                }}
            />
        </Stack>
    )
}

export const SortIntervalSlider = () => {
    const t = useTranslations("project.sort-sim");
    const { isSorting, sortInterval, setSortInterval } = useSortSimContext();

    return (
        <Stack direction="column" sx={{ gap: "1rem", alignItems: "flex-start", width: "15rem" }}>
            <Subtitle2>{t("sortInterval", { time: sortInterval ?? NaN })}</Subtitle2>
            <Slider
                disabled={isSorting}
                value={sortInterval}
                onChange={(_, num: number) => setSortInterval(num)}
                min={2}
                max={50}
                step={1}
                sx={{
                    py: "0.875rem",
                    "& .MuiSlider-thumb": {
                        height: "1.25rem",
                        width: "1.25rem"
                    },
                    "& .MuiSlider-thumb::after": {
                        height: "1.25rem",
                        width: "1.25rem"
                    }
                }}
            />
        </Stack>
    )
}