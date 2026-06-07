"use client"

import React, { createContext, useContext, useRef, useState } from "react";
import { useEffect } from 'react';

export enum DiscountType {
    ABSOLUTE = "absolute",
    RELATIVE = "relative",
}

type Person = {
    name?: string;
    willSplit: boolean;
    individualCost?: number;
    needToPay?: number;
}

const defaultPeople: Person[] = [
    {
        name: "Alice",
        willSplit: true,
    },
    {
        name: "Bob",
        willSplit: true
    }
]

type Context = {
    people?: Person[];
    numParticipant?: number;
    totalCost?: number;
    servicePercentage?: number;
    remainder?: number;
    discount?: number;
    discountMode?: DiscountType;
    discountAppliesToService?: boolean;
    updatePerson: (personId: number, value: Partial<Person>) => void;
    adjustParticipantCount: (newNumber: number) => void;
    updateTotalCost: (newTotal?: number) => void;
    updateServicePercentage: (newServicePercentage?: number) => void;
    updateDiscount: (newDiscount?: number) => void;
    updateDiscountMode: (newDiscountMode: DiscountType) => void;
    updateDiscountAppliesToService: (newState: boolean) => void;
    calculate: () => void
}

const initContext: Context = {
    people: undefined,
    numParticipant: undefined,
    totalCost: undefined,
    servicePercentage: undefined,
    remainder: undefined,
    discount: undefined,
    discountMode: undefined,
    discountAppliesToService: undefined,
    updatePerson: () => { return; },
    adjustParticipantCount: () => { return; },
    updateTotalCost: () => { return; },
    updateServicePercentage: () => { return; },
    updateDiscount: () => { return; },
    updateDiscountMode: () => { return; },
    updateDiscountAppliesToService: () => { return; },
    calculate: () => { return; },
}


const MealSplitContext = createContext<Context>(initContext);

const MealSplitProvider = ({ children }: {children: React.ReactNode}) => {
    const [people, setPeople] = useState<Person[]>(defaultPeople);
    const [numParticipant, setNumParticipant] = useState<number>(2);
    const [servicePercentage, setServicePercentage] = useState<number | undefined>(undefined);
    const [totalCost, setTotalCost] = useState<number | undefined>(undefined);
    const [remainder, setRemainder] = useState<number | undefined>(undefined);
    const [discount, setDiscount] = useState<number | undefined>(undefined);
    const [discountMode, setDiscountMode] = useState<DiscountType>(DiscountType.RELATIVE);
    const [discountAppliesToService, setDiscountAppliesToService] = useState<boolean>(false);

    useEffect(() => {
        const newList: Person[] = Array(numParticipant).fill(() => ({ willSplit: true }))
        setPeople(newList);
    }, [numParticipant])

    const updatePerson = (personId: number, value: Partial<Person>) => {
        setPeople((oldData) => {

            const newData = [...oldData];

            if (personId >= 0 && personId < newData.length) {
                newData[personId] = { ...newData[personId], ...value }
            }

            return newData;
        });
    }

    const adjustParticipantCount = (newNumber: number) => { setNumParticipant(newNumber); }

    const updateTotalCost = (newTotal?: number) => { setTotalCost(newTotal); }
    const updateDiscount = (newDiscount?: number) => { setDiscount(newDiscount); }
    const updateDiscountMode = (newDiscountMode: DiscountType) => { setDiscountMode(newDiscountMode); }
    const updateServicePercentage = (newServicePercentage?: number) => { setServicePercentage(newServicePercentage); }
    const updateDiscountAppliesToService = (newState: boolean) => { setDiscountAppliesToService(newState); }

    const calculate = () => {

    }

    return (
        <MealSplitContext.Provider value={{
            people, numParticipant, totalCost, servicePercentage, remainder, discount, discountMode, discountAppliesToService,
            updatePerson, adjustParticipantCount,
            updateTotalCost, updateServicePercentage, updateDiscount, updateDiscountMode, updateDiscountAppliesToService, calculate
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