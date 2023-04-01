export interface CanvasBuilderText {
	at: (x: number, y: number) => CanvasBuilderText;
	color: (color: string) => CanvasBuilderText;
	fontName: (font: string) => CanvasBuilderText;
	baseline: (bl: TextBaseline) => CanvasBuilderText;
	align: (bl: TextAlign) => CanvasBuilderText;
	scale: (n: number) => CanvasBuilderText;
	size: (n: number) => CanvasBuilderText;
	getSize: () => { w: number; h: number };
	render: () => void;
}

type TextBaseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
type TextAlign = 'left' | 'center' | 'right';
export interface TextProps {
	pos: {
		x: number;
		y: number;
	};
	font: string;
	textAlign: TextAlign;
	textBaseline: TextBaseline;
	size: number;
	scale: number;
	color: string;
}

export const text = (
	msg: string,
	ctx: CanvasRenderingContext2D,
	props: TextProps = undefined,
	identity: () => void,
): CanvasBuilderText => {
	const prop = props || {
		pos: {x: 0, y: 0},
		size: 12,
		font: 'Courier New',
		color: '#000000',
		scale: 1,
		textAlign: 'left',
		textBaseline: 'top',
	};

	return {
		at: (x: number, y: number): CanvasBuilderText => {
			prop.pos = {x, y};
			return text(msg, ctx, prop, identity);
		},
		color: (color: string): CanvasBuilderText => {
			prop.color = color;
			return text(msg, ctx, prop, identity);
		},
		baseline: (baseLine: TextBaseline): CanvasBuilderText => {
			prop.textBaseline = baseLine;
			return text(msg, ctx, prop, identity);
		},
		align: (align: TextAlign): CanvasBuilderText => {
			prop.textAlign = align;
			return text(msg, ctx, prop, identity);
		},
		size: (n: number): CanvasBuilderText => {
			prop.size = n;
			return text(msg, ctx, prop, identity);
		},
		scale: (s: number): CanvasBuilderText => {
			prop.scale = s;
			return text(msg, ctx, prop, identity);
		},
		fontName: (font: string): CanvasBuilderText => {
			prop.font = font;
			return text(msg, ctx, prop, identity);
		},
		getSize: () => {
			ctx.textAlign = prop.textAlign;
			ctx.textBaseline = prop.textBaseline;
			ctx.font = `${prop.size}px ${prop.font}`;
			ctx.fillStyle = prop.color;
			const metrics = ctx.measureText(msg);
			return {
				w: Math.ceil(metrics.width),
				h: Math.ceil(metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent),
			};
		},
		render: () => {
			ctx.textAlign = prop.textAlign;
			ctx.textBaseline = prop.textBaseline;
			ctx.font = `${prop.size}px ${prop.font}`;
			ctx.fillStyle = prop.color;

			identity();
			ctx.translate(prop.pos.x, prop.pos.y); // translated
			ctx.scale(prop.scale, prop.scale);
			ctx.transform(1, 0, 0, ctx.getTransform().d, 0, 0);
			ctx.fillText(msg, 0, 0);
			identity();
		},
	};
};
