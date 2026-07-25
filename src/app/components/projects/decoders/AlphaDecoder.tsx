import { Box, Divider, Stack, SvgIcon, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { Body1, Body2, Subtitle1, Subtitle2 } from "../../styled/text";
import { useState } from "react";
import { ConvertButton, StyledTextField } from "./components";
import { encodedAlphaToPlain, InitialAlphaType, encodeAlphabets, validA1Z26CodeRegex, defaultA1Z26, qwertyA1Z26 } from './utils';
import { useSnackbarContext } from "../../providers/SnackbarProvider";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const AlphaDecoder = () => {

    const t = useTranslations("project.decoders.alphabets");
    const { openPopup } = useSnackbarContext();

    const [plaintext, setPlaintext] = useState<string>("");
    const [a1z26, setA1Z26] = useState<string>("");
    const [a1z26pattern, setA1Z26Pattern] = useState<string>(defaultA1Z26);
    const [isPatternValid, setIsPatternValid] = useState<boolean>(true);
    const [t9Phone, setT9Phone] = useState<string>("");

    const convert = (text: string, fromType: InitialAlphaType) => {
        const plaintext = encodedAlphaToPlain(text, fromType, a1z26pattern);
        const res = encodeAlphabets(plaintext, a1z26pattern);

        setPlaintext(res.plaintext);
        setA1Z26(res.a1z26);
        setT9Phone(res.t9);

        openPopup(t("converted"));
    }

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Subtitle2 sx={{ mx: "-2rem" }}>{t("sepWithSpace")}</Subtitle2>
            <Box sx={{ width: "90%", mb: "3rem" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                    <Body1>{t("plain")}</Body1>
                    <ConvertButton
                        variant="contained"
                        onClick={() => convert(plaintext, InitialAlphaType.PLAINTEXT)}
                    >
                        {t("convert")}
                    </ConvertButton>
                </Stack>
                <StyledTextField
                    multiline rows={3}
                    value={plaintext}
                    onChange={(e) => {
                        const originalText = e.target.value;
                        const sanitized = originalText.toUpperCase().replace(/[^A-Z\s]/g, '');
                        setPlaintext(sanitized)
                    }}
                />
            </Box>
            <Box sx={{ width: "90%", mb: "3rem" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                    <Body1>{t("ais1")}</Body1>
                    <ConvertButton
                        variant="contained"
                        onClick={() => convert(a1z26, InitialAlphaType.A1Z26)}
                    >
                        {t("convert")}
                    </ConvertButton>
                </Stack>
                <StyledTextField
                    multiline rows={3}
                    value={a1z26}
                    onChange={(e) => {
                        const originalText = e.target.value;
                        const sanitized = originalText.replace(/[^0-9-\s]/g, '');
                        setA1Z26(sanitized)
                    }}
                />
                <Stack sx={{ gap: "1rem", mt: "1rem" }}>
                    <Subtitle1>{t("customOrder")}</Subtitle1>
                    <Stack direction="column" sx={{ gap: "1rem", alignItems: "flex-start" }}>
                        <Stack direction="row" sx={{ gap: "1rem", alignItems: "center" }}>
                            <Subtitle2>{t("order")}</Subtitle2>
                            <TextField
                                value={a1z26pattern}
                                sx={{
                                    "& .MuiInputBase-input": { padding: "0.5rem", fontFamily: "monospace" },
                                    borderRadius: "0.5rem",
                                    width: "16rem",
                                }}
                                slotProps={{
                                    htmlInput: { maxLength: 26 } 
                                }}
                                onChange={(e) => {
                                    const originalText = e.target.value;
                                    const sanitized = originalText.toUpperCase().replace(/[^A-Z]/g, '');
                                    setIsPatternValid(validA1Z26CodeRegex.test(sanitized));
                                    setA1Z26Pattern(sanitized);
                                }}
                            />
                        </Stack>
                        <Stack direction="row" sx={{ gap: "1rem", alignItems: "center" }}>
                            <Subtitle2>{t("preset")}</Subtitle2>
                            <ConvertButton
                                variant="contained"
                                onClick={() => setA1Z26Pattern(defaultA1Z26)}
                            >
                                ABCDEF
                            </ConvertButton>
                            <ConvertButton
                                variant="contained"
                                onClick={() => setA1Z26Pattern(qwertyA1Z26)}
                            >
                                QWERTY
                            </ConvertButton>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" sx={{ height: "1.5rem", borderWidth: "0.0625rem" }} />}
                        sx={{ gap: "1rem" }}
                    >
                        <Stack direction="row" sx={{ gap: "1rem", color: isPatternValid ? "#00D40A" : "#C20000" }}>
                            <SvgIcon component={isPatternValid ? CheckIcon : CloseIcon} />
                            <Body2>{t("check")}</Body2>
                        </Stack>
                        {!isPatternValid && <Body2>{t("default")}</Body2>}
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ width: "90%", mb: "3rem" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1rem" }}>
                    <Body1>{t("t9phone")}</Body1>
                    <ConvertButton
                        variant="contained"
                        onClick={() => convert(t9Phone, InitialAlphaType.T9PHONE)}
                    >
                        {t("convert")}
                    </ConvertButton>
                </Stack>
                <StyledTextField
                    multiline rows={3}
                    value={t9Phone}
                    onChange={(e) => {
                        const originalText = e.target.value;
                        const sanitized = originalText.replace(/[^02-9-]/g, '');
                        setT9Phone(sanitized)
                    }}
                />
            </Box>
        </Stack>
    )
}

export default AlphaDecoder;