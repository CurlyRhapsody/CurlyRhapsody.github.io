import { Stack, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Body1 } from "../../styled/text";
import { HsvColor, RgbColor } from "@uiw/react-color";

const NumberSlot = styled(TextField) ({
    "& .MuiInputBase-input": { padding: "0.5rem" },
    borderRadius: "0.5rem",
    width: "4rem",
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        display: 'none'
     },
    '& input[type=number]': {
        MozAppearance: 'textfield'
    },
})

export const HexTextField = ({ hex, setColor }: {
    hex?: string;
    setColor: Function;
}) => {
    const [hexText, setHexText] = useState(hex);

    useEffect(() => {
        setHexText(hex);
    }, [hex])

    return (
        <Stack direction="row" sx={{ gap: "0.5rem", alignItems: "center" }}>
            <Body1 sx={{ mr: "1.5rem" }}>HEX</Body1>
            <Body1>#</Body1>
            <TextField
                sx={{
                    "& .MuiInputBase-input": { padding: "0.5rem" },
                    borderRadius: "0.5rem",
                    width: "4.75rem"
                }}
                value={hexText}
                slotProps={{ htmlInput: { maxLength: 6 } }}
                onChange={(e) => {
                    const rawValue = e.target.value;

                    const sanitized = rawValue
                        .replace(/[^0-9A-Fa-f]/g, '')
                        .toUpperCase();
                    
                    setHexText(sanitized);
                    setColor("HEX", sanitized);
                }}
            />
        </Stack>
    )
}

export const RgbTextField = ({ rgb, setColor }: {
    rgb?: RgbColor;
    setColor: Function;
}) => {
    const { r, g, b } = rgb ?? {};

    const [red, setRed] = useState(r);
    const [green, setGreen] = useState(g);
    const [blue, setBlue] = useState(b);

    useEffect(() => {
        setRed(r);
    }, [r])

    useEffect(() => {
        setGreen(g);
    }, [g])

    useEffect(() => {
        setBlue(b);
    }, [b])

    return (
        <Stack direction="row" sx={{ gap: "0.5rem", alignItems: "center" }}>
            <Body1 sx={{ mr: "1rem" }}>RGB</Body1>
            <Body1 sx={{ ml: "0.5rem" }}>R</Body1>
            <NumberSlot
                inputMode="numeric"
                type="number"
                value={red}
                slotProps={{ htmlInput: { max: 255, min: 0 } }}
                onChange={(e) => {
                    const rawValue = e.target.value;

                    const filtered = Number(rawValue.replace(/[^0-9]/g, ''));
                    const sanitized = Math.min(filtered, 255);
                    setRed(sanitized);
                    setColor("RGB", { r: sanitized });
                }}
            />
            <Body1 sx={{ ml: "1.5rem" }}>G</Body1>
            <NumberSlot
                inputMode="numeric"
                type="number"
                value={green}
                slotProps={{ htmlInput: { max: 255, min: 0 } }}
                onChange={(e) => {
                    const rawValue = e.target.value;

                    const filtered = Number(rawValue.replace(/[^0-9]/g, ''));
                    const sanitized = Math.min(filtered, 255);
                    setGreen(sanitized);
                    setColor("RGB", { g: sanitized });
                }}
            />
            <Body1 sx={{ ml: "1.75rem" }}>B</Body1>
            <NumberSlot
                inputMode="numeric"
                type="number"
                value={blue}
                slotProps={{ htmlInput: { max: 255, min: 0 } }}
                onChange={(e) => {
                    const rawValue = e.target.value;

                    const filtered = Number(rawValue.replace(/[^0-9]/g, ''));
                    const sanitized = Math.min(filtered, 255);
                    setBlue(sanitized);
                    setColor("RGB", { b: sanitized });
                }}
            />
        </Stack>
    )
}

export const HsvTextField = ({ hsv, setColor }: {
    hsv?: HsvColor;
    setColor: Function;
}) => {
    const { h, s, v } = hsv ?? {};

    const [hue, setHue] = useState(h);
    const [saturation, setSaturation] = useState(s);
    const [value, setValue] = useState(v);

    useEffect(() => {
        setHue(h);
    }, [h])

    useEffect(() => {
        setSaturation(s);
    }, [s])

    useEffect(() => {
        setValue(v);
    }, [v])

    return (
        <Stack direction="row" sx={{ gap: "0.5rem", alignItems: "center" }}>
            <Body1 sx={{ mr: "1rem" }}>HSV</Body1>
            <Body1 sx={{ ml: "0.5rem" }}>H</Body1>
            <NumberSlot
                inputMode="numeric"
                type="number"
                value={hue}
                slotProps={{ htmlInput: { max: 360, min: 0 } }}
                onChange={(e) => {
                    const rawValue = e.target.value;

                    const filtered = Number(rawValue.replace(/[^0-9\.]/g, ''));
                    const sanitized = Math.min(filtered, 360);
                    setHue(sanitized);
                    setColor("HSV", { h: sanitized });
                }}
            />
            <Body1>°</Body1>
            <Body1 sx={{ ml: "0.5rem" }}>S</Body1>
            <NumberSlot
                inputMode="numeric"
                type="number"
                value={saturation}
                slotProps={{ htmlInput: { max: 100, min: 0 } }}
                onChange={(e) => {
                    const rawValue = e.target.value;

                    const filtered = Number(rawValue.replace(/[^0-9\.]/g, ''));
                    const sanitized = Math.min(filtered, 100);
                    setSaturation(sanitized);
                    setColor("HSV", { s: sanitized });
                }}
            />
            <Body1>%</Body1>
            <Body1 sx={{ ml: "0.5rem" }}>V</Body1>
            <NumberSlot
                inputMode="numeric"
                type="number"
                value={value}
                slotProps={{ htmlInput: { max: 100, min: 0 } }}
                onChange={(e) => {
                    const rawValue = e.target.value;

                    const filtered = Number(rawValue.replace(/[^0-9\.]/g, ''));
                    const sanitized = Math.min(filtered, 100);
                    setValue(sanitized);
                    setColor("HSV", { v: sanitized });
                }}
            />
            <Body1>%</Body1>
        </Stack>
    )
}