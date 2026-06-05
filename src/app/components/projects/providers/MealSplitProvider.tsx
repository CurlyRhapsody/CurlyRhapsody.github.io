"use client"

import React, { createContext, useContext, useRef, useState } from "react";

enum DiscountType {
    ABSOLUTE = "absolute",
    RELATIVE = "relative",
}

type Person = {
    name: string;
    willSplit: boolean;
    individualCost?: number;
    needToPay?: number;
}

type Context = {
    people?: Person[];
    totalCost?: number;
    remainder?: number;
    discount?: number;
    discountMode?: DiscountType
    updatePerson: (personId: number, value: Partial<Person>) => void;
    addNewPerson: () => void;
    removePerson: (personId: number) => void;
    updateTotalCost: (newTotal: number) => void;
    updateDiscount: (newDiscount: number) => void;
    updateDiscountMode: (newDiscountMode: DiscountType) => void;
    calculate: () => void
}

const initContext: Context = {
    people: undefined,
    totalCost: undefined,
    remainder: undefined,
    discount: undefined,
    discountMode: undefined,
    updatePerson: () => { return; },
    addNewPerson: () => { return; },
    removePerson: () => { return; },
    updateTotalCost: () => { return; },
    updateDiscount: () => { return; },
    updateDiscountMode: () => { return; },
    calculate: () => { return; },
}


const MealSplitContext = createContext<Context>(initContext);

const MealSplitProvider = ({ children }: {children: React.ReactNode}) => {
    const [people, setPeople] = useState<Person[]>([]);
    const [totalCost, setTotalCost] = useState<number | undefined>(undefined);
    const [remainder, setRemainder] = useState<number | undefined>(undefined);
    const [discount, setDiscount] = useState<number | undefined>(undefined);
    const [discountMode, setDiscountMode] = useState<DiscountType>(DiscountType.RELATIVE);

    const updatePerson = (personId: number, value: Partial<Person>) => {
        setPeople((oldData) => {

            const newData = [...oldData];

            if (personId >= 0 && personId < newData.length) {
                newData[personId] = { ...newData[personId], ...value }
            }

            return newData;
        });
    }

    const addNewPerson = () => {
        setPeople((oldData) => {
            const newData = [...oldData];
            newData.push({
                name: "",
                willSplit: true,
                individualCost: undefined,
                needToPay: undefined
            })
            return newData;
        });
    }

    const removePerson = (personId: number) => {
        setPeople((oldData) => {
            const newData = [...oldData];
            newData.splice(personId, 1);
            return newData;
        });
    }

    const updateTotalCost = (newTotal: number) => { setTotalCost(newTotal) }
    const updateDiscount = (newDiscount: number) => { setDiscount(newDiscount) }
    const updateDiscountMode = (newDiscountMode: DiscountType) => { setDiscountMode(newDiscountMode) }

    const calculate = () => {

    }

    return (
        <MealSplitContext.Provider value={{
            people, totalCost, remainder, discount, discountMode,
            updatePerson, addNewPerson, removePerson,
            updateTotalCost, updateDiscount, updateDiscountMode, calculate
        }}>
            {children}
        </MealSplitContext.Provider>
    )
}

export const useMealSplitContext = () => {
    const context = useContext(MealSplitContext);

    if (context === undefined) {
        throw Error("useMealSplitContext must be wrapped inside MealSplitProvider");
    }

    return context;
}

export default MealSplitProvider;