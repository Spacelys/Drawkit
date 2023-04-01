export interface CanvasBuilderImageTileset {
	rotated: (angle: number) => CanvasBuilderImageTileset;
	alpha: (a: number) => CanvasBuilderImageTileset;
	scaled: (x: number, y: number) => CanvasBuilderImageTileset;
	flipped: (x?: boolean, y?: boolean) => CanvasBuilderImageTileset;
	tileSize: (w: number, h: number) => CanvasBuilderImageTileset;
	render: (tilesetId: number, x: number, y: number) => void;
}

export interface TileSetProps {
	rot: number;
	alpha: number;
	scale: {
		x: number;
		y: number;
	};
	flipped: {
		x: boolean;
		y: boolean;
	};
	tileSize: {
		w: number;
		h: number;
	};
	size: {
		w: number;
		h: number;
	};
}

export const tileset = (
	img: HTMLImageElement,
	ctx: CanvasRenderingContext2D,
	props: TileSetProps = undefined,
	identity: () => void,
): CanvasBuilderImageTileset => {
	const prop = props || {
		rot: 0,
		alpha: 1,
		scale: { x: 1, y: 1 },
		flipped: { x: false, y: false },
		size: { w: img.width, h: img.height },
		tileSize: { w: 32, h: 32 },
	};

	const tileXCount = Math.floor(prop.size.w / prop.tileSize.w);
	const tilesetIdToPart = (tilesetId: number) => {
		const x = tilesetId % tileXCount;
		const y = Math.floor(tilesetId / tileXCount);

		return {
			x: x * prop.tileSize.w,
			y: y * prop.tileSize.h,
			w: prop.tileSize.w,
			h: prop.tileSize.h,
		};
	};

	return {
		rotated: (a: number) => {
			prop.rot = a;
			return tileset(img, ctx, prop, identity);
		},
		alpha: (a: number) => {
			prop.alpha = a;
			return tileset(img, ctx, prop, identity);
		},
		scaled: (x: number, y: number) => {
			prop.scale = { x, y };
			return tileset(img, ctx, prop, identity);
		},
		tileSize: (w: number, h: number) => {
			prop.tileSize.w = w;
			prop.tileSize.h = h;
			return tileset(img, ctx, prop, identity);
		},
		flipped: (x?: boolean, y?: boolean) => {
			prop.flipped.x = !!x;
			prop.flipped.y = !!y;
			return tileset(img, ctx, prop, identity);
		},
		render: (tilesetId: number, x: number, y: number) => {
			const { flipped, scale, tileSize, alpha } = prop;
			ctx.translate(x, y); // translated
			ctx.rotate(prop.rot * Math.PI / 180); // rotation about the origin
			ctx.scale(
				flipped.x ? -scale.x : scale.x,
				flipped.y ? -scale.y : scale.y
			);

			const part = tilesetIdToPart(tilesetId);
			ctx.globalAlpha = alpha;
			ctx.drawImage(img, part.x, part.y, part.w, part.h,
				flipped.x ? -tileSize.w : 0, flipped.y ? -tileSize.h : 0, tileSize.w, tileSize.h);
			ctx.globalAlpha = 1;

			identity(); // back to the identity
		},
	};
};
