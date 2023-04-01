export const util = {
	color: {
		random: (): string => {
			const r = util.int.random(0, 255);
			const g = util.int.random(0, 255);
			const b = util.int.random(0, 255);
			return `rgb(${r},${g},${b})`;
		},
	},
	int: {
		random: (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min),
	},
};
