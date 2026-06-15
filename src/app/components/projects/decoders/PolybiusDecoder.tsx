import { useTranslations } from "next-intl";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useState } from "react";
import { Box, Stack } from '@mui/material';
import { Body1, Subtitle2 } from "../../styled/text";
import { EncryptButton, StyledTextField } from './components';
import { encryptPolybius, decryptPolybius } from './utils';

const PolybiusDecoder = () => {

    const t = useTranslations("project.decoders.polybius");
    const { openPopup } = useSnackbarContext();

    const [polybiusPlain, setPolybiusPlain] = useState<string>("");
    const [polybiusCipher, setPolybiusCipher] = useState<string>("");

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Box sx={{ width: "100%" }}>
                <Subtitle2 sx={{ textAlign: "center" }}>{t("sepRules")}</Subtitle2>
                <Subtitle2 sx={{ textAlign: "center" }}>{t("decryptIJ")}</Subtitle2>
            </Box>
            <Box sx={{ width: "100%", py: "1rem" }}>
                <Stack direction="row">
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("plaintext")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={polybiusPlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.toUpperCase().replace(/[^A-Z ]/g, '');
                                setPolybiusPlain(sanitized)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", pt: "1.75rem" }}>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setPolybiusCipher(
                                    encryptPolybius(polybiusPlain)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </EncryptButton>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setPolybiusPlain(
                                    decryptPolybius(polybiusCipher)
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
                            value={polybiusCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.toUpperCase().replace(/[^A-Z \/]/g, '');
                                setPolybiusCipher(sanitized)
                            }}
                        />
                    </Box>
                </Stack>
                <Stack direction="row" sx={{ width: "100%", py: "1rem" }}>
                    <Stack sx={{ width: "40%" }}>

                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
}

export default PolybiusDecoder;