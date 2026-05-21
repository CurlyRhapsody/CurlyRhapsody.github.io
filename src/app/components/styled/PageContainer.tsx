import { Stack, SxProps } from "@mui/material";
import useResponsiveSizing from '../hooks/useResponsiveSizing';

const PageContainer = ({ children, outerSx, innerSx, }: {
    children: React.ReactNode;
    outerSx?: SxProps;
    innerSx?: SxProps;
}) => {
    const { isMobile } = useResponsiveSizing();

    return (
        <Stack sx={{
                width: "100%", py: "2rem", alignItems: "center",
                ...outerSx
            }}
        >
            <Stack
                sx={{
                    width: isMobile ? "45rem" : "min(calc(100% - 4rem), 67.5rem)",
                    mx: isMobile ? "unset" : "2rem",
                    alignItems: "center", gap: "2rem",
                    ...innerSx
                }}
            >
                {children}
            </Stack>
        </Stack>
    );
    
}

export default PageContainer;