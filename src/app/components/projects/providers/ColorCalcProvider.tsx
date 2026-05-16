"use client"

import { ColorResult, hexToHsva, hexToRgba, hsvaToHex, hsvaToRgba, HsvColor, rgbaToHex, rgbaToHsva, RgbColor, rgbToHex } from "@uiw/react-color";
import React, { createContext, useContext, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { applyColorBlindness, getFullCB } from "../color-calc/colorBlindnessUtils";

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

    const colorVariations: ColorVariations | undefined = useMemo(() => {

        if (!rgb || !hsv) return undefined;

        const { r: red, g: green, b: blue } = rgb;
        const { h: hue, s: saturation, v: value } = hsv;

        const tints = [];
        const shades = [];

        // Tints
        for (let i = 0; i < 10; i++) {
            const factor = i * 0.1;
            const newR = Math.round(red + (255 - red) * factor);
            const newG = Math.round(green + (255 - green) * factor);
            const newB = Math.round(blue + (255 - blue) * factor);

            const finalHex = rgbToHex({ r: newR, g: newG, b: newB }).toUpperCase();

            shades.push({
                desc: `+${i * 10}%`,
                hex: finalHex
            });
        }

        // Shades
        for (let i = 0; i < 10; i++) {
            const factor = 1 - (i * 0.1);
            const newR = Math.round(red * factor);
            const newG = Math.round(green * factor);
            const newB = Math.round(blue * factor);

            const finalHex = rgbToHex({ r: newR, g: newG, b: newB }).toUpperCase();

            tints.push({
                desc: `-${i * 10}%`,
                hex: finalHex
            });
        }

        // Harmonies
        // Complementary
        const complementary = [
            { ...hsv, a: 1 },
            { h: (hue + 180) % 360, s: saturation, v: value, a: 1 }
        ].map((hsv) => ({ hex: hsvaToHex(hsv).toUpperCase() }));

        // Analogous
        const analogous = [
            { h: (hue + 330) % 360, s: saturation, v: value, a: 1 },
            { ...hsv, a: 1 },
            { h: (hue + 30) % 360, s: saturation, v: value, a: 1 },
        ].map((hsv) => ({ hex: hsvaToHex(hsv).toUpperCase() }));

        // Split Complementary
        const splitComplementary = [
            { h: (hue + 210) % 360, s: saturation, v: value, a: 1 },
            { ...hsv, a: 1 },
            { h: (hue + 150) % 360, s: saturation, v: value, a: 1 },
        ].map((hsv) => ({ hex: hsvaToHex(hsv).toUpperCase() }));

        // Triadic
        const triadic = [
            { ...hsv, a: 1 },
            { h: (hue + 120) % 360, s: saturation, v: value, a: 1 },
            { h: (hue + 240) % 360, s: saturation, v: value, a: 1 },
        ].map((hsv) => ({ hex: hsvaToHex(hsv).toUpperCase() }));

        // Tetradic
        const tetradic = [
            { ...hsv, a: 1 },
            { h: (hue + 60) % 360, s: saturation, v: value, a: 1 },
            { h: (hue + 180) % 360, s: saturation, v: value, a: 1 },
            { h: (hue + 240) % 360, s: saturation, v: value, a: 1 },
        ].map((hsv) => ({ hex: hsvaToHex(hsv).toUpperCase() }));
        
        // Square
        const square = [
            { ...hsv, a: 1 },
            { h: (hue + 90) % 360, s: saturation, v: value, a: 1 },
            { h: (hue + 180) % 360, s: saturation, v: value, a: 1 },
            { h: (hue + 270) % 360, s: saturation, v: value, a: 1 },
        ].map((hsv) => ({ hex: hsvaToHex(hsv).toUpperCase() }));

        const redCB = rgbaToHex(applyColorBlindness(rgb, "protanopia")).toUpperCase();
        const greenCB = rgbaToHex(applyColorBlindness(rgb, "deuteranopia")).toUpperCase();
        const blueCB = rgbaToHex(applyColorBlindness(rgb, "tritanopia")).toUpperCase();
        const fullCB = rgbaToHex(getFullCB(rgb)).toUpperCase();

        return ({
            tints,
            shades,
            harmonies: {
                complementary,
                analogous,
                splitComplementary,
                triadic,
                tetradic,
                square,
            },
            colorblinds: {
                red: redCB,
                green: greenCB,
                blue: blueCB,
                full: fullCB,
            }
        })

    }, [hex])

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