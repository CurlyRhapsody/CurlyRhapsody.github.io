import { SvgIconComponent } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { Body1 } from "../Styled/Text";
import useResponsiveSizing from "../Provider/useResponsiveSizing";
import { useTranslations } from "next-intl";

const SectionButton = ({
    Icon, text, onClick
}: {
    Icon: SvgIconComponent;
    text: string;
    onClick: () => void;
}) => {

    const { isMobile, isDesktop } = useResponsiveSizing();
    const t = useTranslations("menu")

    return (
        <MenuItem
            onClick={onClick}
            sx={{
                color: "#3C3C3C",
                ...(isMobile && { width: "100%", height: "3rem", gap: "0.5rem" }),
                ...(isDesktop && { height: "100%", gap: "0.375rem", }),
            }}
        >
            <Icon sx={{ fontSize: "1.125rem" }} />
            <Body1>{t(text)}</Body1>
        </MenuItem>
    )
}

export default SectionButton;