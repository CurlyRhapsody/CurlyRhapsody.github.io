import { useTranslations } from "next-intl";
import { useSnackbarContext } from "../../providers/SnackbarProvider";
import { useState } from "react";
import { Box, Stack } from "@mui/material";

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

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Box sx={{ width: "100%", mb: "3rem" }}>

            </Box>
        </Stack>
    );
}

export default LinearDecoder;