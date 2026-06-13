"use client"

import React, { createContext, useContext, useState } from "react";

export const decoderTabText = ["asciis", "alphabets", "encodes", "linear-cipher", "transposition", "vigenere", "polybius", "bacon", "morse", "image", "link-check"]

export enum DecodersTab {
    ASCIIS,
    ALPHABETS,
    ENCODES,
    LINEAR_CIPHERS,
    TRANSPOSITION,
    VIGENERE,
    POLYBIUS,
    BACON,
    MORSE,
    IMAGE,
    LINK_CHECK
}


type Context = {
    tab: DecodersTab;
    switchTab: (newTab: DecodersTab) => void;
}

const initContext: Context = {
    tab: DecodersTab.ASCIIS,
    switchTab: () => { return; }
}

const DecodersContext = createContext<Context>(initContext);

const DecodersProvider = ({ children }: {children: React.ReactNode}) => {

    const [activeTab, setActiveTab] = useState<DecodersTab>(DecodersTab.ASCIIS);

    return (
        <DecodersContext.Provider value={{
            tab: activeTab,
            switchTab: setActiveTab,
        }}>
            {children}
        </DecodersContext.Provider>
    )
}

export const useDecodersContext = () => {
    const context = useContext(DecodersContext);

    if (context === undefined) {
        throw Error("useDecodersContext must be wrapped inside DecodersProvider");
    }

    return context;
}

export default DecodersProvider;