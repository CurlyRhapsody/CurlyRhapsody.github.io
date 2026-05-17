import { Stack, SxProps } from "@mui/material";

const PageContainer = ({ children, outerSx, innerSx, }: {
    children: React.ReactNode;
    outerSx?: SxProps;
    innerSx?: SxProps;
}) => {
    return (
        <Stack sx={{ width: "100%", py: "2rem", alignItems: "center", ...outerSx }}>
            <Stack sx={{ width: "45rem", alignItems: "center", gap: "2rem", ...innerSx }}>
                {children}
            </Stack>
        </Stack>
    );
    
}

export default PageContainer;