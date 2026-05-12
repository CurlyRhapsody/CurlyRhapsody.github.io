"use client"

import React, { createContext, useContext, useMemo, useState } from "react";

export type RPSDifficulty = "EASY" | "NORMAL" | "HARD" | "IMPOSSIBLE"

export enum RPSPlayer {
    PLAYER = "PLAYER",
    CPU = "CPU"
}

export enum RPSThrows {
    ROCK,
    PAPER,
    SCISSIORS
}

type GameResultState = "WIN" | "LOSE" | "DRAW";

type Context = {
    totalGames: number;
    totalWins: number;
    totalLoses: number;
    totalDraws: number;
    difficulty: RPSDifficulty;
    resetStats: () => void;
    wrapup: (state: GameResultState) => void;
    switchDifficulty: (newDifficulty: RPSDifficulty) => void;
}

const initContext: Context = {
    totalGames: 0,
    totalWins: 0,
    totalLoses: 0,
    totalDraws: 0,
    difficulty: "NORMAL",
    resetStats: () => { return; },
    wrapup: () => { return; },
    switchDifficulty: () => { return; }
}

const RPSContext = createContext<Context>(initContext);

const RPSProvider = ({children}: {children: React.ReactNode}) => {

    const [wins, setWins] = useState<number>(0);
    const [loses, setLoses] = useState<number>(0);
    const [draws, setDraws] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<RPSDifficulty>("NORMAL");

    const totalGames = useMemo(() => (wins + loses + draws), [wins, loses, draws]);

    const resetStats = () => {
        setWins(0);
        setLoses(0);
        setDraws(0);
    }

    const switchDifficulty = (newDifficulty: RPSDifficulty) => {
        setDifficulty(newDifficulty);
    }

    const wrapup = (state: GameResultState) => {
        switch (state) {
            case "WIN":
                setWins(wins + 1);
                break;
            case "LOSE":
                setLoses(loses + 1);
                break;
            case "DRAW":
                setDraws(draws + 1);
                break;
            default: return;
        }
    }

    return (
        <RPSContext.Provider value={{
            totalGames,
            totalWins: wins,
            totalLoses: loses,
            totalDraws: draws,
            difficulty,
            resetStats,
            wrapup,
            switchDifficulty
        }}>
            {children}
        </RPSContext.Provider>
    )
}

export const useRPSContext = () => {
    const context = useContext(RPSContext);

    if (context === undefined) {
        throw Error("useRPSContext must be wrapped inside RPSProvider");
    }

    return context;
}

export default RPSProvider;