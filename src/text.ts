export interface CanvasBuilderText {
	at: (x: number, y: number) => CanvasBuilderText;
	color: (color: string) => CanvasBuilderText;
	baseline: (bl: TextBaseline) => CanvasBuilderText;
	align: (bl: TextAlign) => CanvasBuilderText;
	size: (n: number) => CanvasBuilderText;
	render: () => void;
}

type TextBaseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
type TextAlign = 'left' | 'center' | 'right';
export interface TextProps {
	pos: {
		x: number;
		y: number;
	};
	textAlign: TextAlign;
	textBaseline: TextBaseline;
	size: number;
	color: string;
}

export const text = (
	msg: string,
	ctx: CanvasRenderingContext2D,
	props: TextProps = undefined
): CanvasBuilderText => {
	const prop = props || {
		pos: {x: 0, y: 0},
		size: 12,
		color: '#000000',
		textAlign: 'left',
		textBaseline: 'top',
	};

	return {
		at: (x: number, y: number): CanvasBuilderText => {
			prop.pos = {x, y};
			return text(msg, ctx, prop);
		},
		color: (color: string): CanvasBuilderText => {
			prop.color = color;
			return text(msg, ctx, prop);
		},
		baseline: (baseLine: TextBaseline): CanvasBuilderText => {
			prop.textBaseline = baseLine;
			return text(msg, ctx, props);
		},
		align: (align: TextAlign): CanvasBuilderText => {
			prop.textAlign = align;
			return text(msg, ctx, props);
		},
		size: (n: number): CanvasBuilderText => {
			prop.size = n;
			return text(msg, ctx, prop);
		},
		render: () => {
			ctx.textAlign = prop.textAlign;
			ctx.textBaseline = prop.textBaseline;
			ctx.font = `${prop.size}px Consolas`;
			ctx.textBaseline = 'top';
			ctx.fillStyle = prop.color;
			ctx.fillText(msg,
				prop.pos.x, prop.pos.y);
		},
	};
};
