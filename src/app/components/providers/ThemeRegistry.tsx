"use client"

import { ThemeProvider } from "@mui/material";
import { themePalette } from "@/app/theme";

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={themePalette}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeRegistry;