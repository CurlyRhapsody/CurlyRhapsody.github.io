/* ----- ASCII ----- */
export enum InitialTextType {
    PLAINTEXT,
    DECIMAL,
    BINARY,
    OCTAL,
    HEXADECIMAL,
}

type TextBlock = {
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

export function encodePlaintext(plaintext: string): TextBlock {
    const binary = plaintext.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    const octal = plaintext.split("").map(char => char.charCodeAt(0).toString(8).padStart(3, "0")).join(" ");
    const decimal = plaintext.split("").map(char => char.charCodeAt(0)).join(" ");
    const hexadecimal = plaintext.split("").map(char => char.charCodeAt(0).toString(16).padStart(2, "0")).join(" ");

    return { plaintext, binary, octal, decimal, hexadecimal }
}