import { useTranslations } from "next-intl";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useState } from "react";
import { Box, Stack, TextField, Divider } from '@mui/material';
import { Body1, Caption1, Subtitle1, Subtitle2 } from "../../styled/text";
import { StyledTextField, EncryptButton } from './components';
import { decryptCaesar, encryptCaesar, isCoprime, encryptAffine, decryptAffine } from './utils';

const LinearDecoder = () => {

    const t = useTranslations("project.decoders.linear");
    const { openPopup } = useSnackbarContext();

    const [caesarPlain, setCaesarPlain] = useState<string>("");
    const [caesarCipher, setCaesarCipher] = useState<string>("");
    const [caesarShift, setCaesarShift] = useState<number>(1);

    const [affinePlain, setAffinePlain] = useState<string>("");
    const [affineCipher, setAffineCipher] = useState<string>("");
    const [affineSlope, setAffineSlope] = useState<number>(1);
    const [affineIntercept, setAffineIntercept] = useState<number>(1);
    const [affineFactorError, setAffineFactorError] = useState<boolean>(false);

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Subtitle1>{t("alphabetOnly")}</Subtitle1>
            <Box sx={{ width: "100%", py: "1rem" }}>
                <Subtitle2>{t("caesar")} | C(x) = P(x) + s (mod 26)</Subtitle2>
                <Stack direction="row" sx={{ width: "100%", py: "1rem", gap: "1rem", alignItems: "center" }}>
                    <Body1>{t("shift")}</Body1>
                    <TextField
                        value={caesarShift}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const originalVal = e.target.value;
                            const sanitized = originalVal.replace(/[^0-9]/g, '');
                            const dropped = Number(sanitized)
                            setCaesarShift(dropped === 0 ? 1 : dropped);
                        }}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 1,
                                pattern: '[0-9]*'
                            }
                        }}
                        sx={{
                            width: "10rem",
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
                            value={caesarPlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setCaesarPlain(originalText)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", pt: "1.75rem" }}>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setCaesarCipher(
                                    encryptCaesar(caesarPlain, caesarShift)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </EncryptButton>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setCaesarPlain(
                                    decryptCaesar(caesarCipher, caesarShift)
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
                            value={caesarCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setCaesarCipher(originalText)
                            }}
                        />
                    </Box>
                </Stack>
                <Stack direction="row" sx={{ width: "100%", py: "1rem" }}>
                    <Stack sx={{ width: "40%" }}>

                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ width: "100%", py: "1rem" }}>
                <Subtitle2>{t("affine")} | C(x) = (f * P(x) + s) (mod 26)</Subtitle2>
                <Stack direction="row" sx={{ width: "100%", py: "1rem", gap: "1rem", alignItems: "center" }}>
                    <Body1>{t("factor")}</Body1>
                    <TextField
                        value={affineSlope}
                        error={affineFactorError}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const originalVal = e.target.value;
                            const sanitized = originalVal.replace(/[^0-9]/g, '');
                            const dropped = Number(sanitized);
                            const result = dropped === 0 ? 1 : dropped;
                            setAffineSlope(result);
                            setAffineFactorError(!isCoprime(result));
                        }}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 1,
                                pattern: '[0-9]*'
                            }
                        }}
                        sx={{
                            width: "10rem",
                            "& .MuiInputBase-input": { padding: "0.5rem" },
                            "& .MuiInputBase-root": { pl: "0.5rem" },
                        }}
                    />
                    <Divider orientation="vertical" sx={{ height: "2rem", borderWidth: "0.0625rem", mx: "1rem" }} />
                    <Body1>{t("shift")}</Body1>
                    <TextField
                        value={affineIntercept}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const originalVal = e.target.value;
                            const sanitized = originalVal.replace(/[^0-9]/g, '');
                            const dropped = Number(sanitized)
                            setAffineIntercept(dropped === 0 ? 1 : dropped);
                        }}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 1,
                                pattern: '[0-9]*'
                            }
                        }}
                        sx={{
                            width: "10rem",
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
                            value={affinePlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setAffinePlain(originalText)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", pt: "1.75rem" }}>
                        <EncryptButton
                            variant="contained"
                            disabled={affineFactorError}
                            onClick={() => {
                                setAffineCipher(
                                    encryptAffine(affinePlain, affineSlope, affineIntercept)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </EncryptButton>
                        <EncryptButton
                            variant="contained"
                            disabled={affineFactorError}
                            onClick={() => {
                                setAffinePlain(
                                    decryptAffine(affineCipher, affineSlope, affineIntercept)
                                );
                                openPopup(t("decrypted"));
                            }}
                        >
                            {t("decrypt")}
                        </EncryptButton>
                        {affineFactorError && <Caption1 sx={{ color: "#C20000" }}>{t("notCoprime")}</Caption1>}
                    </Stack>
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("ciphertext")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={affineCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setAffineCipher(originalText)
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

export default LinearDecoder;