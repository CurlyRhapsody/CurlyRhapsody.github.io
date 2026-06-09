import { Button, styled, TextField } from "@mui/material"

export const ConvertButton = styled(Button)({
    p: "0.5rem",
    minWidth: "7.5rem",
    width: "7.5rem",
    borderRadius: "0.5rem",
    fontSize: "1.25rem"
})

export const StyledTextField = styled(TextField)({
    width: "100%",
    "& .MuiInputBase-root": {
        p: "1rem",
        fontFamily: "monospace",
        fontSize: "1.25rem"
    },
})