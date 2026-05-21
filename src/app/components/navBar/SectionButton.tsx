import { SvgIconComponent } from "@mui/icons-material";
import { Body1 } from "../styled/text";
import useResponsiveSizing from "../hooks/useResponsiveSizing";
import { useTranslations } from "next-intl";
import { SidebarMenuItem } from "../styled/component";

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
        <SidebarMenuItem
            onClick={onClick}
            sx={{
                color: "#3C3C3C",
                ...(isMobile && { width: "100%", height: "5rem", gap: "0.5rem" }),
                ...(isDesktop && { height: "100%", gap: "0.375rem" }),
            }}
        >
            <Icon sx={{ fontSize: isMobile ? "1.625rem" : "1.125rem" }} />
            <Body1>{t(text)}</Body1>
        </SidebarMenuItem>
    )
}

export default SectionButton;