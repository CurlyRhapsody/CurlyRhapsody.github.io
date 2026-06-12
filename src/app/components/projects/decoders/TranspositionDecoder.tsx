import { useTranslations } from "next-intl";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useState } from "react";
import { Box, Stack, TextField, Button, Divider } from '@mui/material';
import { Body1, Subtitle2 } from "../../styled/text";
import { StyledTextField } from './components';
import { encryptAffine, decryptAffine, encryptRail, decryptRail, encryptColumn, decryptColumn } from './utils';

const TranspositionDecoder = () => {

    const t = useTranslations("project.decoders.transposition");
    const { openPopup } = useSnackbarContext();

    const [railPlain, setRailPlain] = useState<string>("");
    const [railCipher, setRailCipher] = useState<string>("");
    const [railRows, setRailRows] = useState<number>(2);
    const [railOffset, setRailOffset] = useState<number>(0);

    const [columnPlain, setColumnPlain] = useState<string>("");
    const [columnCipher, setColumnCipher] = useState<string>("");
    const [columnColumns, setColumnColumns] = useState<number>(2);

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Box sx={{ width: "100%", py: "1rem" }}>
                <Subtitle2>{t("rail")}</Subtitle2>
                <Stack direction="row" sx={{ width: "100%", py: "1rem", gap: "1rem", alignItems: "center" }}>
                    <Body1>{t("rails")}</Body1>
                    <TextField
                        value={railRows}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const originalVal = e.target.value;
                            const sanitized = originalVal.replace(/[^0-9]/g, '');
                            const dropped = Number(sanitized);
                            const result = dropped < 2 ? 2 : dropped;
                            setRailRows(result)
                        }}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 2,
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
                        value={railOffset}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const originalVal = e.target.value;
                            const sanitized = originalVal.replace(/[^0-9]/g, '');
                            setRailOffset(Number(sanitized));
                        }}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 0,
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
                            value={railPlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setRailPlain(originalText)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", pt: "1.75rem" }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setRailCipher(
                                    encryptRail(railPlain, railRows, railOffset)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setRailPlain(
                                    decryptRail(railCipher, railRows, railOffset)
                                );
                                openPopup(t("decrypted"));
                            }}
                        >
                            {t("decrypt")}
                        </Button>
                    </Stack>
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("ciphertext")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={railCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setRailCipher(originalText)
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
                <Subtitle2>{t("scytale")}</Subtitle2>
                <Stack direction="row" sx={{ width: "100%", py: "1rem", gap: "1rem", alignItems: "center" }}>
                    <Body1>{t("column")}</Body1>
                    <TextField
                        value={columnColumns}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const originalVal = e.target.value;
                            const sanitized = originalVal.replace(/[^0-9]/g, '');
                            const dropped = Number(sanitized);
                            const result = dropped < 2 ? 2 : dropped;
                            setColumnColumns(result);
                        }}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 2,
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
                            value={columnPlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setColumnPlain(originalText)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", pt: "1.75rem" }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setColumnCipher(
                                    encryptColumn(columnPlain, columnColumns)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setColumnPlain(
                                    decryptColumn(columnCipher, columnColumns)
                                );
                                openPopup(t("decrypted"));
                            }}
                        >
                            {t("decrypt")}
                        </Button>
                    </Stack>
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("ciphertext")} {t("padding")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={columnCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                setColumnCipher(originalText)
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

export default TranspositionDecoder;