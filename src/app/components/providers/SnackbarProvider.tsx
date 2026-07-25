"use client"

import React, { createContext, useContext, useState } from "react";
import SnackbarPopup from "../common/SnackbarPopup";

type Context = {
    openPopup: (text: string, startAdornment?: React.ReactNode) => void;
}

const initContext: Context = {
    openPopup: () => { return; }
}

const SnackbarContext = createContext<Context>(initContext);

const SnackbarProvider = ({children}: {children: React.ReactNode}) => {

    const [isSnackbarOpened, setIsSnackbarOpened] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [adornment, setAdornment] = useState<React.ReactNode>(null);

    const openPopup = (text: string, startAdornment?: React.ReactNode) => {
        setText(text);
        setAdornment(startAdornment);
        setIsSnackbarOpened(true);
    }

    const onClose = () => {
        setIsSnackbarOpened(false);
    }

    return (
        <SnackbarContext.Provider value={{ openPopup }}>
            <SnackbarPopup
                open={isSnackbarOpened}
                text={text}
                startComponent={adornment}
                onClose={onClose}
            />
            {children}
        </SnackbarContext.Provider>
    )
}

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);

    if (context === undefined) {
        throw Error("useSnackbarContext must be wrapped inside SnackbarProvider");
    }

    return context;
}

export default SnackbarProvider;