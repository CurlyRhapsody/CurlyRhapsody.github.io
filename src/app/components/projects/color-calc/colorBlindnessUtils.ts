import { RgbaColor, RgbColor } from "@uiw/react-color";

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

export function applyColorBlindness(rgb: RgbColor, type: CVDType): RgbaColor {

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
		a: 1
	})

}

export function getFullCB(rgb: RgbColor): RgbaColor {

	const { r, g, b } = rgb;

	const grayscaleVal = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	const formalized = Math.round(Math.max(0, Math.min(255, grayscaleVal)));

	return { r: formalized, g: formalized, b: formalized, a: 1 }
}