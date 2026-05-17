"use client"

import React, { createContext, useContext, useState } from "react";
import { Card, Rank, Suit } from "../casino-sim/types";
import { shuffleArray } from "../../utility/utils";

export const casinoTabText = ["poker", "dice", "sic-bo", "mark-six", "routelette"]

export enum CasinoTab {
    POKER,
    DICE,
    SIC_BO,
    MARK_SIX,
    ROUTELETTE
}

type Context = {
    tab: CasinoTab;
    hand: (Card | undefined)[];
    switchTab: (newTab: CasinoTab) => void;
    drawCards: () => void;
}

const initContext: Context = {
    tab: CasinoTab.POKER,
    hand: [undefined, undefined, undefined, undefined, undefined],
    switchTab: () => { return; },
    drawCards: () => { return; },
}

const CasinoSimContext = createContext<Context>(initContext);

const CasinoSimProvider = ({ children }: {children: React.ReactNode}) => {

    const [activeTab, setActiveTab] = useState<CasinoTab>(CasinoTab.POKER);

    const [cards, setCards] = useState<(Card | undefined)[]>([undefined, undefined, undefined, undefined, undefined]);

    const drawCards = () => {
        const deck: Card[] = [];
        for (const suit of Object.values(Suit)) {
            for (const rank of Object.values(Rank).filter(v => typeof v === "number")) {
                deck.push({ suit, rank: rank as Rank });
            }
        }

        console.log(deck.length)

        setCards(shuffleArray(deck).slice(0, 5))
    }

    return (
        <CasinoSimContext.Provider value={{
            tab: activeTab,
            hand: cards,
            switchTab: setActiveTab,
            drawCards,
        }}>
            {children}
        </CasinoSimContext.Provider>
    )
}

export const useCasinoSimContext = () => {
    const context = useContext(CasinoSimContext);

    if (context === undefined) {
        throw Error("useCasinoSimContext must be wrapped inside CasinoSimProvider");
    }

    return context;
}

export default CasinoSimProvider;