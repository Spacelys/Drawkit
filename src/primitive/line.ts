export interface CanvasBuilderPrimitiveLine {
	color: (color: string) => CanvasBuilderPrimitiveLine;
	width: (n: number) => CanvasBuilderPrimitiveLine;
	shift: (x: number, y: number) => CanvasBuilderPrimitiveLine;
	start: (x: number, y: number) => CanvasBuilderPrimitiveLine;
	end: (x: number, y: number) => CanvasBuilderPrimitiveLine;
	render: () => void;
}

export interface LineProps {
	color: string;
	start: {
		x: number;
		y: number;
	};
	end: {
		x: number;
		y: number;
	};
	offset: {
		x: number;
		y: number;
	};
	width: number;
}

export const line = (
	ctx: CanvasRenderingContext2D,
	props: LineProps = undefined
): CanvasBuilderPrimitiveLine => {
	const prop = props || {
		color: 'black',
		start: {x: 0, y: 0},
		end: {x: 32, y: 32},
		offset: {x: 0, y: 0},
		width: 1,
	};

	return {
		color: (color: string) => {
			prop.color = color;
			return line(ctx, prop);
		},
		width: (n: number) => {
			prop.width = n;
			return line(ctx, prop);
		},
		shift: (x: number, y: number) => {
			prop.offset = {x, y};
			return line(ctx, prop);
		},
		start: (x: number, y: number) => {
			prop.start = {x, y};
			return line(ctx, prop);
		},
		end: (x: number, y: number) => {
			prop.end = {x, y};
			return line(ctx, prop);
		},
		render: () => {
			ctx.lineWidth = prop.width;
			ctx.strokeStyle = prop.color;
			ctx.beginPath();
			ctx.moveTo(prop.start.x + prop.offset.x, prop.start.y + prop.offset.y);
			ctx.lineTo(prop.end.x + prop.offset.x, prop.end.y + prop.offset.y);
			ctx.stroke();
		},
	};
};
