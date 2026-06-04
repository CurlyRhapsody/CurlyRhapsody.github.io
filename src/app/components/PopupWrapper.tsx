import { Dialog, DialogProps, SxProps } from '@mui/material';

const PopupWrapper = ({ open, dialogProps, onClose, children }: {
    open: boolean;
    children: React.ReactNode;
    dialogProps?: SxProps;
    onClose?: () => void;
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
            onClose={onClose}
        >
            {children}
        </Dialog>
    )
}

export default PopupWrapper;