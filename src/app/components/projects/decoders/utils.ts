/* ----- ASCII ----- */
export enum InitialTextType {
    PLAINTEXT,
    DECIMAL,
    BINARY,
    OCTAL,
    HEXADECIMAL,
}

type ASCIITextBlock = {
    plaintext: string,
    decimal: string,
    binary: string,
    octal: string,
    hexadecimal: string
}

export function textToPlain(originalText: string, initialType: InitialTextType) {
    switch (initialType) {
        case InitialTextType.PLAINTEXT:
            return originalText;
        case InitialTextType.BINARY:
            return originalText.split(" ").map(bin => String.fromCharCode(parseInt(bin, 2))).join("");
        case InitialTextType.OCTAL:
            return originalText.split(" ").map(oct => String.fromCharCode(parseInt(oct, 8))).join("");
        case InitialTextType.DECIMAL:
            return String.fromCharCode(...originalText.split(" ").map(Number));
        case InitialTextType.HEXADECIMAL:
            return originalText.split(" ").map(hex => String.fromCharCode(parseInt(hex, 16))).join("");
    }
}

export function encodePlaintext(plaintext: string): ASCIITextBlock {
    const binary = plaintext.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    const octal = plaintext.split("").map(char => char.charCodeAt(0).toString(8).padStart(3, "0")).join(" ");
    const decimal = plaintext.split("").map(char => char.charCodeAt(0)).join(" ");
    const hexadecimal = plaintext.split("").map(char => char.charCodeAt(0).toString(16).padStart(2, "0")).join(" ");

    return { plaintext, binary, octal, decimal, hexadecimal }
}

/* ----- Alphabet conversions ----- */
export const validA1Z26CodeRegex = /^(?:([A-Z])(?!.*\1)){26}$/;

export const defaultA1Z26 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const qwertyA1Z26 = "QWERTYUIOPASDFGHJKLZXCVBNM";

export enum InitialAlphaType {
    PLAINTEXT,
    A1Z26,
    T9PHONE,
}

type AlphaTextBlock = {
    plaintext: string,
    a1z26: string,
    t9: string,
}

const t9KeyMap: Record<string, string> = {
    "2": "ABC",
    "3": "DEF",
    "4": "GHI",
    "5": "JKL",
    "6": "MNO",
    "7": "PQRS",
    "8": "TUV",
    "9": "WXYZ",
    "0": " "
}

const t9TapsMap: Record<string, string> = {
    A: "2", B: "22", C: "222",
    D: "3", E: "33", F: "333",
    G: "4", H: "44", I: "444",
    J: "5", K: "55", L: "555",
    M: "6", N: "66", O: "666",
    P: "7", Q: "77", R: "777", S: "7777",
    T: "8", U: "88", V: "888",
    W: "9", X: "99", Y: "999", Z: "9999",
    " ": "0",
}

function convertPatternToCharMap(pattern: string) {
    const map: Record<number, string> = {};
    for (let i = 0; i < pattern.length; i++) {
        map[i+1] = pattern[i];
    }
    return map;
}

function convertPatternToIndexMap(pattern: string) {
    const map: Record<string, number> = {};
    for (let i = 0; i < pattern.length; i++) {
        map[pattern[i]] = i+1;
    }
    return map;
}

function a1z26ToPlaintext(src: string, pattern?: string): string {
    
    if (!pattern) return "";
    if (!validA1Z26CodeRegex.test(pattern)) pattern = defaultA1Z26;

    const map = convertPatternToCharMap(pattern);

    return src.trim().split(" ")
        .map((word) => 
                word.split("-")
                .map(num => map[parseInt(num)] || "")
                .join("")
        )
        .join(" ");
}

function t9PhoneToPlaintext(src: string): string {
    return src.split("-").map((token) => {
            const key = token[0];
            if (key === "0") return " ";
            const presses = token.length;
            const letterGroup = t9KeyMap[key];
            if (!letterGroup) return "";
            if (presses > letterGroup.length) return "";
            return letterGroup[presses - 1];
        })
        .join("");
}

function plaintextToA1Z26(src: string, pattern?: string): string {

    if (!pattern) return "";
    if (!validA1Z26CodeRegex.test(pattern)) pattern = defaultA1Z26;

    const map = convertPatternToIndexMap(pattern);

    return src.toUpperCase().split(" ")
        .map((word) =>
            word.split("")
            .map(char => map[char] ?? char)
            .join("-")
        )
        .join(" ");
}

function plaintextToT9(src: string): string {
    return src
        .toUpperCase()
        .split("")
        .map(char => t9TapsMap[char] ?? "")
        .join("-");
}

export function encodedAlphaToPlain(originalText: string, initialType: InitialAlphaType, a1z26Pattern?: string) {
    switch (initialType) {
        case InitialAlphaType.PLAINTEXT:
            return originalText;
        case InitialAlphaType.A1Z26:
            return a1z26ToPlaintext(originalText, a1z26Pattern);
        case InitialAlphaType.T9PHONE:
            return t9PhoneToPlaintext(originalText);
    }
}

export function encodeAlphabets(plaintext: string, a1z26Pattern: string): AlphaTextBlock {
    const a1z26 = plaintextToA1Z26(plaintext, a1z26Pattern);
    const t9 = plaintextToT9(plaintext);
    return { plaintext, a1z26, t9 };
}