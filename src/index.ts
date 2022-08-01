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

/**
 * Creates our context object to preform drawkit operations
 *
 * @param selector - HTML selector for your canvas element
 * @param cartesionMode - Allows to use cartesion coordinates, (this inverts rendered text)
 * @returns ICanvasBuilder
 */
export const CanvasBuilder = (selector: string, cartesionMode?: boolean): ICanvasBuilder => {
	const elem = document.querySelector<HTMLElement>(selector);
	const canvas = <HTMLCanvasElement> elem;
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
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
};
