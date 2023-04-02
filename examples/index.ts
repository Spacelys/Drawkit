import * as drawkit from "../src";

const ctx = drawkit.CanvasBuilder("#canvas", {
	cartesionMode: false,
	highDpi: true,
	smoothing: false
});

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
		const image = await loadImage(require('./assets/flower.png'));

		ctx.draw(image).at(40, 120).flipped(true, true).render();
	} catch (err) {
		console.log('Error', err);
	}
};

// Basic Tileset
const drawTileset = async () => {
	try {
		const image = await loadImage(require('./assets/tileset.png'));
		for (let i = 0; i < 32; i++) {
			// render first 32 tiles
			ctx.draw(image).tileset().tileSize(16, 16).scaled(2, 2).render(i, i * 32, 0);
		}
	} catch (err) {
		console.log('Error', err);
	}
};

// Regular Poplygon
ctx.primitive().polygon()
	.regular(6, 50)
	.at(300, 100)
	.rotated(60)
	.border(3, 'green')
	.filled(true)
	.color('blue').render();

drawSprite();
drawTileset();