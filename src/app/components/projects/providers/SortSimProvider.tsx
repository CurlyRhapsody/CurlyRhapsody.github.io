"use client"

import React, { createContext, useContext, useRef, useState } from "react";
import { useEffect } from 'react';
import { shuffleArray, sleep } from "../../utility/utils";
import { bubbleSort } from "../sort-sim/algorithms/BubbleSort";
import { insertionSort } from "../sort-sim/algorithms/InsertionSort";
import { selectionSort } from "../sort-sim/algorithms/SelectionSort";
import { cocktailSort } from "../sort-sim/algorithms/CocktailSort";

export type SortElement = {
    value: number;
    state: ElementState;
}

type Context = {
    array?: SortElement[];
    shufflePattern?: ShuffleMethod;
    sortAlgo?: SortMethod;
    numElements?: number;
    sortInterval?: number;
    isSorting?: boolean;
    isPaused?: boolean;
    shuffle: () => void;
    sort: () => void;
    togglePause: () => void;
    changeElementSettings: (newPattern: ShuffleMethod) => void;
    changeSortMethod: (newMethod: SortMethod) => void;
    setNumElements: (newElNum: number) => void;
    setSortInterval: (newInterval: number) => void;
}

export enum ElementState {
    NORMAL = "normal",
    COMPARING = "comparing",
    SWAPPING = "swapping",
    FINISHED = "finished",
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
    isSorting: undefined,
    isPaused: undefined,
    shuffle: () => { return; },
    sort: () => { return; },
    togglePause: () => { return; },
    changeElementSettings: () => { return; },
    changeSortMethod: () => { return; },
    setNumElements: () => { return; },
    setSortInterval: () => { return; },
}


const SortSimContext = createContext<Context>(initContext);

const SortSimProvider = ({ children }: {children: React.ReactNode}) => {

    const [array, setArray] = useState<SortElement[]>([]);
    const [shufflePattern, setShufflePattern] = useState<ShuffleMethod>(ShuffleMethod.INORDER);
    const [sortAlgo, setSortAlgo] = useState<SortMethod>(SortMethod.BUBBLE);
    const [numElements, setNumElements] = useState<number>(10);
    const [sortInterval, setSortInterval] = useState<number>(100);

    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const pauseRef = useRef<boolean>(false);
    const sortRef = useRef<boolean>(false);

    useEffect(() => {
        shuffle();
    }, [numElements, shufflePattern]);

    const changeElementSettings = (newPattern: ShuffleMethod) => {
        setShufflePattern(newPattern);
    }

    const changeSortMethod = (newMethod: SortMethod) => {
        setSortAlgo(newMethod);
    }

    const shuffle = () => {

        pauseRef.current = false;
        sortRef.current = false;
        setIsPaused(false);
        setIsSorting(false);

        if (shufflePattern === ShuffleMethod.INORDER) {
            const newArray = Array.from({ length: numElements }, (_, i) => ({
                value: i + 1,
                state: ElementState.NORMAL,
            }));
            setArray(shuffleArray<SortElement>(newArray));
        }
        if (shufflePattern === ShuffleMethod.WITH_REPEAT) {
            const result = [];
            let nextNum = 1;
            for (let i = 0; i < numElements; i++) {
                if (Math.random() < 0.2) {
                    result.push(({
                        value: nextNum,
                        state: ElementState.NORMAL,
                    }));
                } else {
                    result.push(({
                        value: nextNum++,
                        state: ElementState.NORMAL,
                    }));
                }
            }
            setArray(shuffleArray<SortElement>(result));
        }
    };

    const checkPause = async () => {
        while (pauseRef.current) {
            await sleep(100);
        }
    }

    const sort = async () => {

        if (isSorting) return;
        sortRef.current = true;
        setIsSorting(true);

        switch (sortAlgo) {
            case SortMethod.BUBBLE:
                await bubbleSort(array, sortInterval, setArray, checkPause);
                break;
            case SortMethod.INSERTION:
                await insertionSort(array, sortInterval, setArray, checkPause);
                break;
            case SortMethod.SELECTION:
                await selectionSort(array, sortInterval, setArray, checkPause);
                break;
            case SortMethod.COCKTAIL:
                await cocktailSort(array, sortInterval, setArray, checkPause);
                break;
            default:
                await bubbleSort(array, sortInterval, setArray, checkPause);
                break;
        }
        

        setIsSorting(false);
        sortRef.current = false;
    }

    const togglePause = () => {
        pauseRef.current = !pauseRef.current;
        setIsPaused(!isPaused)
    }

    return (
        <SortSimContext.Provider value={{
            array, shufflePattern,
            isPaused,
            isSorting,
            sortAlgo, numElements, sortInterval,
            shuffle, sort, togglePause,
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