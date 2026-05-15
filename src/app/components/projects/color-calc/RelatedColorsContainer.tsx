import { useTranslations } from "next-intl";
import { Subtitle1, Title2 } from "../../styled/text";
import { Stack } from "@mui/material";
import ColorList from "./ColorList";
import { useColorCalcContext } from "../providers/ColorCalcProvider";

const RelatedColorsContainer = () => {
    const t = useTranslations("project.color-calc");
    const { shades, tints } = useColorCalcContext();

    return (
        <Stack sx={{ gap: "2rem" }}>
            <Title2>{t("related")}</Title2>
            <Stack sx={{ gap: "1rem" }}>
                <Subtitle1>{t("shade")}</Subtitle1>
                <Stack sx={{ alignItems: "center" }}>
                    <ColorList list={shades} />
                </Stack>
            </Stack>

            <Stack sx={{ gap: "1rem" }}>
                <Subtitle1>{t("tint")}</Subtitle1>
                <Stack sx={{ alignItems: "center" }}>
                    <ColorList list={tints} />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default RelatedColorsContainer;