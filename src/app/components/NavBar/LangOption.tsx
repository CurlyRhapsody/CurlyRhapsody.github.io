import { MenuItem } from "@mui/material";
import { Body1 } from "../styled/text";
import useResponsiveSizing from "../provider/useResponsiveSizing";

const LangOption = ({
    text, onClick
}: {
    text: string;
    onClick: () => void;
}) => {
    const { isMobile, isDesktop } = useResponsiveSizing();

    return (
        <MenuItem
            onClick={onClick}
            sx={{
                color: "#3C3C3C",
                ...(isDesktop && { height: "2.5rem", padding: "0.5rem 1rem" }),
                ...(isMobile && { width: "100%", height: "3rem" }),
            }}
        >
            <Body1>{text}</Body1>
        </MenuItem>
    )
}

export default LangOption;