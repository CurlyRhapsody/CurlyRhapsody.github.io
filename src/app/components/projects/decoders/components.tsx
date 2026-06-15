import { Button, styled, TextField } from "@mui/material"

export const ConvertButton = styled(Button)({
    padding: "0.5rem",
    minWidth: "7.5rem",
    width: "7.5rem",
    borderRadius: "0.5rem",
    fontSize: "1.25rem"
});

export const EncryptButton = styled(Button)({
    padding: "0.375rem 0.875rem",
    borderRadius: "0.5rem",
    maxWidth: "fit-content",
    minWidth: "unset",
    fontSize: "1rem",
});

export const StyledTextField = styled(TextField)({
    width: "100%",
    "& .MuiInputBase-root": {
        padding: "1rem",
        fontFamily: "monospace",
        fontSize: "1.25rem"
    },
})