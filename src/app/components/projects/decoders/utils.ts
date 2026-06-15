import { encode as base32Encode, decode as base32Decode } from "hi-base32";
import { encode as base85Encode, decode as base85Decode } from "base85"

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

/* ----- Encodings ----- */
export enum InitialEncodeType {
    PLAINTEXT,
    BASE32,
    BASE64,
    BASE85,
    URI_ENCODE,
    HTML_ESCAPE,
    UNICODE_16
}

type EncodeTextBlock = {
    plaintext: string,
    base32: string,
    base64: string,
    base85: string,
    uri: string,
    html: string,
    unicode16: string,
}

export function encodedTextToPlain(originalText: string, initialType: InitialEncodeType) {
    switch (initialType) {
        case InitialEncodeType.PLAINTEXT:
            return originalText;
        case InitialEncodeType.BASE32:
            return base32Decode(originalText);
        case InitialEncodeType.BASE64:
            return Buffer.from(originalText, "base64").toString("utf-8");
        case InitialEncodeType.BASE85:
            const buffer = base85Decode(originalText, "ascii85");
            if (buffer) return buffer.toString("utf-8");
            return "ERROR";
        case InitialEncodeType.URI_ENCODE:
            return decodeURIComponent(originalText);
        case InitialEncodeType.HTML_ESCAPE:
            const doc = new DOMParser().parseFromString(originalText, "text/html");
            return doc.documentElement.textContent;
        case InitialEncodeType.UNICODE_16:
            try {
                return originalText.replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) => {
                    return String.fromCharCode(parseInt(hex, 16));
                });
            } catch (error) {
                return "ERROR"
            }
    }
}

export function plainToEncodedText(plaintext: string): EncodeTextBlock {
    const base32 = base32Encode(plaintext);
    const base64 = Buffer.from(plaintext, "utf-8").toString("base64");
    const base85 = base85Encode(Buffer.from(plaintext, "utf-8"), "ascii85");
    const uri = encodeURIComponent(plaintext);
    const html = plaintext.split('').map(c => `&#${c.charCodeAt(0)};`).join('');
    const unicode16 = plaintext.split('').map(char => {
        const hex = char.charCodeAt(0).toString(16).toUpperCase();
        return '\\u' + hex.padStart(4, '0');
    }).join('');

    return { plaintext, base32, base64, base85, uri, html, unicode16 }
}

/* ----- Linear ----- */
export function encryptCaesar(plaintext: string, shift: number) {
    const normalizedShift = (shift % 26 + 26) % 26;

    return plaintext.replace(/[a-zA-Z]/g, (char) => {
        const charCode = char.charCodeAt(0);

        // Capital letters
        if (charCode >= 65 && charCode <= 90) {
            return String.fromCharCode((charCode - 65 + normalizedShift) % 26 + 65);
        }

        // Otherwise, it is lowercase
        return String.fromCharCode((charCode - 97 + normalizedShift) % 26 + 97);
    })
}

export function decryptCaesar(ciphertext: string, shift: number) {
    const normalizedShift = (shift % 26 + 26) % 26;

    return ciphertext.replace(/[a-zA-Z]/g, (char) => {
        const charCode = char.charCodeAt(0);

        // Capital letters
        if (charCode >= 65 && charCode <= 90) {
            return String.fromCharCode((charCode - 65 - normalizedShift + 26) % 26 + 65);
        }

        // Otherwise, it is lowercase
        return String.fromCharCode((charCode - 97 - normalizedShift + 26) % 26 + 97);
    })
}

// Helper for determine the slope is valid (Coprime with 26)
export function isCoprime(x: number): boolean {
    let target = 26;
    while (target > 0) {
        let temp = target;
        target = x % target;
        x = temp;
    }
    return x === 1;
}

// Find multiplicative inverse x mod 26 (Brute force is acceptable since 26 is small)
export function findInverse(x: number): number | null {
    for (let i = 1; i < 26; i++) {
        if ((x * i) % 26 === 1) return i;
    }
    return null;
}

export function encryptAffine(plaintext: string, factor: number, shift: number) {
    const normalizedShift = (shift % 26 + 26) % 26;

    return plaintext.replace(/[a-zA-Z]/g, (char) => {
        const charCode = char.charCodeAt(0);

        // Capital letters
        if (charCode >= 65 && charCode <= 90) {
            return String.fromCharCode((factor * (charCode - 65) + normalizedShift) % 26 + 65);
        }

        // Otherwise, it is lowercase
        return String.fromCharCode((factor * (charCode - 97) + normalizedShift) % 26 + 97);
    })
}

