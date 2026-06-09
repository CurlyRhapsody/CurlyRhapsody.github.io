import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Subtitle2 } from "../../styled/text";

const AlphaDecoder = () => {

    const t = useTranslations("project.decoders.alphabets");

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", px: "2rem" }}>
            <Subtitle2 sx={{ mx: "-2rem" }}>{t("sepWithSpace")}</Subtitle2>
        </Stack>
    )
}

export default AlphaDecoder;