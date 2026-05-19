import { createTheme } from "@mui/material/styles";

export const themePalette = createTheme({
    palette: {
        primary: {
            main: "#1E90FF",
            light: "#349BFF",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { textTransform: "none" },
                startIcon: { marginLeft: "-0.25rem", marginRight: "0.5rem" }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: { textTransform: "none" }
            }
        }
    }
})