import { useMediaQuery } from "@mui/material"
import { useMemo } from "react";

const useResponsiveSizing = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const isWideDesktop = useMediaQuery("(min-width: 1080px)");

    return { isMobile, isDesktop, isWideDesktop };
}

export default useResponsiveSizing;