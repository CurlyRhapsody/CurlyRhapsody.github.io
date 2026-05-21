import { MenuItem, Stack, styled } from "@mui/material";

export const ShadowedStack = styled(Stack)({
    boxShadow: "0.375rem 0.375rem 0.375rem -0.125px rgba(0,0,0,0.5);"
});

export const SidebarMenuItem = styled(MenuItem)({
    ['@media (max-width: 768px)']: {
        padding: "0.5rem 0 0.5rem 2rem"
    },
    ['@media (min-width: 768px)']: {
        padding: "0.375rem 1rem"
    },
    minHeight: "3rem"
});
