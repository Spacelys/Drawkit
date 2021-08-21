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

export const CanvasBuilder = (selector: string): ICanvasBuilder => {
	const elem = document.querySelector<HTMLElement>(selector);
	const canvas = <HTMLCanvasElement> elem;
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.globalCompositeOperation = 'source-over'; // default canvas
	return {
		parentElem: elem,
		draw: (img: HTMLImageElement) => draw(img, ctx),
		text: (msg: string) => text(msg, ctx),
		primitive: () => primitive(ctx, canvas.width, canvas.height),
		clear: () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		},
	};
};
