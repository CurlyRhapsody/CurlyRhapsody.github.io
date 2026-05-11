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
                root: { textTransform: "none" }
            }
        }
    }
})