export function decryptAffine(ciphertext: string, factor: number, shift: number) {
    const normalizedShift = (shift % 26 + 26) % 26;
    const modInv = findInverse(factor);
    if (modInv === null) return ciphertext;

    return ciphertext.replace(/[a-zA-Z]/g, (char) => {
        const charCode = char.charCodeAt(0);

        // Capital letters
        if (charCode >= 65 && charCode <= 90) {
            return String.fromCharCode((modInv * (charCode - 65 - normalizedShift + 26)) % 26 + 65);
        }

        // Otherwise, it is lowercase
        return String.fromCharCode((modInv * (charCode - 97 - normalizedShift + 26)) % 26 + 97);
    })
}

/* ----- Transpositions ----- */
export function encryptRail(plaintext: string, numRails: number, offset: number): string {
    if (numRails === 1) return plaintext;

    const cycle = 2 * (numRails - 1);
    const fence = Array.from({ length: numRails }, () => [] as string[]);

    const n = plaintext.length;
    for (let i = 0; i < n; i++) {
        let phase = (i + offset) % cycle;

        let railAssignTo = phase < numRails ? phase : cycle - phase;

        fence[railAssignTo].push(plaintext[i]);
    }

    return fence.flat().join("");
}

export function decryptRail(ciphertext: string, numRails: number, offset: number): string {
    if (numRails === 1) return ciphertext;

    const cycle = 2 * (numRails - 1);
    const n = ciphertext.length;

    const grid = Array.from({ length: numRails }, () => new Array(n).fill(null));

    let charIdx = 0;
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            let phase = (c + offset) % cycle;
            let railAssignTo = phase < numRails ? phase : cycle - phase;

            if (railAssignTo === r) {
                grid[r][c] = ciphertext[charIdx++];
            }
        }
    }

    let plaintext = '';
    for (let c = 0; c < n; c++) {
        let phase = (c + offset) % cycle;
        let railAssignTo = phase < numRails ? phase : cycle - phase;
        plaintext += grid[railAssignTo][c];
    }

    return plaintext;
}

export function encryptColumn(plaintext: string, numColumns: number) {
    const padding = "*";

    const sLen = plaintext.length;
    const columnHeight = Math.ceil(sLen / numColumns);

    const newStr = Array(numColumns * columnHeight).fill(null);

    let curr = 0;
    for (let r = 0; r < columnHeight; r++) {
        for (let c = 0; c < numColumns; c++) {
            const pos = c * columnHeight + r;
            if (pos >= sLen) {
                newStr[curr] = padding;
            } else {
                newStr[curr] = plaintext[pos];
            }
            curr++;
        }
    }

    return newStr.join("");
}

export function decryptColumn(ciphertext: string, numColumns: number) {
    const padding = "*";

    const sLen = ciphertext.length;
    const columnHeight = Math.ceil(sLen / numColumns);

    let plaintext = '';
    for (let c = 0; c < numColumns; c++) {
        for (let r = 0; r < columnHeight; r++) {
            const char = ciphertext[r * numColumns + c];
            if (char !== padding) {
                plaintext += char;
            }
        }
    }

    return plaintext;
}

/* ----- Vigenere Cipher ----- */
export function encryptVigenere(plaintext: string, secret: string): string {

    let idx = 0;
    const secretLen = secret.length;
    return plaintext.replace(/[a-zA-Z]/g, (char) => {
        const charCode = char.charCodeAt(0);
        const charToUse = secret[(idx++) % secretLen];
        const shift = charToUse.charCodeAt(0) - 65;

        // Capital letters
        if (charCode >= 65 && charCode <= 90) {
            return String.fromCharCode((charCode - 65 + shift) % 26 + 65);
        }

        // Otherwise, it is lowercase
        return String.fromCharCode((charCode - 97 + shift) % 26 + 97);
    })
}

export function decryptVigenere(ciphertext: string, secret: string): string {

    let idx = 0;
    const secretLen = secret.length;
    return ciphertext.replace(/[a-zA-Z]/g, (char) => {
        const charCode = char.charCodeAt(0);
        const charToUse = secret[(idx++) % secretLen];
        const shift = charToUse.charCodeAt(0) - 65;

        // Capital letters
        if (charCode >= 65 && charCode <= 90) {
            return String.fromCharCode((charCode - 65 - shift + 26) % 26 + 65);
        }

        // Otherwise, it is lowercase
        return String.fromCharCode((charCode - 97 - shift + 26) % 26 + 97);
    })
}

/* ----- Polybius ----- */
// For deciphering
const polybiusDecipherGrid = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
];

// For ciphering
const polybiusCipherMap = new Map();
polybiusDecipherGrid.forEach((row, rowIndex) => {
    row.forEach((char, colIndex) => {
        polybiusCipherMap.set(char, `${rowIndex + 1}${colIndex + 1}`);
    });
});
polybiusCipherMap.set("J", "24");

export function encryptPolybius(plaintext: string) {
    return plaintext.split(" ").map((word) => 
        word.split("").map((char) => {
            return polybiusCipherMap.get(char);
        }).join("/")
    ).join(" ")
}

