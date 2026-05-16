import { Box, Grid, Stack } from "@mui/material"
import { Subtitle1, Subtitle2 } from "../../styled/text"
import { ColorList, ColorSwatch } from "./ColorSwatch"
import { useTranslations } from "next-intl";
import { useColorCalcContext } from "../providers/ColorCalcProvider";

export const ColorScaleContainer = () => {
    const t = useTranslations("project.color-calc");
    const { colorVariations } = useColorCalcContext();
    const { shades, tints } = colorVariations ?? {};

    return (
        <Stack sx={{ gap: "1rem" }}>
            <Subtitle1>{t("tintAndShade")}</Subtitle1>
            <Box sx={{ gap: "1rem" }}>
                <Subtitle2>{t("shade")}</Subtitle2>
                <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                    <ColorList list={shades} listWidthRem={4} />
                </Stack>
            </Box>

            <Box>
                <Subtitle2>{t("tint")}</Subtitle2>
                <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                    <ColorList list={tints} listWidthRem={4} />
                </Stack>
            </Box>
        </Stack>
    )
}

export const ColorHarmonyContainer = () => {
    const t = useTranslations("project.color-calc");
    const { colorVariations } = useColorCalcContext();
    const { harmonies } = colorVariations ?? {};
    const { complementary, analogous, splitComplementary, triadic, tetradic, square } = harmonies ?? {};

    return (
        <Stack sx={{ gap: "1rem" }}>
            <Subtitle1>{t("harmonies")}</Subtitle1>
            <Grid container spacing="2rem" direction="row">
                <Grid key="complementary" size={6}>
                    <Box sx={{ gap: "1rem" }}>
                        <Subtitle2>{t("complementary")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={complementary} listWidthRem={9} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="analogous" size={6}>
                    <Box sx={{ gap: "1rem" }}>
                        <Subtitle2>{t("analogous")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={analogous} listWidthRem={6} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="splitComplementary" size={6}>
                    <Box sx={{ gap: "1rem" }}>
                        <Subtitle2>{t("splitComplementary")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={splitComplementary} listWidthRem={6} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="triadic" size={6}>
                    <Box sx={{ gap: "1rem" }}>
                        <Subtitle2>{t("triadic")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={triadic} listWidthRem={6} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="tetradic" size={6}>
                    <Box sx={{ gap: "1rem" }}>
                        <Subtitle2>{t("tetradic")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={tetradic} listWidthRem={4.5} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="square" size={6}>
                    <Box sx={{ gap: "1rem" }}>
                        <Subtitle2>{t("square")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={square} listWidthRem={4.5} />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    )
}

export const ColorBlindnessContainer = () => {
    const t = useTranslations("project.color-calc");
    const { colorVariations } = useColorCalcContext();
    const { colorblinds } = colorVariations ?? {};
    const { red, green, blue, full } = colorblinds ?? {};

    return (
        <Stack sx={{ gap: "1rem" }}>
            <Subtitle1>{t("colorblindTitle")}</Subtitle1>
            <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                <ColorSwatch desc={t("redCB")} hex={red} />
                <ColorSwatch desc={t("greenCB")} hex={green} />
                <ColorSwatch desc={t("blueCB")} hex={blue} />
                <ColorSwatch desc={t("fullCB")} hex={full} />
            </Stack>
        </Stack>
    )
}