import { Box, Stack, SxProps } from "@mui/material";
import { ColorPalette } from "../providers/ColorCalcProvider";
import { Body1 } from "../../styled/text";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useTranslations } from "next-intl";
import useResponsiveSizing from '../../hooks/useResponsiveSizing';

const rowFirst: SxProps = {
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
}

const rowLast: SxProps = {
    borderTopRightRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
}

const columnFirst: SxProps = {
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
}

const columnLast: SxProps = {
    borderBottomLeftRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
}

export const ColorList = ({ list }: {
    list?: ColorPalette[];
}) => {
    const listSize = list?.length;
    const { openPopup } = useSnackbarContext();
    const t = useTranslations("project.color-calc");

    const { isMobile } = useResponsiveSizing();
    
    if (!listSize) return null;
    if (listSize === 0) return null;

    return (
        <Stack direction={isMobile ? "column" : "row"} sx={{ width: isMobile ? "unset" : "100%" }}>
            {list.map((palette, index) => (
                <Stack
                    direction={isMobile ? "row" : "column"}
                    key={`${palette.hex}-${index}`}
                    sx={{
                        width: isMobile ? "unset" : `calc(100% / ${listSize})`,
                        alignItems: "center", gap: "0.375rem"
                    }}
                >
                    <Body1
                        sx={{
                            width: isMobile ? "6.5rem" : "unset",
                            fontSize: isMobile ? "1.25rem" : "min(calc(100dvw * 0.0182291667), 1.25rem)"
                        }}
                    >
                            {palette.hex}
                    </Body1>
                    <Box
                        onClick={async () => {
                            await navigator.clipboard.writeText(palette.hex);
                            openPopup(t("copied"))
                        }}
                        sx={{
                            width: isMobile ? "5rem" : "100%", height: "3rem", background: palette.hex,
                            cursor: "pointer", mr: isMobile ? "0.5rem" : "unset",
                            ...(index === 0 ? (isMobile ? columnFirst : rowFirst) : null),
                            ...(index === listSize-1 ? (isMobile ? columnLast : rowLast) : null),
                        }}
                    />
                    {palette.desc && <Body1>{palette.desc}</Body1>}
                </Stack>
            ))}
        </Stack>
    )
}

export const ColorSwatch = ({ desc, hex }: {
    desc: string;
    hex?: string;
}) => {

    const { openPopup } = useSnackbarContext();
    const t = useTranslations("project.color-calc");

    const { isMobile } = useResponsiveSizing();

    if (!hex) return null;

    return (
        <Stack sx={{ alignItems: "center" }}>
            <Stack sx={{ height: "2.25rem", justifyContent: "flex-end" }}>
                <Body1 sx={{ whiteSpace: "pre-wrap", textAlign: "center", verticalAlign: "bottom" }}>{desc}</Body1>
            </Stack>
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
            <Body1>{hex}</Body1>
        </Stack>
    )
    
}