"use client"

import { ColorResult, hexToHsva, hexToRgba, hsvaToHex, hsvaToRgba, HsvColor, rgbaToHex, rgbaToHsva, RgbColor, rgbToHex } from "@uiw/react-color";
import React, { createContext, useContext, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { applyColorBlindness, calculateColorVariations, getFullCB } from "../color-calc/utils";

export type ColorPalette = {
    desc?: string;
    hex: string;
}

export type ColorVariations = {
    tints: ColorPalette[];
    shades: ColorPalette[];
    harmonies: {
        complementary: ColorPalette[];
        analogous: ColorPalette[];
        splitComplementary: ColorPalette[];
        triadic: ColorPalette[];
        tetradic: ColorPalette[];
        square: ColorPalette[];
    };
    colorblinds: {
        red: string;
        green: string;
        blue: string;
        full: string;
    };
}

type CodeType = "HEX" | "RGB" | "HSV";

type Context = {
    hex?: string;
    rgb?: RgbColor;
    hsv?: HsvColor;
    colorVariations?: ColorVariations;
    setColor: (color: ColorResult) => void;
    onChangeCodeValue: (type: CodeType, value: string | Partial<RgbColor> | Partial<HsvColor>) => void;
}

const initContext: Context = {
    hex: undefined,
    rgb: undefined,
    hsv: undefined,
    colorVariations: undefined,
    setColor: () => { return; },
    onChangeCodeValue: () => { return; }
}

const ColorCalcContext = createContext<Context>(initContext);

const ColorCalcProvider = ({ children }: {children: React.ReactNode}) => {

    const [hex, setHex] = useState<string>("1E90FF");
    const [rgb, setRgb] = useState<RgbColor>({ r: 30, g: 144, b: 255 });
    const [hsv, setHsv] = useState<HsvColor>({ h: 210, s: 88, v: 100 });
    
    // All change color functions are debounced to ~24fps to prevent devices become frying pan emulator
    const setColor = useDebounce(
        (color?: ColorResult) => {
            if (!color) return;
            const { hex: newHex, rgb: newRgb, hsv: newHsv } = color;
            
            setHex(newHex.slice(1).toUpperCase());
            setRgb(newRgb);
            setHsv(newHsv);
        }
    , 42);

    const onChangeCodeValue = useDebounce(
        (type: CodeType, val: string | Partial<RgbColor> | Partial<HsvColor>) => {
            switch (type) {
                case "HEX": 
                    if (/^[0-9A-F]{6}$/.test(val as string)) {
                        setHex(val as string);
                        setRgb(hexToRgba(val as string));
                        setHsv(hexToHsva(val as string));
                    }
                    break;
                case "RGB":
                    const newRgb = { ...rgb, ...(val as Partial<RgbColor>) };
                    setHex(rgbToHex(newRgb).slice(1).toUpperCase());
                    setRgb(newRgb);
                    setHsv(rgbaToHsva({ ...newRgb, a: 1 }));
                    break;
                case "HSV":
                    const newHsv = { ...hsv, ...(val as Partial<HsvColor>) };
                    setHex(hsvaToHex({ ...newHsv, a: 1 }).slice(1).toUpperCase());
                    setRgb(hsvaToRgba({ ...newHsv, a: 1 }));
                    setHsv(newHsv);
                    break;
            }
        }
    , 42);

    const colorVariations: ColorVariations | undefined = useMemo(
        () => calculateColorVariations(rgb, hsv), [hex]
    );

    return (
        <ColorCalcContext.Provider value={{
            hex, rgb, hsv,
            colorVariations,
            setColor,
            onChangeCodeValue,
        }}>
            {children}
        </ColorCalcContext.Provider>
    )
}

export const useColorCalcContext = () => {
    const context = useContext(ColorCalcContext);

    if (context === undefined) {
        throw Error("useRPSContext must be wrapped inside ColorCalcProvider");
    }

    return context;
}

export default ColorCalcProvider;