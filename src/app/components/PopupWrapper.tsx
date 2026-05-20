import { Dialog, SxProps } from '@mui/material';

const PopupWrapper = ({ open, dialogProps, children }: {
    open: boolean;
    children: React.ReactNode;
    dialogProps?: SxProps;
}) => {

    return (
        <Dialog
            open={open}
            slotProps={{
                paper: {
                    sx: {
                        p: "1rem",
                        borderRadius: "1rem",
                        mx: "1rem",
                        maxWidth: "45rem",
                        background: "#FFFFFF",
                        ...dialogProps
                    }
                }
            }}
        >
            {children}
        </Dialog>
    )
}

export default PopupWrapper;