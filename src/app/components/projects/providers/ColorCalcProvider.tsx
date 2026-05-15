"use client"

import { ColorResult, hexToHsva, hexToRgba, hsvaToHex, hsvaToRgba, HsvColor, rgbaToHsva, RgbColor, rgbToHex } from "@uiw/react-color";
import React, { createContext, useContext, useMemo, useState } from "react";

export type ColorPalette = {
    desc?: string;
    hex: string;
}

type CodeType = "HEX" | "RGB" | "HSV";

type Context = {
    hex?: string;
    rgb?: RgbColor;
    hsv?: HsvColor;
    shades?: ColorPalette[];
    tints?: ColorPalette[];
    setColor: (color: ColorResult) => void;
    onChangeCodeValue: (type: CodeType, value: string | Partial<RgbColor> | Partial<HsvColor>) => void;
}

const initContext: Context = {
    hex: undefined,
    rgb: undefined,
    hsv: undefined,
    shades: undefined,
    tints: undefined,
    setColor: () => { return; },
    onChangeCodeValue: () => { return; }
}

const ColorCalcContext = createContext<Context>(initContext);

const ColorCalcProvider = ({children}: {children: React.ReactNode}) => {

    const [hex, setHex] = useState<string>("1E90FF");
    const [rgb, setRgb] = useState<RgbColor>({ r: 30, g: 144, b: 255 });
    const [hsv, setHsv] = useState<HsvColor>({ h: 210, s: 88, v: 100 });

    const shades: ColorPalette[] = useMemo(() => {
        const list: ColorPalette[] = [];
        const { r, g, b } = rgb;

        for (let i = 0; i < 10; i++) {
            const factor = 1 - (i * 0.1);
            const newR = Math.round(r * factor);
            const newG = Math.round(g * factor);
            const newB = Math.round(b * factor);

            const finalHex = rgbToHex({ r: newR, g: newG, b: newB }).toUpperCase();

            list.push({
                desc: `-${i * 10}%`,
                hex: finalHex
            });
        }

        return list;
    }, [rgb.r, rgb.g, rgb.b])

    const tints: ColorPalette[] = useMemo(() => {
        const list: ColorPalette[] = [];
        const { r, g, b } = rgb;

        for (let i = 0; i < 10; i++) {
            const factor = i * 0.1;
            const newR = Math.round(r + (255 - r) * factor);
            const newG = Math.round(g + (255 - g) * factor);
            const newB = Math.round(b + (255 - b) * factor);

            const finalHex = rgbToHex({ r: newR, g: newG, b: newB }).toUpperCase();

            list.push({
                desc: `+${i * 10}%`,
                hex: finalHex
            });
        }

        return list;
    }, [rgb.r, rgb.g, rgb.b])
    
    const setColor = (color: ColorResult) => {
        const newHex = color.hex;
        const newRgb = color.rgb;
        const newHsv = color.hsv;
        
        setHex(newHex.slice(1).toUpperCase());
        setRgb(newRgb);
        setHsv(newHsv);
    }

    const onChangeCodeValue = (type: CodeType, val: string | Partial<RgbColor> | Partial<HsvColor>) => {
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

    return (
        <ColorCalcContext.Provider value={{
            hex, rgb, hsv,
            shades,
            tints,
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