export function decryptPolybius(ciphertext: string) {
    return ciphertext.split(" ").map((word) => 
        word.split("/").map((code) => {
            if (code.length !== 2) return `[${code}]`;
            const row = Number(code[0]); const col = Number(code[1]);
            if (isNaN(row) || isNaN(col)) return `[${code}]`;
            if (row === 0 || row > 5 || col === 0 || col > 5) return `[${code}]`;
            return polybiusDecipherGrid[row-1][col-1];
        }).join("")
    ).join(" ")
}

/* ----- Bacon ----- */
export enum BaconMode {
    MODERN_26 = "modern",
    HISTORICAL_24 = "historical"
}

// Helper on creating decrypt map
function createBaconCipherMap(isDecrypt: boolean, mode: BaconMode) {
    const map = new Map();

    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    alphabets.forEach((char, index) => {
        let code;
        if (mode === BaconMode.MODERN_26) {
            code = index.toString(2).padStart(5, "0");
        } else {
            let adjustedIdx = index;
            if (char === "J") adjustedIdx = 8;
            if (char === "V") adjustedIdx = 20;

            if (adjustedIdx > 9) adjustedIdx--;
            if (adjustedIdx > 21) adjustedIdx--;

            code = adjustedIdx.toString(2).padStart(5, "0");
        }
        code = code.replace(/0/g, "a").replace(/1/g, "b");

        if (isDecrypt) {
            if (mode === BaconMode.HISTORICAL_24 && !map.has(code)) {
                map.set(code, char);
            }
        } else {
            map.set(char, code);
        }
    });

    return map;
}

const modern26BaconDecrypt = createBaconCipherMap(true, BaconMode.MODERN_26);
const historical24BaconDecrypt = createBaconCipherMap(true, BaconMode.HISTORICAL_24);
const modern26BaconEncrypt = createBaconCipherMap(false, BaconMode.MODERN_26);
const historical24BaconEncrypt = createBaconCipherMap(false, BaconMode.HISTORICAL_24);

export function encryptBacon(plaintext: string, mode: BaconMode) {
    return plaintext.split(" ").map((word) => 
        word.split("").map((char) => {
            if (mode === BaconMode.MODERN_26) {
                return modern26BaconEncrypt.get(char);
            } else if (mode === BaconMode.HISTORICAL_24) {
                return historical24BaconEncrypt.get(char);
            }
        }).join("/")
    ).join(" ")
}

export function decryptBacon(ciphertext: string, mode: BaconMode) {
    return ciphertext.split(" ").map((word) => 
        word.split("/").map((code) => {
            if (mode === BaconMode.MODERN_26) {
                return modern26BaconDecrypt.get(code) ?? `[${code}]`;
            } else if (mode === BaconMode.HISTORICAL_24) {
                return historical24BaconDecrypt.get(code) ?? `[${code}]`;
            }
        }).join("")
    ).join(" ")
}

/* ----- Morse code ----- */
const morseCodeEncryptMap = new Map([
    // Letters
    ['A', '.-'],    ['B', '-...'],  ['C', '-.-.'],  ['D', '-..'],
    ['E', '.'],     ['F', '..-.'],  ['G', '--.'],   ['H', '....'],
    ['I', '..'],    ['J', '.---'],  ['K', '-.-'],   ['L', '.-..'],
    ['M', '--'],    ['N', '-.'],    ['O', '---'],   ['P', '.--.'],
    ['Q', '--.-'],  ['R', '.-.'],   ['S', '...'],   ['T', '-'],
    ['U', '..-'],   ['V', '...-'],  ['W', '.--'],   ['X', '-..-'],
    ['Y', '-.--'],  ['Z', '--..'],
  
    // Numbers
    ['1', '.----'], ['2', '..---'], ['3', '...--'], ['4', '....-'],
    ['5', '.....'], ['6', '-....'], ['7', '--...'], ['8', '---..'],
    ['9', '----.'], ['0', '-----'],
  
    // Punctuation Marks
    ['.', '.-.-.-'], [',', '--..--'], ['?', '..--..'], ['!', '-.-.--'],
    [':', '---...'], [';', '-.-.-.'], ['-', '-....-'], ['/', '-..-.'],
    ['@', '.--.-.'], ["'", '.----.'], ['(', '-.--.'],  [')', '-.--.-'],
    ['=', '-...-']
]);

const morseCodeDecrtptMap = new Map(
    Array.from(morseCodeEncryptMap.entries()).map(([key, value]) => [value, key])
);

export function encryptMorse(plaintext: string) {
    return plaintext.split(" ").map((word) => 
        word.split("").map((char) => {
            return morseCodeEncryptMap.get(char)
        }).join(" ")
    ).join("/")
}

export function decryptMorse(ciphertext: string) {
    return ciphertext.split("/").map((word) => 
        word.split(" ").map((code) => {
            return morseCodeDecrtptMap.get(code)
        }).join("")
    ).join(" ")
}