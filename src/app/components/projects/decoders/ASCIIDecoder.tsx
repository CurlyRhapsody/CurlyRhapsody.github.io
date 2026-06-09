import { useTranslations } from "next-intl";
import { useState } from "react";
import { Box, Button, Grid, Stack } from '@mui/material';
import { Body1, Subtitle2 } from '@/app/components/styled/text';
import { encodePlaintext, InitialTextType, textToPlain } from './utils';
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { ConvertButton, StyledTextField } from "./components";

const ASCIIDecoder = () => {

    const t = useTranslations("project.decoders.ascii");
    const { openPopup } = useSnackbarContext();

    const [plaintext, setPlaintext] = useState<string>("");
    const [decimal, setDecimal] = useState<string>("");
    const [binary, setBinary] = useState<string>("");
    const [octal, setOctal] = useState<string>("");
    const [hexadecimal, setHexadecimal] = useState<string>("");

    const convert = (text: string, fromType: InitialTextType) => {
        const plaintext = textToPlain(text, fromType);
        const res = encodePlaintext(plaintext);

        setPlaintext(res.plaintext);
        setDecimal(res.decimal);
        setBinary(res.binary);
        setOctal(res.octal);
        setHexadecimal(res.hexadecimal);

        openPopup(t("converted"))
    }

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Subtitle2 sx={{ mx: "-2rem" }}>{t("sepWithSpace")}</Subtitle2>
            <Box sx={{ width: "50%", mb: "3rem" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                    <Body1>{t("plain")}</Body1>
                    <ConvertButton
                        variant="contained"
                        onClick={() => convert(plaintext, InitialTextType.PLAINTEXT)}
                    >
                        {t("convert")}
                    </ConvertButton>
                </Stack>
                <StyledTextField
                    multiline rows={3}
                    value={plaintext}
                    onChange={(e) => {
                        const originalText = e.target.value;
                        const sanitized = originalText.replace(/[^\x00-\x7F]/g, '');
                        setPlaintext(sanitized)
                    }}
                />
            </Box>
            <Grid columns={2} container direction="row" columnSpacing="2rem" rowSpacing="3rem" sx={{ width: "100%" }}>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("binary")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(binary, InitialTextType.BINARY)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={binary}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^01 ]/g, '');
                                setBinary(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("octal")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(octal, InitialTextType.OCTAL)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={octal}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^0-7 ]/g, '');
                                setOctal(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("decimal")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(decimal, InitialTextType.DECIMAL)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={decimal}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^0-9 ]/g, '');
                                setDecimal(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("hexadecimal")}</Body1>
                            <Button
                                variant="contained"
                                sx={{ p: "0.5rem", width: "7.5rem", borderRadius: "0.5rem", fontSize: "1.25rem" }}
                                onClick={() => convert(hexadecimal, InitialTextType.HEXADECIMAL)}
                            >
                                {t("convert")}
                            </Button>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={hexadecimal}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^0-9a-f ]/g, '');
                                setHexadecimal(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default ASCIIDecoder;