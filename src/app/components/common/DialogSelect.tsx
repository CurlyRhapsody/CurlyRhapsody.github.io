import { InputAdornment, TextField } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DialogSelect = ({
    disabled = false,
    onOpen,
    value
}: {
    disabled?: boolean;
    onOpen: () => void;
    value: unknown;
}) => {

    return (
        <TextField
            disabled={disabled}
            value={value}
            onClick={onOpen}
            sx={{
                width: "30rem",
                cursor: `${disabled ? "default" : "pointer"} !important`,
                pointerEvents: `${disabled ? "none" : "unset"} !important`,
                "& *": {
                    cursor: "inherit !important",
                    pointerEvents: "interit !important",
                },
                "& .MuiInputBase-root": { pr: "0.875rem" },
                "& .MuiInputBase-input": {
                    p: "1rem 2rem 1rem 0.875rem",
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                    fontWeight: 400,
                }
            }}
            slotProps={{
                input: {
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            sx={{ ml: "0.5rem" }}
                        >
                            <ArrowDropDownIcon />
                        </InputAdornment>
                    ),
                }
            }}
        />
    )
}

export default DialogSelect;