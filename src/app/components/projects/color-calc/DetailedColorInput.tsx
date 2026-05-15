import { Stack } from "@mui/material";
import { Colorful } from "@uiw/react-color";
import { useTranslations } from "next-intl";
import { useColorCalcContext } from "../providers/ColorCalcProvider";
import { Subtitle1 } from "../../styled/text";

import "./color-picker.css"
import { HexTextField, HsvTextField, RgbTextField } from "./ColorCodeTextfields";

const DetailedColorInput = () => {
    
    const t = useTranslations("project.color-calc");
    const { hex, rgb, hsv, setColor, onChangeCodeValue } = useColorCalcContext();


    return (
        <Stack direction="row" sx={{ p: "1rem", width: "100%", justifyContent: "space-around" }}>
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
                <HexTextField hex={hex} setColor={onChangeCodeValue} />
                <RgbTextField rgb={rgb} setColor={onChangeCodeValue} />
                <HsvTextField hsv={hsv} setColor={onChangeCodeValue} />
            </Stack>
        </Stack>
    )
}

export default DetailedColorInput;