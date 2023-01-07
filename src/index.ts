import {draw, CanvasBuilderImage} from './sprite';
import {primitive, CanvasBuilderPrimitive} from './primitive';
import {text, CanvasBuilderText} from './text';

export interface ICanvasBuilder {
	parentElem: HTMLElement;
	draw: (img: HTMLImageElement) => CanvasBuilderImage;
	text: (msg: string) => CanvasBuilderText;
	primitive: () => CanvasBuilderPrimitive;
	clear: () => void;
}

export {loadImage} from './ext';

interface Options {
	cartesionMode: boolean;
	highDpi: boolean;
	smoothing: boolean;
}

const defaultOptions: Options = {
	cartesionMode: false,
	highDpi: false,
	smoothing: false,
};

/**
 * Creates our context object to preform drawkit operations
 *
 * @param selector - HTML selector for your canvas element
 * @param cartesionMode - Allows to use cartesion coordinates, (this inverts rendered text)
 * @returns ICanvasBuilder
 */
export const CanvasBuilder = (selector: string, options = defaultOptions): ICanvasBuilder => {
	const elem = document.querySelector<HTMLElement>(selector);
	const canvas = <HTMLCanvasElement> elem;
	const { cartesionMode, highDpi, smoothing } = options;

	if (highDpi) {
		// Get the device pixel ratio, falling back to 1.
		const dpr = window.devicePixelRatio || 1;
		// Get the size of the canvas in CSS pixels.
		const rect = canvas.getBoundingClientRect();
		// Give the canvas pixel dimensions of their CSS
		// size * the device pixel ratio.
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		const ctx = canvas.getContext('2d');
		// Scale all drawing operations by the dpr, so you
		// don't have to worry about the difference.
		ctx.scale(dpr, dpr);
		// return ctx;
		ctx.imageSmoothingEnabled = smoothing;
		ctx.globalCompositeOperation = 'source-over'; // default canvas
		const identity = () => {
			if (cartesionMode) {
				ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
			} else {
				ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
		};
		identity();

		return {
			parentElem: elem,
			draw: (img: HTMLImageElement) => draw(img, ctx, undefined, identity),
			text: (msg: string) => text(msg, ctx, undefined, identity),
			primitive: () => primitive(ctx, canvas.width, canvas.height, identity),
			clear: () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			},
		};
	} else {
		const ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = smoothing;
		ctx.globalCompositeOperation = 'source-over'; // default canvas
		const identity = () => {
			if (cartesionMode) {
				ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
			} else {
				ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
		};
		identity();

		return {
			parentElem: elem,
			draw: (img: HTMLImageElement) => draw(img, ctx, undefined, identity),
			text: (msg: string) => text(msg, ctx, undefined, identity),
			primitive: () => primitive(ctx, canvas.width, canvas.height, identity),
			clear: () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			},
		};
	}
};
