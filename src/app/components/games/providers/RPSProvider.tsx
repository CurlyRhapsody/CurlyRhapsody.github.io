"use client"

import React, { createContext, useContext, useMemo, useState } from "react";
import { alwaysLose, alwaysWin, randomThrow, determineByLastThrow } from "../rps/rpsUtils";

export type RPSDifficulty = "EASY" | "NORMAL" | "HARD" | "IMPOSSIBLE"

export enum RPSPlayer {
    PLAYER = "PLAYER",
    CPU = "CPU"
}

export enum RPSThrows {
    ROCK,
    PAPER,
    SCISSORS
}

type GameResultState = "WIN" | "LOSE" | "DRAW";

type Context = {
    playerThrow?: RPSThrows,
    cpuThrow?: RPSThrows,
    gameState?: GameResultState,
    totalGames: number;
    totalWins: number;
    totalLoses: number;
    totalDraws: number;
    difficulty: RPSDifficulty;
    mapThrowToHand: (hand: RPSThrows) => string;
    resetStats: () => void;
    makeThrow: (gesture: RPSThrows) => void;
    switchDifficulty: (newDifficulty: RPSDifficulty) => void;
}

const initContext: Context = {
    playerThrow: undefined,
    cpuThrow: undefined,
    gameState: undefined,
    totalGames: 0,
    totalWins: 0,
    totalLoses: 0,
    totalDraws: 0,
    difficulty: "NORMAL",
    mapThrowToHand: (hand: RPSThrows) => { return ""; },
    resetStats: () => { return; },
    makeThrow: () => { return; },
    switchDifficulty: () => { return; }
}

const RPSContext = createContext<Context>(initContext);

const RPSProvider = ({children}: {children: React.ReactNode}) => {

    const [wins, setWins] = useState<number>(0);
    const [loses, setLoses] = useState<number>(0);
    const [draws, setDraws] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<RPSDifficulty>("NORMAL");

    const [playerThrow, setPlayerThrow] = useState<RPSThrows | undefined>(undefined);
    const [cpuThrow, setCpuThrow] = useState<RPSThrows | undefined>(undefined);
    const [gameState, setGameState] = useState<GameResultState | undefined>(undefined);

    // [0] = player, [1] = CPU
    const [lastThrows, setLastThrows] = useState<(RPSThrows | undefined)[]>([undefined, undefined]);

    const totalGames = useMemo(() => (wins + loses + draws), [wins, loses, draws]);

    const mapThrowToHand = (hand: RPSThrows): string => {

        switch (hand) {
            case RPSThrows.ROCK: return "✊";
            case RPSThrows.PAPER: return "🤚";
            case RPSThrows.SCISSORS: return "✌️";
        }
    }

    const resetStats = () => {
        setWins(0);
        setLoses(0);
        setDraws(0);
        setPlayerThrow(undefined);
        setCpuThrow(undefined);
        setLastThrows([undefined, undefined]);
    }

    const switchDifficulty = (newDifficulty: RPSDifficulty) => {
        setDifficulty(newDifficulty);
        resetStats();
    }

    const makeThrow = (gesture: RPSThrows) => {
        setPlayerThrow(gesture);
        determineCPUThrow(gesture);
    }

    const determineCPUThrow = (playerThrow: RPSThrows) => {
        let cpuPlay;
        switch (difficulty) {
            case "EASY":
                cpuPlay = alwaysWin(playerThrow);
                setCpuThrow(cpuPlay);
                break;
            case "NORMAL":
                cpuPlay = randomThrow();
                setCpuThrow(cpuPlay);
                break;
            case "HARD":
                const [playerLastThrow, cpuLastThrow] = lastThrows;
                cpuPlay = determineByLastThrow(playerLastThrow, cpuLastThrow);
                setLastThrows([playerThrow, cpuPlay]);
                setCpuThrow(cpuPlay);
                break;
            case "IMPOSSIBLE":
                cpuPlay = alwaysLose(playerThrow)
                setCpuThrow(cpuPlay);
        }
        const winState: GameResultState = ((playerThrow: RPSThrows, cpuPlay: RPSThrows) => {
            const state = (playerThrow - cpuPlay + 4) % 3 - 1;
            switch (state) {
                case -1: return "LOSE";
                case 1: return "WIN";
                case 0: return "DRAW";
                default: return "DRAW";
            }
        })(playerThrow, cpuPlay);

        wrapup(winState);
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
        setGameState(state);
        setTimeout(() => setGameState(undefined), 1000);
    }

    return (
        <RPSContext.Provider value={{
            playerThrow,
            cpuThrow,
            gameState,
            totalGames,
            totalWins: wins,
            totalLoses: loses,
            totalDraws: draws,
            difficulty,
            mapThrowToHand,
            resetStats,
            makeThrow,
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