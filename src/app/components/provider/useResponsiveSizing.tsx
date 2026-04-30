import { useMediaQuery } from "@mui/material"

const useResponsiveSizing = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return { isMobile, isDesktop };
}

export default useResponsiveSizing;