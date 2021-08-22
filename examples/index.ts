import * as drawkit from "../src";

const ctx = drawkit.CanvasBuilder("#canvas");

// Utilties
const loadImage = (url: string): Promise<HTMLImageElement> => {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.src = url;
		return img;
	});
};

// Basic Rect
ctx.primitive().rect()
	.at(40, 40)
	.size(64, 64)
	.color('green')
	.border(2)
	.render();

// Basic Sprite
const drawSprite = async () => {
	try {
		const image = await loadImage('./assets/flower.png');

		ctx.draw(image).at(40, 120).flipped(true, true).render();
	} catch (err) {
		console.log('Error', err);
	}
};

drawSprite();