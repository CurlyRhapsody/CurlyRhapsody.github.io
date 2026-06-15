import { Box, Stack } from '@mui/material';
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import PanoramaIcon from '@mui/icons-material/Panorama';
import { Body1 } from '../../styled/text';
import Image from 'next/image';

enum ImageErrorType {
    MULTI_IMAGES_UPLOADED = "MULTI_IMAGES_UPLOADED",
    INVALID_TYPE = "INVALID_TYPE",
    UNKNOWN_FILE = "UNKNOWN_FILE",
}

const ImageUploadArea = ({
    image, setImage,
    brightness, contrast
}: {
    image: File | null,
    setImage: (newImage: File | null) => void;
    brightness: number;
    contrast: number;
}) => {
    const t = useTranslations("project.decoders.image");
    const [errorType, setErrorType] = useState<ImageErrorType | undefined>(undefined);
    const [objUrl, setObjUrl] = useState<string | undefined>(undefined);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const imageUploadRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragOver(true);
        } else if (e.type === "dragleave") {
            setIsDragOver(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        handleUploadImage(e.dataTransfer.files)
    }

    const handleUploadImage = (files: FileList | null) => {

        setErrorType(undefined);

        if (!files) {
            setErrorType(ImageErrorType.INVALID_TYPE);
            return false;
        }

        if (files && files.length > 1) {
            setErrorType(ImageErrorType.MULTI_IMAGES_UPLOADED);
            return false;
        }

        const file: File = files[0];

        if (!file.type.startsWith("image/")) {
            setErrorType(ImageErrorType.INVALID_TYPE);
            return false;
        }

        setImage(file);
    }

    useEffect(() => {

        if (!image) return;

        const objectUrl = URL.createObjectURL(image);
        setObjUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);

    }, [image]);

    return (
        <>
            <input
                type="file" ref={imageUploadRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleUploadImage(e.target.files)}
            />
            <Stack
                sx={{ width: "100%", alignItems: "center", gap: "1rem", userSelect: "none" }}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <Box
                    sx={{
                        border: isDragOver ? "0.125rem solid #1E90FF" : "0.125rem dashed #1E90FF",
                        background: isDragOver ? "#CCCCCC" : "#FFFFFF",
                        borderRadius: "0.5rem",
                        cursor: "pointer", width: "40rem", height: "40rem", position: "relative"
                    }}
                    onClick={() => imageUploadRef.current?.click()}
                >
                    {objUrl ? (
                        <Image
                            src={objUrl}
                            alt=""
                            fill
                            style={{
                                objectFit: 'contain', maxWidth: "100%", maxHeight: "100%",
                                filter: `brightness(${brightness}) contrast(${contrast})`
                            }}
                        />
                    ) : (
                        <Stack
                            sx={{
                                width: "100%", height: "100%",
                                alignItems: "center", justifyContent: "center", gap: "1rem"
                            }}
                        >
                            <PanoramaIcon sx={{ fontSize: "6rem", color: "#1E90FF" }} />
                            <Body1 sx={{ textAlign: "center" }}>{t("upload")}</Body1>
                            <Body1 sx={{ textAlign: "center" }}>{t("serverless")}</Body1>
                        </Stack>
                    )}
                </Box>
                {!!errorType && <Body1 sx={{ color: "#C20000", py: "0.5rem" }}>{t(errorType)}</Body1>}
            </Stack>
        </>
    )
}

export default ImageUploadArea; 