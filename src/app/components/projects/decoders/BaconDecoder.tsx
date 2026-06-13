import { useTranslations } from "next-intl";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useState } from "react";
import { Box, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Body1, Subtitle2 } from "../../styled/text";
import { EncryptButton, StyledTextField } from './components';
import { BaconMode, decryptBacon, encryptBacon } from "./utils";

const BaconDecoder = () => {

    const t = useTranslations("project.decoders.bacon");
    const { openPopup } = useSnackbarContext();

    const [baconPlain, setBaconPlain] = useState<string>("");
    const [baconCipher, setBaconCipher] = useState<string>("");
    const [baconMode, setBaconMode] = useState<BaconMode>(BaconMode.MODERN_26);

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Box sx={{ width: "100%" }}>
                <Subtitle2 sx={{ textAlign: "center" }}>{t("sepRules")}</Subtitle2>
                {baconMode === BaconMode.HISTORICAL_24 &&
                    <Subtitle2 sx={{ textAlign: "center" }}>{t("decrypt24")}</Subtitle2>
                }
            </Box>
            <Stack direction="row" sx={{ gap: "1rem", width: "100%", alignItems: "center" }}>
                <Subtitle2 sx={{ textAlign: "left" }}>{t("mode")}</Subtitle2>
                <RadioGroup
                    value={baconMode}
                    onChange={(e) => setBaconMode(e.target.value as BaconMode)}
                    sx={{ flexDirection: "row", columnGap: "1rem" }}
                >
                    {Object.values(BaconMode).map((mode) => (
                        <FormControlLabel
                            value={mode}
                            control={<Radio sx={{ padding: "0.5rem" }} />}
                            label={t(mode)}
                            sx={{
                                ml: "-0.625rem", mr: "1rem",
                                "& .MuiFormControlLabel-label": {
                                    fontSize: "1.25rem",
                                    lineHeight: "1.75rem",
                                    fontWeight: 400,
                                }
                            }}
                        />
                    ))}
                </RadioGroup>
            </Stack>
            <Box sx={{ width: "100%", py: "1rem" }}>
                <Stack direction="row">
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("plaintext")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={baconPlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.toUpperCase().replace(/[^A-Z ]/g, '');
                                setBaconPlain(sanitized)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", pt: "1.75rem" }}>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setBaconCipher(
                                    encryptBacon(baconPlain, baconMode)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </EncryptButton>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setBaconPlain(
                                    decryptBacon(baconCipher, baconMode)
                                );
                                openPopup(t("decrypted"));
                            }}
                        >
                            {t("decrypt")}
                        </EncryptButton>
                    </Stack>
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("ciphertext")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={baconCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.toUpperCase().replace(/[^ab \/]/g, '');
                                setBaconCipher(sanitized)
                            }}
                        />
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
}

export default BaconDecoder;