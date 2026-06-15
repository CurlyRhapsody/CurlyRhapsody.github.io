"use client"

import React, { createContext, useContext, useState } from "react";

export enum DecodersTab {
    ASCIIS = "asciis",
    ALPHABETS = "alphabets",
    ENCODES = "encodes",
    MORSE = "morse",

    LINEAR_CIPHERS = "linear-cipher",
    TRANSPOSITION = "transposition",
    VIGENERE = "vigenere",
    POLYBIUS = "polybius",
    BACON = "bacon",

    IMAGE = "image",
    LINK_CHECK = "link-check"
}

export const toolList = [
    {
        title: "encodes",
        tools: [
            DecodersTab.ASCIIS,
            DecodersTab.ALPHABETS,
            DecodersTab.ENCODES,
            DecodersTab.MORSE
        ]
    },
    {
        title: "encrypts",
        tools: [
            DecodersTab.LINEAR_CIPHERS,
            DecodersTab.TRANSPOSITION,
            DecodersTab.VIGENERE,
            DecodersTab.POLYBIUS,
            DecodersTab.BACON
        ]
    },
    {
        title: "misc",
        tools: [
            DecodersTab.IMAGE,
            DecodersTab.LINK_CHECK,
        ]
    }
];


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