import { Box, Grid, Stack } from "@mui/material";
import { ColorPalette } from "../providers/ColorCalcProvider";
import { Body2 } from "../../styled/text";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useTranslations } from "next-intl";

const ColorIcon = ({ hex }: { hex: string }) => {
    return (
        <Box sx={{ width: "1rem", height: "1rem", borderRadius: "50%", background: hex }} />
    )
}

export const ColorList = ({ list, listWidthRem }: {
    list?: ColorPalette[];
    listWidthRem: number;
}) => {
    const listSize = list?.length;
    const { openPopup } = useSnackbarContext();
    const t = useTranslations("project.color-calc");
    
    if (!listSize) return null;
    if (listSize === 0) return null;

    return (
        <Grid container columns={listSize}>
            {list.map((palette, index) => (
                <Grid
                    key={`${palette.hex}-${index}`}
                    sx={{ width: `${listWidthRem}rem`, display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <Body2>{palette.hex}</Body2>
                    <Box
                        onClick={async () => {
                            await navigator.clipboard.writeText(palette.hex);
                            openPopup(t("copied"))
                        }}
                        sx={{
                            width: `${listWidthRem}rem`, height: "3rem", background: palette.hex, my: "0.375rem",
                            cursor: "pointer",
                            borderTopLeftRadius: index === 0 ? "0.5rem" : "0",
                            borderBottomLeftRadius: index === 0 ? "0.5rem" : "0",
                            borderTopRightRadius: index === listSize - 1 ? "0.5rem" : "0",
                            borderBottomRightRadius: index === listSize - 1 ? "0.5rem" : "0"
                        }}
                    />
                    {palette.desc && <Body2>{palette.desc}</Body2>}
                </Grid>
            ))}
        </Grid>
    )
}

export const ColorSwatch = ({ desc, hex }: {
    desc: string;
    hex?: string;
}) => {

    const { openPopup } = useSnackbarContext();
    const t = useTranslations("project.color-calc");

    if (!hex) return null;

    return (
        <Stack sx={{ alignItems: "center" }}>
            <Body2 sx={{ whiteSpace: "pre-wrap", textAlign: "center", height: "2.25rem", verticalAlign: "middle" }}>{desc}</Body2>
            <Box
                onClick={async () => {
                    await navigator.clipboard.writeText(hex);
                    openPopup(t("copied"))
                }}
                sx={{
                    width: "4rem", height: "3rem",
                    my: "0.375rem", borderRadius: "0.5rem",
                    cursor: "pointer",
                    background: hex, 
                }}
            />
            <Body2>{hex}</Body2>
        </Stack>
    )
    
}