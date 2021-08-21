import {util} from '../util';

export interface CanvasBuilderPrimitiveCircle {
	color: (color: string) => CanvasBuilderPrimitiveCircle;
	border: (n: number) => CanvasBuilderPrimitiveCircle;
	at: (x: number, y: number) => CanvasBuilderPrimitiveCircle;
	shifted: (dx: number, dy: number) => CanvasBuilderPrimitiveCircle;
	radius: (size: number) => CanvasBuilderPrimitiveCircle;
	scale: (sx: number, sy: number) => CanvasBuilderPrimitiveCircle;
	render: () => void;
}

export interface CircleProps {
	color: string;
	pos: {
		x: number;
		y: number;
	};
	radius: number;
	scale: {
		sx: number;
		sy: number;
	};
	shift: {
		dx: number;
		dy: number;
	};
	border: number;
}

export const circle = (
	ctx: CanvasRenderingContext2D,
	props: CircleProps = undefined
): CanvasBuilderPrimitiveCircle => {
	const prop = props || {
		color: util.color.random(),
		pos: {x: 0, y: 0},
		radius: 32,
		scale: {sx: 1, sy: 1},
		shift: {dx: 0, dy: 0},
		border: 0,
	};

	return {
		color: (color: string) => {
			prop.color = color;
			return circle(ctx, prop);
		},
		border: (n: number) => {
			prop.border = n;
			return circle(ctx, prop);
		},
		at: (x: number, y: number) => {
			prop.pos = {x, y};
			return circle(ctx, prop);
		},
		shifted: (dx: number, dy: number) => {
			prop.shift = {dx, dy};
			return circle(ctx, prop);
		},
		radius: (r: number) => {
			prop.radius = r;
			return circle(ctx, prop);
		},
		scale: (sx: number, sy: number) => {
			prop.scale = {sx, sy};
			return circle(ctx, prop);
		},
		render: () => {
			ctx.beginPath();
			ctx.fillStyle = prop.color;
			ctx.translate(prop.shift.dx - prop.scale.sx * prop.shift.dx,
				prop.shift.dy - prop.scale.sy * prop.shift.dy);
			ctx.scale(prop.scale.sx, prop.scale.sy);
			ctx.arc(prop.pos.x, prop.pos.y, prop.radius, 0, 2 * Math.PI);
			ctx.fill();

			if (prop.border > 0) {
				ctx.lineWidth = prop.border;
				ctx.beginPath();
				ctx.strokeStyle = 'black';
				ctx.arc(prop.pos.x, prop.pos.y, prop.radius, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.closePath();
			}

			ctx.setTransform(1, 0, 0, 1, 0, 0); // back to the identity
		},
	};
};

