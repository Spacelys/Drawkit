import {util} from '../util';

export interface CanvasBuilderPrimitiveCircle {
	color: (color: string) => CanvasBuilderPrimitiveCircle;
	border: (n: number, color?: string) => CanvasBuilderPrimitiveCircle;
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
	borderColor: string;
}

export const circle = (
	ctx: CanvasRenderingContext2D,
	props: CircleProps = undefined,
	identity: () => void,
): CanvasBuilderPrimitiveCircle => {
	const prop = props || {
		color: util.color.random(),
		pos: {x: 0, y: 0},
		radius: 32,
		scale: {sx: 1, sy: 1},
		shift: {dx: 0, dy: 0},
		border: 0,
		borderColor: 'black',
	};

	return {
		color: (color: string) => {
			prop.color = color;
			return circle(ctx, prop, identity);
		},
		border: (n: number, color?: string) => {
			prop.border = n;
			if (color) {
				prop.borderColor = color;
			}
			return circle(ctx, prop, identity);
		},
		at: (x: number, y: number) => {
			prop.pos = {x, y};
			return circle(ctx, prop, identity);
		},
		shifted: (dx: number, dy: number) => {
			prop.shift = {dx, dy};
			return circle(ctx, prop, identity);
		},
		radius: (r: number) => {
			prop.radius = r;
			return circle(ctx, prop, identity);
		},
		scale: (sx: number, sy: number) => {
			prop.scale = {sx, sy};
			return circle(ctx, prop, identity);
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
				ctx.strokeStyle = prop.borderColor;
				ctx.arc(prop.pos.x, prop.pos.y, prop.radius, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.closePath();
			}

			identity(); // back to the identity
		},
	};
};

