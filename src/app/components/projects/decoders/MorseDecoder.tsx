import { useTranslations } from "next-intl";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useState } from "react";
import { Box, Stack } from '@mui/material';
import { Body1, Subtitle2 } from "../../styled/text";
import { EncryptButton, StyledTextField } from './components';
import { encryptMorse, decryptMorse } from './utils';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MorseDecoder = () => {

    const t = useTranslations("project.decoders.morse");
    const { openPopup } = useSnackbarContext();

    const [morsePlain, setMorsePlain] = useState<string>("");
    const [morseCipher, setMorseCipher] = useState<string>("");
    const [isMorseDone, setIsMorseDone] = useState<boolean>(true);

    const playTone = (audioCtx: AudioContext, duration: number, startTime: number) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine'; // A clean "beep"
        oscillator.frequency.setValueAtTime(550, startTime); // 600Hz tone
        
        gainNode.gain.setValueAtTime(0.1, startTime); // Keep volume low
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    };

    const playMorse = async (morseText: string) => {

        if (!isMorseDone) return;

        const audioCtx = new window.AudioContext();

        setIsMorseDone(false);
        const UNIT = 0.08; // 80ms per unit
        let time = audioCtx.currentTime;

        for (const char of morseText) {
        switch (char) {
            case '.':
                playTone(audioCtx, UNIT, time);
                time += UNIT * 2; // Sound + tiny gap
                break;
            case '-':
                playTone(audioCtx, UNIT * 3, time);
                time += UNIT * 4; // Sound + tiny gap
                break;
            case '/':
                time += UNIT * 6; // Longer gap
                break;
            case ' ':
                time += UNIT * 2; // Longest gap
                break;
            }
        }

        setTimeout(() => {
            setIsMorseDone(true);
            audioCtx.close();
        }, time * 1000);
    };

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Box sx={{ width: "100%" }}>
                <Subtitle2 sx={{ textAlign: "center" }}>{t("sepRules")}</Subtitle2>
            </Box>
            <Box sx={{ width: "100%", py: "1rem" }}>
                <Stack direction="row">
                    <Box sx={{ width: "40%" }}>
                        <Body1 sx={{ pb: "0.5rem" }}>{t("plaintext")}</Body1>
                        <StyledTextField
                            multiline rows={3}
                            value={morsePlain}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.toUpperCase().replace(/[^A-Za-z0-9 .,?!:;\-\/@'()=]/g, '');
                                setMorsePlain(sanitized)
                            }}
                        />
                    </Box>
                    <Stack sx={{ width: "20%", alignItems: "center", justifyContent: "center", gap: "1rem", py: "1.75rem 4.25rem" }}>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setMorseCipher(
                                    encryptMorse(morsePlain)
                                );
                                openPopup(t("encrypted"));
                            }}
                        >
                            {t("encrypt")}
                        </EncryptButton>
                        <EncryptButton
                            variant="contained"
                            onClick={() => {
                                setMorsePlain(
                                    decryptMorse(morseCipher)
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
                            value={morseCipher}
                            onChange={(e) => {
                                const originalText = e.target.value;
                                const sanitized = originalText.toUpperCase().replace(/[^\.\- \/]/g, '');
                                setMorseCipher(sanitized)
                            }}
                        />
                        <Stack sx={{ width: "100%", alignItems: "center", pt: "1rem" }}>
                            <EncryptButton
                                startIcon={<PlayArrowIcon />}
                                variant="contained"
                                disabled={!isMorseDone}
                                onClick={() => playMorse(morseCipher)}
                            >
                                {t("playMorse")}
                            </EncryptButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
}

export default MorseDecoder;