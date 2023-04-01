interface RGB {
	r: number;
	g: number;
	b: number;
}

interface RGBW {
	r: number;
	g: number;
	b: number;
	w: number;
}

const toHtmlImageElement = (base64: string): HTMLImageElement => {
	const img = document.createElement('img');
	img.src = base64;
	return img;
};

const toNum = (color: RGB): number => color.r * 256 * 256 + color.g * 256 + color.b;
const fromNum = (color: number): RGB => {
	const b = color % 256;
	const g = Math.floor((color % (256 * 256)) / 256);
	const r = Math.floor(color / (256 * 256));
	return {
		r,
		g,
		b,
	};
};

export interface CanvasBuilderArtist {
	palette: () => Array<RGB>;
	weightedPalette: () => Array<RGBW>;
	toBase64: () => string;
	changePalette: (palletSwap: Array<{ from: RGB; to: RGB }>) => HTMLImageElement;
}

export const artist = (
	img: HTMLImageElement
): CanvasBuilderArtist => {
	const offscreen = document.createElement('canvas');
	offscreen.width = img.width;
	offscreen.height = img.height;
	const ctx = offscreen.getContext('2d');
	return {
		toBase64: () => {
			ctx.clearRect(0, 0, offscreen.width, offscreen.height);
			ctx.drawImage(img, 0, 0);
			return offscreen.toDataURL();
		},
		changePalette: (palletSwap: Array<{ from: RGB; to: RGB }>) => {
			const swap: Record<number, number> = {};
			palletSwap.forEach(p => {
				const from = toNum(p.from);
				const to = toNum(p.to);
				swap[from] = to;
			});
			ctx.clearRect(0, 0, offscreen.width, offscreen.height);
			ctx.drawImage(img, 0, 0);
			const pixels = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
			for (let y = 0; y < offscreen.height; y++) {
				for (let x = 0; x < offscreen.width; x++) {
					const i = (y * pixels.width + x) * 4;
					const r = pixels.data[i];
					const g = pixels.data[i + 1];
					const b = pixels.data[i + 2];
					const color = toNum({ r, g, b });
					if (swap[color] !== undefined) {
						const newColor = fromNum(swap[color]);
						pixels.data[i] = newColor.r;
						pixels.data[i + 1] = newColor.g;
						pixels.data[i + 2] = newColor.b;
					}
				}
			}

			ctx.putImageData(pixels, 0, 0);
			const base64 = offscreen.toDataURL();
			return toHtmlImageElement(base64);
		},
		palette: () => {
			ctx.clearRect(0, 0, offscreen.width, offscreen.height);
			ctx.drawImage(img, 0, 0);
			const pixels = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
			const pallet = new Set<string>();
			for (let i = 0; i < pixels.data.length; i += 4) {
				const r = pixels.data[i];
				const g = pixels.data[i + 1];
				const b = pixels.data[i + 2];
				const a = pixels.data[i + 3];
				if (a > 0) {
					const key = `${r},${g},${b}`;
					pallet.add(key);
				}
			}
			return Array.from(pallet).map(strgb => {
				const [r, g, b] = strgb.split(',');
				return {
					r: parseInt(r, 10),
					g: parseInt(g, 10),
					b: parseInt(b, 10),
				};
			});
		},
		weightedPalette: () => {
			ctx.clearRect(0, 0, offscreen.width, offscreen.height);
			ctx.drawImage(img, 0, 0);
			const pixels = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
			const pallet: Record<string, number> = {};
			let pixelCounts = 0;
			for (let i = 0; i < pixels.data.length; i += 4) {
				const r = pixels.data[i];
				const g = pixels.data[i + 1];
				const b = pixels.data[i + 2];
				const a = pixels.data[i + 3];
				const key = `${r},${g},${b}`;
				// if a === 0 that means its invisible, dont count it
				if (a > 0) {
					if (pallet[key] === undefined) {
						pallet[key] = 1;
						pixelCounts++;
					} else {
						pallet[key] += 1;
						pixelCounts++;
					}
				}
			}
			return Object.entries(pallet).map(([strgb, w]) => {
				const [r, g, b] = strgb.split(',');
				return {
					r: parseInt(r, 10),
					g: parseInt(g, 10),
					b: parseInt(b, 10),
					w: w / pixelCounts,
				};
			}).sort((a, b) => b.w - a.w);
		},
	};
};
