"use client"

import React, { createContext, useContext, useState } from "react";
import { Card, CardHandRank, Dice, DiceType, Rank, Suit } from "../casino-sim/types";
import { shuffleArray } from "../../utility/utils";
import { changeDiceTypeOfDice, evaluateHand, sortCards } from "../casino-sim/utils";

export const casinoTabText = ["poker", "coin-flip", "dice", "sic-bo", "mark-six", "routelette"]

export enum CasinoTab {
    POKER,
    FLIP_COIN,
    DICE,
    SIC_BO,
    MARK_SIX,
    ROUTELETTE
}

type Context = {
    tab: CasinoTab;
    drawnCards: (Card | undefined)[];
    hand?: CardHandRank;
    coins: boolean[];
    dice: Dice[];
    switchTab: (newTab: CasinoTab) => void;
    drawCards: () => void;
    flipCoins: () => void;
    addCoins: () => void;
    removeCoins: () => void;
    rollDice: () => void;
    addDice: () => void;
    changeDiceType: (index: number) => void;
    removeDice: (index: number) => void;
}

const initContext: Context = {
    tab: CasinoTab.POKER,
    drawnCards: [undefined, undefined, undefined, undefined, undefined],
    hand: undefined,
    coins: [],
    dice: [],
    switchTab: () => { return; },
    drawCards: () => { return; },
    flipCoins: () => { return; },
    addCoins: () => { return; },
    removeCoins: () => { return; },
    rollDice: () => { return; },
    addDice: () => { return; },
    changeDiceType: (index: number) => { return; },
    removeDice: (index: number) => { return; },
}

const CasinoSimContext = createContext<Context>(initContext);

const CasinoSimProvider = ({ children }: {children: React.ReactNode}) => {

    const [activeTab, setActiveTab] = useState<CasinoTab>(CasinoTab.POKER);

    const [cards, setCards] = useState<(Card | undefined)[]>([undefined, undefined, undefined, undefined, undefined]);
    const [hand, setHand] = useState<CardHandRank | undefined>(undefined);
    const [coins, setCoins] = useState<boolean[]>([true]); // true = Head, false = Tail

    const [dice, setDice] = useState<Dice[]>([{ type: DiceType.SIX, value: 3 }]);

    /* ----- Poker ----- */
    const drawCards = () => {
        setHand(undefined);
        const deck: Card[] = [];
        for (const suit of Object.values(Suit)) {
            for (const rank of Object.values(Rank).filter(v => typeof v === "number")) {
                deck.push({ suit, rank: rank as Rank });
            }
        }

        const resultHand = shuffleArray(deck).slice(0, 5).sort(sortCards);

        setCards(resultHand);
        setTimeout(() => setHand(evaluateHand(resultHand)), 300);
    }

    /* ----- Coin flip ----- */
    const flipCoins = () => {
        const numCoins = coins.length;
        const newResult = Array.from({ length: numCoins }, () => Math.random() >= 0.5);
        setCoins(newResult);
    }

    const addCoins = () => { setCoins([...coins, true]) }

    const removeCoins = () => { setCoins(coins.slice(0, -1)) }

    /* ----- Dice roll ----- */
    const rollDice = () => {
        const numDice = dice.length;
        const newResult = dice.map((die) => ({ type: die.type, value: Math.floor(Math.random() * die.type) + 1 }));
        setDice(newResult);
    }

    const addDice = () => { setDice([...dice, { type: DiceType.SIX, value: 1 }]) }

    const changeDiceType = (index: number) => {
        const newDiceList = changeDiceTypeOfDice(dice, index);
        setDice(newDiceList);
    }

    const removeDice = (index: number) => { setDice(dice.filter((_, i) => i !== index)); }

    return (
        <CasinoSimContext.Provider value={{
            tab: activeTab,
            drawnCards: cards,
            hand,
            coins,
            dice,
            switchTab: setActiveTab,
            drawCards,
            flipCoins,
            addCoins,
            removeCoins,
            rollDice,
            addDice,
            changeDiceType,
            removeDice,
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