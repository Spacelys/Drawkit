export interface CanvasBuilderImage {
	at: (x: number, y: number) => CanvasBuilderImage;
	rotated: (angle: number) => CanvasBuilderImage;
	scaled: (x: number, y: number) => CanvasBuilderImage;
	shifted: (x: number, y: number) => CanvasBuilderImage;
	visible: (val: boolean) => CanvasBuilderImage;
	flipped: (x?: boolean, y?: boolean) => CanvasBuilderImage;
	sized: (w: number, h: number) => CanvasBuilderImage;
	part: (x: number, y: number, w: number, h: number) => CanvasBuilderImage;
	render: () => void;
}

export interface SpriteProps {
	pos: {
		x: number;
		y: number;
	};
	rot: number;
	shift: {
		x: number;
		y: number;
	};
	scale: {
		x: number;
		y: number;
	};
	flipped: {
		x: boolean;
		y: boolean;
	};
	part: {
		x: number;
		y: number;
		w: number;
		h: number;
	};
	size: {
		w: number;
		h: number;
	};
	visible: boolean;
}

export const draw = (
	img: HTMLImageElement,
	ctx: CanvasRenderingContext2D,
	props: SpriteProps = undefined,
	identity: () => void,
): CanvasBuilderImage => {
	const prop = props || {
		pos: {x: 0, y: 0},
		rot: 0,
		shift: {x: 0, y: 0},
		scale: {x: 1, y: 1},
		flipped: {x: false, y: false},
		part: {
			x: 0,
			y: 0,
			w: img.width,
			h: img.height,
		},
		size: {w: img.width, h: img.height},
		visible: true,
	};

	return {
		at: (x: number, y: number) => {
			prop.pos = {x, y};
			return draw(img, ctx, prop, identity);
		},
		rotated: (a: number) => {
			prop.rot = a;
			return draw(img, ctx, prop, identity);
		},
		scaled: (x: number, y: number) => {
			prop.scale = {x, y};
			return draw(img, ctx, prop, identity);
		},
		sized: (w: number, h: number) => {
			prop.size.w = w;
			prop.size.h = h;
			return draw(img, ctx, prop, identity);
		},
		flipped: (x?: boolean, y?: boolean) => {
			prop.flipped.x = !!x;
			prop.flipped.y = !!y;
			return draw(img, ctx, prop, identity);
		},
		shifted: (x: number, y: number) => {
			prop.shift = {x, y};
			return draw(img, ctx, prop, identity);
		},
		visible: (val: boolean) => {
			prop.visible = val;
			return draw(img, ctx, prop, identity);
		},
		part: (x: number, y: number, w: number, h: number) => {
			prop.part = {x, y, w, h};
			prop.size.w = w;
			prop.size.h = h;
			return draw(img, ctx, prop, identity);
		},
		render: () => {
			const {flipped, scale, size} = prop;
			if (prop.visible) {
				ctx.translate(prop.pos.x, prop.pos.y); // translated
				ctx.rotate(prop.rot * Math.PI / 180); // rotation about the origin
				ctx.translate(-prop.shift.x, -prop.shift.y); // origin/axis
				ctx.scale(
					flipped.x ? -scale.x : scale.x,
					flipped.y ? -scale.y : scale.y
				);

				ctx.drawImage(img, prop.part.x, prop.part.y, prop.part.w, prop.part.h,
					flipped.x ? -size.w : 0, flipped.y ? -size.h : 0, size.w, size.h);

				identity(); // back to the identity
			}
		},
	};
};
