import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ImageUploadArea from "./ImageUploadArea";
import { Subtitle2 } from "../../styled/text";
import ImageSettingsInfo from "./ImageSettingsInfo";

const ImageProcessor = () => {
    const t = useTranslations("project.decoders.image");

    const [image, setImage] = useState<File | null>(null);
    const [brightness, setBrightness] = useState<number>(1.8);
    const [contrast, setContrast] = useState<number>(1);

    // Reset brightness and contrast
    useEffect(() => {
        setBrightness(1);
        setContrast(1);
    }, [image])

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem", pb: "1.5rem" }}>
            <Subtitle2 sx={{ width: "100%", textAlign: "left" }}>{t("yourImage")}</Subtitle2>
            <ImageUploadArea
                image={image} setImage={setImage}
                brightness={brightness} contrast={contrast}
            />
            {image && (
                <ImageSettingsInfo
                    image={image} brightness={brightness} contrast={contrast}
                    setBrightness={setBrightness} setContrast={setContrast}
                />
            )}
        </Stack>
    )
}

export default ImageProcessor;