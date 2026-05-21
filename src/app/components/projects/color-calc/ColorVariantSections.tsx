import { Box, Grid, Stack } from "@mui/material"
import { Subtitle1, Subtitle2 } from "../../styled/text"
import { ColorList, ColorSwatch } from "./ColorSwatch"
import { useTranslations } from "next-intl";
import { useColorCalcContext } from "../providers/ColorCalcProvider";
import useResponsiveSizing from '../../hooks/useResponsiveSizing';

export const ColorScaleContainer = () => {
    const t = useTranslations("project.color-calc");
    const { colorVariations } = useColorCalcContext();
    const { shades, tints } = colorVariations ?? {};
    const { isMobile } = useResponsiveSizing();

    return (
        <Stack sx={{ gap: "1rem", px: isMobile ? "unset" : "2rem" }}>
            <Subtitle1>{t("tintAndShade")}</Subtitle1>
            <Stack direction={ isMobile ? "row" : "column" } sx={{ gap: "1rem", width: "100%", justifyContent: "space-around" }}>
                <Box sx={{ gap: "1rem" }}>
                    <Subtitle2>{t("shade")}</Subtitle2>
                    <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                        <ColorList list={shades} />
                    </Stack>
                </Box>

                <Box>
                    <Subtitle2>{t("tint")}</Subtitle2>
                    <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                        <ColorList list={tints} />
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    )
}

export const ColorHarmonyContainer = () => {
    const t = useTranslations("project.color-calc");
    const { colorVariations } = useColorCalcContext();
    const { harmonies } = colorVariations ?? {};
    const { complementary, analogous, splitComplementary, triadic, tetradic, square } = harmonies ?? {};
    const { isMobile } = useResponsiveSizing();

    return (
        <Stack sx={{ gap: "1rem", px: isMobile ? "unset" : "2rem" }}>
            <Subtitle1>{t("harmonies")}</Subtitle1>
            <Grid container spacing="2rem" direction="row">
                <Grid key="complementary" size={6}>
                    <Box>
                        <Subtitle2>{t("complementary")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={complementary} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="analogous" size={6}>
                    <Box>
                        <Subtitle2>{t("analogous")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={analogous} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="splitComplementary" size={6}>
                    <Box>
                        <Subtitle2>{t("splitComplementary")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={splitComplementary} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="triadic" size={6}>
                    <Box>
                        <Subtitle2>{t("triadic")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={triadic} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="tetradic" size={6}>
                    <Box>
                        <Subtitle2>{t("tetradic")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={tetradic} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid key="square" size={6}>
                    <Box>
                        <Subtitle2>{t("square")}</Subtitle2>
                        <Stack sx={{ alignItems: "center", pt: "1rem" }}>
                            <ColorList list={square} />
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