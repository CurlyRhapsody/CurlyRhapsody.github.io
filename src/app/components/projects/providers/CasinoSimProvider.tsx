"use client"

import React, { createContext, useContext, useState } from "react";
import { Card, CardHandRank, Dice, DiceType, Rank, Suit } from "../casino-sim/types";
import { shuffleArray } from "../../utility/utils";
import { changeDiceTypeOfDice, evaluateHand, sortCards, sortNMatchPrize } from "../casino-sim/utils";

export const casinoTabText = ["poker", "coin-flip", "dice", "sic-bo", "mark-six", "roulette"]

export enum CasinoTab {
    POKER,
    FLIP_COIN,
    DICE,
    SIC_BO,
    MARK_SIX,
    ROULETTE
}

type Context = {
    tab: CasinoTab;
    drawnCards: (Card | undefined)[];
    hand?: CardHandRank;
    coins: boolean[];
    dice: Dice[];
    sicBoDice: number[];
    markSixLottery: number[];
    markSixDrawn: number[];
    markSixPrize?: number;
    switchTab: (newTab: CasinoTab) => void;
    drawCards: () => void;
    flipCoins: () => void;
    addCoins: () => void;
    removeCoins: () => void;
    rollDice: () => void;
    addDice: () => void;
    changeDiceType: (index: number) => void;
    removeDice: (index: number) => void;
    rollSicBo: () => void;
    generateLottery: (lottery: number[]) => void;
    drawMarkSix: () => void;
    markSixReset: () => void;
}

const initContext: Context = {
    tab: CasinoTab.POKER,
    drawnCards: [undefined, undefined, undefined, undefined, undefined],
    hand: undefined,
    coins: [],
    dice: [],
    sicBoDice: [],
    markSixLottery: [],
    markSixDrawn: [],
    markSixPrize: undefined,
    switchTab: () => { return; },
    drawCards: () => { return; },
    flipCoins: () => { return; },
    addCoins: () => { return; },
    removeCoins: () => { return; },
    rollDice: () => { return; },
    addDice: () => { return; },
    changeDiceType: (index: number) => { return; },
    removeDice: (index: number) => { return; },
    rollSicBo: () => { return; },
    generateLottery: (lottery: number[]) => { return; },
    drawMarkSix: () => { return; },
    markSixReset: () => { return; },
}

const CasinoSimContext = createContext<Context>(initContext);

const CasinoSimProvider = ({ children }: {children: React.ReactNode}) => {

    const [activeTab, setActiveTab] = useState<CasinoTab>(CasinoTab.POKER);

    const [cards, setCards] = useState<(Card | undefined)[]>([undefined, undefined, undefined, undefined, undefined]);
    const [hand, setHand] = useState<CardHandRank | undefined>(undefined);
    const [coins, setCoins] = useState<boolean[]>([true]); // true = Head, false = Tail

    const [dice, setDice] = useState<Dice[]>([{ type: DiceType.SIX, value: 3 }]);
    const [sicBoDice, setSicBoDice] = useState<number[]>([1, 1, 1]);

    const [markSixLottery, setMarkSixLottery] = useState<number[]>([]);
    const [markSixDrawn, setMarkSixDrawn] = useState<number[]>([]);
    const [markSixPrize, setMarkSixPrize] = useState<number | undefined>(undefined);

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
        const newResult = dice.map((die) => ({ type: die.type, value: Math.floor(Math.random() * die.type) + 1 }));
        setDice(newResult);
    }

    const addDice = () => { setDice([...dice, { type: DiceType.SIX, value: 1 }]) }

    const changeDiceType = (index: number) => {
        const newDiceList = changeDiceTypeOfDice(dice, index);
        setDice(newDiceList);
    }

    const removeDice = (index: number) => { setDice(dice.filter((_, i) => i !== index)); }

    /* ----- Sic Bo ----- */
    const rollSicBo = () => {
        const newResult = [...Array(3)].map((_) => (Math.floor(Math.random() * 6) + 1));
        setSicBoDice(newResult);
    }

    /* ----- Mark Six ----- */
    const generateLottery = (lottery: number[]) => setMarkSixLottery(lottery.sort((a, b) => a - b));

    const drawMarkSix = () => {
        const numbers = Array.from({length: 49}, (_, i) => i + 1);

        const result = shuffleArray(numbers).slice(0, 7);

        setMarkSixDrawn(result);
        setTimeout(() => {
            const { sorted, prize } = sortNMatchPrize(markSixLottery, result);
            setMarkSixDrawn(sorted);
            setMarkSixPrize(prize);
        }, 9000)
    }

    const markSixReset = () => {
        setMarkSixLottery([]);
        setMarkSixDrawn([]);
        setMarkSixPrize(undefined);
    }

    return (
        <CasinoSimContext.Provider value={{
            tab: activeTab,
            drawnCards: cards,
            hand,
            coins,
            dice,
            sicBoDice,
            markSixLottery,
            markSixDrawn,
            markSixPrize,
            switchTab: setActiveTab,
            drawCards,
            flipCoins,
            addCoins,
            removeCoins,
            rollDice,
            addDice,
            changeDiceType,
            removeDice,
            rollSicBo,
            generateLottery,
            drawMarkSix,
            markSixReset,
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