import * as drawkit from "../src";

const ctx = drawkit.CanvasBuilder("#canvas", true);

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
	.at(40, 0)
	.size(64, 64)
	.color('red')
	.border(2)
	.render();

// Basic Rect
ctx.primitive().rect()
	.at(40, 64)
	.size(64, 64)
	.color('green')
	.border(2)
	.render();

ctx.primitive().rect()
	.at(40, 128)
	.size(64, 64)
	.color('blue')
	.border(2)
	.render();

ctx.text("Hello World").at(104, 128).size(20).color('black').baseline("bottom").render();

ctx.primitive().rect()
	.at(40, 192)
	.size(64, 64)
	.color('yellow')
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