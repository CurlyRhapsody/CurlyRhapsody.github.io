"use client"

import React, { createContext, useContext, useState } from "react";

type Context = {
    array?: number[];
    shuffle: () => void;
    sort: () => void;
}

enum ShuffleMethod {
    INORDER,
    WITH_REPEAT
}

enum SortMethod {
    BUBBLE = "bubble",
    INSERTION = "insertion",
    SELECTION = "selection",
    COCKTAIL = "cocktail",
    MERGE = "merge",
    QUICK = "quick",
    COUNT = "count",
    RADIX_10 = "radix",
    BOGO = "bogo"
}

const initContext: Context = {
    array: undefined,
    shuffle: () => { return; },
    sort: () => { return; },
}

const SortSimContext = createContext<Context>(initContext);

const SortSimProvider = ({ children }: {children: React.ReactNode}) => {

    const [array, setArray] = useState<number[]>([]);
    const [shufflePattern, setShufflePattern] = useState<ShuffleMethod>(ShuffleMethod.INORDER);
    const [sortAlgo, setSortAlgo] = useState<SortMethod>(SortMethod.BUBBLE);

    const shuffle = () => {};

    const sort = () => {}

    return (
        <SortSimContext.Provider value={{
            array, shuffle, sort
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