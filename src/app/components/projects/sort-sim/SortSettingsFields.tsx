import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, Slider, Stack, styled } from "@mui/material";
import { useTranslations } from "next-intl"
import { Subtitle2 } from "../../styled/text";
import { ShuffleMethod, SortMethod, useSortSimContext } from '../providers/SortSimProvider';

export const SortDropdown = () => {
    const t = useTranslations("project.sort-sim");
    const { sortAlgo, changeSortMethod } = useSortSimContext();

    return (
        <Stack direction="row" sx={{ gap: "1.5rem", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Subtitle2>{t("select")}</Subtitle2>
            <Select
                value={sortAlgo}
                onChange={(e) => changeSortMethod(e.target.value as SortMethod)}
                sx={{
                    width: "20rem",
                    "& .MuiSelect-select": {
                        p: "1rem 2rem 1rem 0.875rem"
                    }
                }}
            >
                {Object.values(SortMethod).map((method) => (
                    <MenuItem value={method}>{t(`sort.${method}`)}</MenuItem>
                ))}
            </Select>
        </Stack>
    )
}

export const ElementSettingRadio = () => {
    const t = useTranslations("project.sort-sim");
    const { shufflePattern, changeElementSettings } = useSortSimContext();

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
                    control={<Radio sx={{ padding: "0.5rem" }} />}
                    label={t("inorder")}
                    sx={{ ml: "-0.625rem", mr: "1rem" }}
                />
                <FormControlLabel
                    value={ShuffleMethod.WITH_REPEAT}
                    control={<Radio sx={{ padding: "0.5rem" }} />}
                    label={t("repeated")}
                    sx={{ ml: "-0.625rem", mr: "1rem" }}
                />
            </RadioGroup>
        </Stack>
    )
}

export const ElementCountSlider = () => {
    const t = useTranslations("project.sort-sim");
    const { numElements, setNumElements } = useSortSimContext();

    return (
        <Stack direction="column" sx={{ gap: "1rem", alignItems: "flex-start", width: "15rem" }}>
            <Subtitle2>{t("numElements", { count: numElements ?? NaN })}</Subtitle2>
            <Slider
                value={numElements}
                onChange={(_, num: number) => setNumElements(num)}
                min={5}
                max={100}
                step={1}
            />
        </Stack>
    )
}

export const SortIntervalSlider = () => {
    const t = useTranslations("project.sort-sim");
    const { sortInterval, setSortInterval } = useSortSimContext();

    return (
        <Stack direction="column" sx={{ gap: "1rem", alignItems: "flex-start", width: "15rem" }}>
            <Subtitle2>{t("sortInterval", { time: sortInterval ?? NaN })}</Subtitle2>
            <Slider
                value={sortInterval}
                onChange={(_, num: number) => setSortInterval(num)}
                min={50}
                max={1000}
                step={50}
            />
        </Stack>
    )
}