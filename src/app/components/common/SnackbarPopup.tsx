import { Slide, SlideProps, Snackbar, Stack } from "@mui/material";
import { Body1 } from "../styled/text";

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}
  

const SnackbarPopup = ({ open, text, startComponent, onClose }: {
    open: boolean;
    text: string;
    startComponent?: React.ReactNode;
    onClose: () => void;
}) => {

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            slots={{ transition: SlideTransition }}
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            sx={{
                '&.MuiSnackbar-root': { top: "calc(var(--header-height) + 1rem)" },
            }}
        >
            <Stack
                direction="row"
                sx={{
                    gap: "1.25rem", borderRadius: "0.5rem", alignItems: "center",
                    background: "white", p: "1rem",
                    boxShadow: "0.125rem 0.125rem 0.25rem 0.125rem rgba(0,0,0,0.5)"
                }}
            >
                {startComponent}
                <Body1>{text}</Body1>
            </Stack>
        </Snackbar>
    )
}

export default SnackbarPopup;