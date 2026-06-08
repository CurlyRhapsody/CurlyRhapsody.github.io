"use client"

import React, { createContext, useContext, useRef, useState } from "react";
import { useEffect } from 'react';

export enum MealSplitErrorType {
    TOTAL_COST_MISSING = "TOTAL_COST_MISSING",
    NO_ONE_SPLITS = "NO_ONE_SPLITS",
    IC_EXCEED_TOTAL = "IC_EXCEED_TOTAL",
}

export enum DiscountType {
    ABSOLUTE = "absolute",
    RELATIVE = "relative",
}

type Person = {
    name?: string;
    willSplit: boolean;
    individualCost?: number;
    adjustedIC?: number;
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
    basePay?: number;
    servicePercentage?: number;
    remainder?: number;
    discount?: number;
    discountMode?: DiscountType;
    discountAppliesToService?: boolean;
    error?: MealSplitErrorType;
    updatePerson: (personId: number, value: Partial<Person>) => void;
    adjustParticipantCount: (newNumber: number) => void;
    updateTotalCost: (newTotal?: number) => void;
    updateServicePercentage: (newServicePercentage?: number) => void;
    updateDiscount: (newDiscount?: number) => void;
    updateDiscountMode: (newDiscountMode: DiscountType) => void;
    updateDiscountAppliesToService: (newState: boolean) => void;
    calculate: () => boolean;
}

const initContext: Context = {
    people: undefined,
    numParticipant: undefined,
    totalCost: undefined,
    basePay: undefined,
    servicePercentage: undefined,
    remainder: undefined,
    discount: undefined,
    discountMode: undefined,
    discountAppliesToService: undefined,
    error: undefined,
    updatePerson: () => { return; },
    adjustParticipantCount: () => { return; },
    updateTotalCost: () => { return; },
    updateServicePercentage: () => { return; },
    updateDiscount: () => { return; },
    updateDiscountMode: () => { return; },
    updateDiscountAppliesToService: () => { return; },
    calculate: () => { return false; },
}


const MealSplitContext = createContext<Context>(initContext);

const MealSplitProvider = ({ children }: {children: React.ReactNode}) => {
    const [people, setPeople] = useState<Person[]>(defaultPeople);
    const [numParticipant, setNumParticipant] = useState<number>(2);
    const [servicePercentage, setServicePercentage] = useState<number | undefined>(undefined);
    const [totalCost, setTotalCost] = useState<number | undefined>(undefined);
    const [basePay, setBasePay] = useState<number>(0);
    const [remainder, setRemainder] = useState<number | undefined>(undefined);
    const [discount, setDiscount] = useState<number | undefined>(undefined);
    const [discountMode, setDiscountMode] = useState<DiscountType>(DiscountType.RELATIVE);
    const [discountAppliesToService, setDiscountAppliesToService] = useState<boolean>(false);

    const [error, setError] = useState<MealSplitErrorType | undefined>(undefined);

    const isFirst = useRef<boolean>(true);

    useEffect(() => {

        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        const newList: Person[] = Array(numParticipant).fill({ name: "", willSplit: true });
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

    const calculate = (): boolean => {

        setError(undefined);

        if (!totalCost) {
            setError(MealSplitErrorType.TOTAL_COST_MISSING);
            return false;
        }

        // 1. Get all adjusted individual item cost
        let individualTotals = 0;
        let numSplitters = 0;
        const newList: Person[] = people.map((person) => {

            // If not participate in split, return directly, their IC will split among others.
            if (!person.willSplit) return person;

            numSplitters++;

            let adjustedIC: number = (person.individualCost ?? 0) * ((100 + (servicePercentage ?? 0)) / 100);
            if (!!discount && discount !== undefined) {
                if (discountMode === DiscountType.RELATIVE) {
                    if (discountAppliesToService) {
                        adjustedIC *= ((100 - discount) / 100);
                    } else {
                        adjustedIC -= ((person.individualCost ?? 0) * (discount / 100));
                    }
                }
            }
            adjustedIC = +adjustedIC.toFixed(2);

            individualTotals += adjustedIC;

            return ({
                ...person,
                adjustedIC: adjustedIC
            })
        })

        if (numSplitters === 0) {
            setError(MealSplitErrorType.NO_ONE_SPLITS);
            return false;
        }

        if (individualTotals > (totalCost ?? 0)) {
            setError(MealSplitErrorType.IC_EXCEED_TOTAL);
            return false;
        }

        // 2. Calculate the base (How much every people who joined the split has to pay)
        const baseSplitCost: number = +(((totalCost ?? 0) - individualTotals) / numSplitters).toFixed(2);
        setBasePay(baseSplitCost);

        // 3. Calculate how much each participant has to pay
        let splittedTotal = 0;

        const calculatedList = newList.map((person) => {

            // If not splitting, need to pay $0
            if (!person.willSplit) {
                return ({
                    ...person,
                    needToPay: 0,
                })
            }

            const charge: number = +(baseSplitCost + (person.adjustedIC ?? 0)).toFixed(2);
            splittedTotal += charge;

            return ({
                ...person,
                needToPay: charge,
            })
        })

        setPeople(calculatedList);
        setRemainder(+((totalCost ?? 0) - splittedTotal).toFixed(3));
        return true;
    }

    return (
        <MealSplitContext.Provider value={{
            people, numParticipant, totalCost, basePay, servicePercentage, remainder, discount, discountMode, discountAppliesToService, error,
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