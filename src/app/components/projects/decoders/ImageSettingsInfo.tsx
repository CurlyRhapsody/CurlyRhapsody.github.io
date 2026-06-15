import { Box, Slider, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Body1, Subtitle2 } from "../../styled/text";
import { useMemo, useState, useEffect } from 'react';

const ImageSettingsInfo = ({
    image,
    brightness, setBrightness,
    contrast, setContrast
}: {
    image: File | null;
    brightness: number;
    setBrightness: (newBrightness: number) => void;
    contrast: number;
    setContrast: (newBrightness: number) => void;
}) => {

    const t = useTranslations("project.decoders.image");
    const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

    useEffect(() => {

        if (!image || !image.type.startsWith("image/")) return;

        const img = new Image();
        const objectUrl = URL.createObjectURL(image);
    
        img.src = objectUrl;

        console.log(img.src)

        img.onload = () => {
            setDimensions({ height: img.naturalHeight, width: img.naturalWidth });
        }
        
    }, [image])

    return (
        <Stack sx={{ alignItems: "center", width: "100%", gap: "2rem" }}>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "space-around", alignItems: "center", gap: "2rem" }}>
                <Stack direction="row" sx={{ gap: "1rem" }}>
                    <Body1>{t("dimension")}</Body1>
                    <Body1>{dimensions?.width ?? 0}x{dimensions?.height ?? 0}</Body1>
                </Stack>
                <Stack direction="row" sx={{ gap: "1rem" }}>
                    <Body1>{t("size")}</Body1>
                    <Body1>{image?.size.toLocaleString() ?? 0} B</Body1>
                </Stack>
            </Stack>
            <Stack sx={{ width: "25rem", alignItems: "center", gap: "2rem" }}>
                <Box>
                    <Subtitle2>{t("brightness")}</Subtitle2>
                    <Stack direction="row" sx={{ width: "40rem", gap: "1rem" }}>
                        <Slider
                            value={brightness}
                            onChange={(_, num: number) => setBrightness(num)}
                            min={0}
                            max={100}
                            step={0.1}
                            sx={{
                                py: "0.875rem",
                                width: "35rem",
                                "& .MuiSlider-thumb": {
                                    height: "1.25rem",
                                    width: "1.25rem"
                                },
                                "& .MuiSlider-thumb::after": {
                                    height: "1.25rem",
                                    width: "1.25rem"
                                }
                            }}
                        />
                        <Body1 sx={{ width: "5rem" }}>{Math.floor(brightness * 100)}%</Body1>
                    </Stack>
                </Box>
                <Box>
                    <Subtitle2>{t("contrast")}</Subtitle2>
                    <Stack direction="row" sx={{ width: "40rem", gap: "1rem" }}>
                        <Slider
                            value={contrast}
                            onChange={(_, num: number) => setContrast(num)}
                            min={0}
                            max={100}
                            step={0.1}
                            sx={{
                                py: "0.875rem",
                                width: "35rem",
                                "& .MuiSlider-thumb": {
                                    height: "1.25rem",
                                    width: "1.25rem"
                                },
                                "& .MuiSlider-thumb::after": {
                                    height: "1.25rem",
                                    width: "1.25rem"
                                }
                            }}
                        />
                        <Body1 sx={{ width: "5rem" }}>{Math.floor(contrast * 100)}%</Body1>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    )
}

export default ImageSettingsInfo;