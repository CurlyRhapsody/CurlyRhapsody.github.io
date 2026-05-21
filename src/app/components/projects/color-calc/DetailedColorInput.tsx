import { Box, Stack } from "@mui/material";
import { Colorful } from "@uiw/react-color";
import { useTranslations } from "next-intl";
import { useColorCalcContext } from "../providers/ColorCalcProvider";
import { Subtitle1 } from "../../styled/text";

import "./color-picker.css"
import { HexTextField, HsvTextField, RgbTextField } from "./ColorCodeTextfields";
import { aspectRatio } from "motion";

const DetailedColorInput = () => {
    
    const t = useTranslations("project.color-calc");
    const { hex, rgb, hsv, setColor, onChangeCodeValue } = useColorCalcContext();


    return (
        <Stack direction="column" sx={{ p: "1rem", width: "100%", alignItems: "center", gap: "2rem" }}>
            <Stack sx={{ gap: "1rem" }}>
                <Subtitle1>{t("pickColor")}</Subtitle1>
                <Colorful
                    disableAlpha color={hex} onChange={setColor}
                    style={{
                        borderRadius: "0"
                    }}
                />
            </Stack>
            
            <Stack sx={{ gap: "1rem" }}>
                <Subtitle1>{t("typeItOut")}</Subtitle1>
                <Stack direction="row" sx={{ justifyContent: "space-around", alignItems: "center", height: "fit-content", gap: "2rem" }}>
                    <Box sx={{ height: "8rem", aspectRatio: "1/1", borderRadius: "50%", background: `#${hex}` }} />
                    <Stack sx={{ gap: "1rem" }}>
                        <HexTextField hex={hex} setColor={onChangeCodeValue} />
                        <RgbTextField rgb={rgb} setColor={onChangeCodeValue} />
                        <HsvTextField hsv={hsv} setColor={onChangeCodeValue} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default DetailedColorInput;