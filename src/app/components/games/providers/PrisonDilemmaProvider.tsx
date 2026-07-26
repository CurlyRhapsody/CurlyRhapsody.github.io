"use client"

import React, { createContext, useContext, useMemo, useState } from "react";
import { alwaysLose, alwaysWin, randomThrow, determineByLastThrow } from "../rps/rpsUtils";
import PrisonDilemmaContainer from '../containers/PrisonDilemmaContainer';

export enum PDStrategy {
    RANDOM
}

type PDSettings = {
    twoCoopGain: number,
    oneDefectProfit: number,
    oneDefectLoss: number,
    twoDefectGain: number,
    isPlayerControl: boolean,
    cpu1Strat?: PDStrategy,
    cpu2Strat: PDStrategy,
    totalRounds: number,
}

type Context = {
    cpu1Strat?: PDStrategy,
    cpu2Strat: PDStrategy,
    isSimulate: boolean,
    round: number;
    totalRounds: number;
    p1Score: number;
    p2Score: number;
    update: (settings: PDSettings) => void;
    action: (isDefect: boolean) => void;
    
}

const initContext: Context = {
    cpu1Strat: undefined,
    cpu2Strat: PDStrategy.RANDOM,
    isSimulate: false,
    round: 0,
    totalRounds: 10,
    p1Score: 0,
    p2Score: 0,
    update: () => { return; },
    action: () => { return; },
}

const PrisonDilemmaContext = createContext<Context>(initContext);

const PrisonDilemmaProvider = ({children}: {children: React.ReactNode}) => {

    return (
        <PrisonDilemmaContext.Provider value={{
            
        }}>
            {children}
        </PrisonDilemmaContext.Provider>
    )
}

export const usePrisonDilemmaContext = () => {
    const context = useContext(PrisonDilemmaContext);

    if (context === undefined) {
        throw Error("usePrisonDilemmaContext must be wrapped inside PrisonDilemmaProvider");
    }

    return context;
}

export default PrisonDilemmaProvider;