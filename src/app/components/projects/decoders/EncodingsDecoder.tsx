import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { Box, Grid, Stack } from "@mui/material";
import { Body1 } from "../../styled/text";
import { ConvertButton, StyledTextField } from "./components";
import { encodedTextToPlain, InitialEncodeType, plainToEncodedText } from './utils';

const EncodingsDecoder = () => {
    const t = useTranslations("project.decoders.encodings");
    const { openPopup } = useSnackbarContext();

    const [plaintext, setPlaintext] = useState<string>("");
    const [base32, setBase32] = useState<string>("");
    const [base64, setBase64] = useState<string>("");
    const [base85, setBase85] = useState<string>("");
    const [uriEncode, setUriEncode] = useState<string>("");
    const [htmlEncode, setHtmlEncode] = useState<string>("");
    const [unicodeEncode, setUnicodeEncode] = useState<string>("");

    const convert = (text: string, fromType: InitialEncodeType) => {
        const plaintext = encodedTextToPlain(text, fromType);
        const res = plainToEncodedText(plaintext);

        setPlaintext(res.plaintext)
        setBase32(res.base32);
        setBase64(res.base64);
        setBase85(res.base85);
        setUriEncode(res.uri);
        setHtmlEncode(res.html);
        setUnicodeEncode(res.unicode16);

        openPopup(t("converted"));
    }

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Box sx={{ width: "50%", mb: "3rem" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                    <Body1>{t("plain")}</Body1>
                    <ConvertButton
                        variant="contained"
                        onClick={() => convert(plaintext, InitialEncodeType.PLAINTEXT)}
                    >
                        {t("convert")}
                    </ConvertButton>
                </Stack>
                <StyledTextField
                    multiline rows={3}
                    value={plaintext}
                    onChange={(e) => {
                        const originalText = e.target.value;
                        setPlaintext(originalText);
                    }}
                />
            </Box>
            <Grid columns={2} container direction="row" columnSpacing="2rem" rowSpacing="3rem" sx={{ width: "100%", pb: "1.5rem" }}>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("base32")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(base32, InitialEncodeType.BASE32)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={base32}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^A-Z2-7]/g, '');
                                setBase32(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("base64")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(base64, InitialEncodeType.BASE64)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={base64}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^A-Za-z0-9+\/]/g, '');
                                setBase64(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("base85")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(base85, InitialEncodeType.BASE85)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={base85}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^!-uz~<>]/g, '');
                                setBase85(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("uri")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(uriEncode, InitialEncodeType.URI_ENCODE)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={uriEncode}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^A-Za-z0-9\-._~%]/g, '');
                                setUriEncode(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("html")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(htmlEncode, InitialEncodeType.HTML_ESCAPE)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={htmlEncode}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^A-Fa-f0-9&#;x]/g, '');
                                setHtmlEncode(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={1}>
                    <Box sx={{ width: "100%" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                            <Body1>{t("unicode16")}</Body1>
                            <ConvertButton
                                variant="contained"
                                onClick={() => convert(unicodeEncode, InitialEncodeType.UNICODE_16)}
                            >
                                {t("convert")}
                            </ConvertButton>
                        </Stack>
                        <StyledTextField
                            multiline rows={3}
                            value={unicodeEncode}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.replace(/[^A-Fa-f0-9\\u]/g, '');
                                setUnicodeEncode(sanitized)
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default EncodingsDecoder;