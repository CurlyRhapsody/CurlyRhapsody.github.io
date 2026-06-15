import { useTranslations } from "next-intl";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useState } from "react";
import { Box, Stack, TextField } from '@mui/material';
import { Body1 } from "../../styled/text";
import { EncryptButton, StyledTextField } from './components';
import { encryptVigenere, decryptVigenere } from './utils';

const VigenereDecoder = () => {

    const t = useTranslations("project.decoders.vigenere");
    const { openPopup } = useSnackbarContext();

    const [vigenerePlain, setVigenerePlain] = useState<string>("");
    const [vigenereCipher, setVigenereCipher] = useState<string>("");
    const [vigenereSecret, setVigenereSecret] = useState<string>("");

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Box sx={{ width: "100%", py: "1rem" }}>
                <Stack direction="row" sx={{ width: "100%", py: "1rem", gap: "1rem", alignItems: "center" }}>
                    <Body1>{t("key")}</Body1>
                    <TextField
                        value={vigenereSecret}
                        onChange={(e) => {
                            const originalVal = e.target.value;
                            const sanitized = originalVal.toUpperCase().replace(/[^A-Z]/g, '');
                            setVigenereSecret(sanitized)
                        }}
                        slotProps={{
                            htmlInput: {
                                min: 2,
                                pattern: '[A-Z]*'
                            }
                        }}
                        sx={{
                            width: "20rem",
                            "& .MuiInputBase-input": { padding: "0.5rem" },
                            "& .MuiInputBase-root": { pl: "0.5rem" },
                        }}
                    />
                </Stack>
                <Stack direction="row">
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("plaintext")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={vigenerePlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setVigenerePlain(originalText)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", pt: "1.75rem" }}>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setVigenereCipher(
                                    encryptVigenere(vigenerePlain, vigenereSecret)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </EncryptButton>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setVigenerePlain(
                                    decryptVigenere(vigenereCipher, vigenereSecret)
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
                            value={vigenereCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setVigenereCipher(originalText)
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

export default VigenereDecoder;