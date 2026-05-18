import { hsvaToHex, HsvColor, RgbaColor, RgbColor, rgbToHex } from "@uiw/react-color";
import { ColorVariations } from "../providers/ColorCalcProvider";

type CVDType = "protanopia" | "deuteranopia" | "tritanopia";

const colorBlindnessMatrices = {
	protanopia: [ // Red-Colorblindness
		17/30, 13/30, 0,
		7/12, 5/12, 0,
		0, 29/120, 91/120
	],
	deuteranopia: [ // Green-Colorblindness
		0.625, 0.375, 0,
		0.7,   0.3,   0,
		0,     0.3,   0.7
	],
	tritanopia: [ // Blue-Colorblindness
		0.95, 0.05, 0,
		0,    13/30, 17/30,
		0,    0.475,   0.525
	]
};

function linearise(val: number) {
	const c = val / 255;
	return val <= 0.4045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearise(val: number) {
	const c = val <= 0.0031308 ? 12.92 * val : 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
  	return Math.round(Math.max(0, Math.min(1, c)) * 255);
}

export function applyColorBlindness(rgb: RgbColor, type: CVDType): RgbColor {

	const { r, g, b } = rgb;

	const L = linearise(r);
	const M = linearise(g);
	const S = linearise(b);

	const mat = colorBlindnessMatrices[type];
	
	const newR = mat[0] * L + mat[1] * M + mat[2] * S;
	const newG = mat[3] * L + mat[4] * M + mat[5] * S;
	const newB = mat[6] * L + mat[7] * M + mat[8] * S;

	return ({
		r: delinearise(newR),
		g: delinearise(newG),
		b: delinearise(newB),
	})

}

export function getFullCB(rgb: RgbColor): RgbColor {

	const { r, g, b } = rgb;

	const grayscaleVal = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	const formalized = Math.round(Math.max(0, Math.min(255, grayscaleVal)));

	return { r: formalized, g: formalized, b: formalized }
}

export function calculateColorVariations(rgb: RgbColor, hsv: HsvColor): ColorVariations | undefined {

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

    const redCB = rgbToHex(applyColorBlindness(rgb, "protanopia")).toUpperCase();
    const greenCB = rgbToHex(applyColorBlindness(rgb, "deuteranopia")).toUpperCase();
    const blueCB = rgbToHex(applyColorBlindness(rgb, "tritanopia")).toUpperCase();
    const fullCB = rgbToHex(getFullCB(rgb)).toUpperCase();

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
}