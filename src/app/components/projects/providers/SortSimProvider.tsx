"use client"

import React, { createContext, useContext, useState } from "react";
import { useEffect } from 'react';
import { shuffleArray } from "../../utility/utils";

type Context = {
    array?: number[];
    shufflePattern?: ShuffleMethod;
    sortAlgo?: SortMethod;
    numElements?: number;
    sortInterval?: number;
    shuffle: () => void;
    sort: () => void;
    changeElementSettings: (newPattern: ShuffleMethod) => void;
    changeSortMethod: (newMethod: SortMethod) => void;
    setNumElements: (newElNum: number) => void;
    setSortInterval: (newInterval: number) => void;
}

export enum ShuffleMethod {
    INORDER = "inorder",
    WITH_REPEAT = "repeated"
}

export enum SortMethod {
    BUBBLE = "bubble",
    INSERTION = "insertion",
    SELECTION = "selection",
    COCKTAIL = "cocktail",
    MERGE = "merge",
    QUICK = "quick",
    COUNT = "count",
    RADIX_10 = "radix10",
    BOGO = "bogo"
}

const initContext: Context = {
    array: undefined,
    shufflePattern: undefined,
    sortAlgo: undefined,
    numElements: undefined,
    sortInterval: undefined,
    shuffle: () => { return; },
    sort: () => { return; },
    changeElementSettings: () => { return; },
    changeSortMethod: () => { return; },
    setNumElements: () => { return; },
    setSortInterval: () => { return; },
}


const SortSimContext = createContext<Context>(initContext);

const SortSimProvider = ({ children }: {children: React.ReactNode}) => {

    const [array, setArray] = useState<number[]>([]);
    const [shufflePattern, setShufflePattern] = useState<ShuffleMethod>(ShuffleMethod.INORDER);
    const [sortAlgo, setSortAlgo] = useState<SortMethod>(SortMethod.BUBBLE);
    const [numElements, setNumElements] = useState<number>(10);
    const [sortInterval, setSortInterval] = useState<number>(100);

    useEffect(() => {
        shuffle();
    }, [numElements, shufflePattern])

    const changeElementSettings = (newPattern: ShuffleMethod) => {
        setShufflePattern(newPattern);
    }

    const changeSortMethod = (newMethod: SortMethod) => {
        setSortAlgo(newMethod);
    }

    const shuffle = () => {
        if (shufflePattern === ShuffleMethod.INORDER) {
            const newArray = Array.from({ length: numElements }, (_, i) => i + 1);
            setArray(shuffleArray<number>(newArray));
        }
        if (shufflePattern === ShuffleMethod.WITH_REPEAT) {
            const result = [];
            let nextNum = 1;
            for (let i = 0; i < numElements; i++) {
                if (Math.random() < 0.2) {
                    result.push(nextNum);
                } else {
                    result.push(nextNum++);
                }
            }
            setArray(shuffleArray<number>(result));
        }
    };

    const sort = () => {}

    return (
        <SortSimContext.Provider value={{
            array, shufflePattern,
            sortAlgo, numElements, sortInterval,
            shuffle, sort,
            changeElementSettings,
            changeSortMethod,
            setNumElements,
            setSortInterval
        }}>
            {children}
        </SortSimContext.Provider>
    )
}

export const useSortSimContext = () => {
    const context = useContext(SortSimContext);

    if (context === undefined) {
        throw Error("useSortSimContext must be wrapped inside SortSimProvider");
    }

    return context;
}

export default SortSimProvider;