import { MenuItem, Stack, styled } from "@mui/material";

export const ShadowedStack = styled(Stack)({
    boxShadow: "0.375rem 0.375rem 0.375rem -0.125px rgba(0,0,0,0.5);"
});

export const SidebarMenuItem = styled(MenuItem)({
    padding: "0.375rem 1rem",
    minHeight: "3rem"
});
