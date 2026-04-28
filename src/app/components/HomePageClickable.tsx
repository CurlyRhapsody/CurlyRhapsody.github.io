import { ButtonBase, Icon, Stack } from "@mui/material";
import { ShadowedStack } from "./styled/component";
import { SvgIconComponent } from "@mui/icons-material";
import { Body1, Subtitle1 } from "./styled/text";
import { useTranslations } from "next-intl";

const HomePageClickable = ({ Icon, localeStr, onClick }: { 
    Icon: SvgIconComponent;
    localeStr: string;
    onClick: () => void;
 }) => {

    const t = useTranslations("home");

    return (
        <ButtonBase onClick={onClick} sx={{ borderRadius: "2rem", width: "100%" }}>
            <ShadowedStack sx={{ borderRadius: "2rem", background: "#FFF", p: "2rem", width: "100%", gap: "1rem", '&:hover': { background: "#E5E5E5", transition: "0.25s linear"} }}>
                <Stack sx={{ flexDirection: "row", gap: "0.5rem", justifyContent: "center" }}>
                    <Icon sx={{ fontSize: "1.625rem" }} />
                    <Subtitle1>{t(`${localeStr} title`)}</Subtitle1>
                </Stack>
                <Body1 sx={{ textAlign: "left" }}>{t(`${localeStr} desc`)}</Body1>
            </ShadowedStack>
        </ButtonBase>
    )

}

export default HomePageClickable;