import { util } from '../util';

export interface CanvasBuilderPrimitivePolygon {
	at: (x: number, y: number) => CanvasBuilderPrimitivePolygon;
	rotated: (angle: number) => CanvasBuilderPrimitivePolygon;
	filled: (fill: boolean) => CanvasBuilderPrimitivePolygon;
	regular: (sides: number, size: number) => CanvasBuilderPrimitivePolygon;
	color: (color: string) => CanvasBuilderPrimitivePolygon;
	border: (n: number, color?: string) => CanvasBuilderPrimitivePolygon;
	vertices: (verts: Array<{ x: number; y: number }>) => CanvasBuilderPrimitivePolygon;
	render: () => void;
}

export interface PolygonProps {
	strokeColor: string;
	fillColor: string;
	lineWidth: number;
	vertices: Array<{ x: number; y: number }>;
	filled: boolean;
	pos: {
		x: number;
		y: number;
	};
	rot: number;
	scale: {
		x: number;
		y: number;
	};
	shift: {
		x: number;
		y: number;
	};
}

export const polygon = (
	ctx: CanvasRenderingContext2D,
	props: PolygonProps = undefined,
	identity: () => void,
): CanvasBuilderPrimitivePolygon => {
	const prop = props || {
		strokeColor: 'black',
		fillColor: util.color.random(),
		lineWidth: 1,
		vertices: [],
		filled: true,
		pos: { x: 0, y: 0 },
		rot: 0,
		scale: { x: 1, y: 1 },
		shift: { x: 0, y: 0 },
	};

	return {
		at: (x: number, y: number) => {
			prop.pos = { x, y };
			return polygon(ctx, prop, identity);
		},
		regular: (sides: number, size: number) => {
			const division = Array(sides).fill(0).map((_, i) => ((2 * Math.PI) / sides) * i);
			const verts = division.map(r => ({
				x: Math.cos(r) * size,
				y: Math.sin(r) * size,
			}));
			prop.vertices = verts;
			return polygon(ctx, prop, identity);
		},
		rotated: (angle: number) => {
			prop.rot = angle;
			return polygon(ctx, prop, identity);
		},
		filled: (fill: boolean) => {
			prop.filled = fill;
			return polygon(ctx, prop, identity);
		},
		color: (color: string) => {
			prop.fillColor = color;
			return polygon(ctx, prop, identity);
		},
		border: (n: number, color?: string) => {
			prop.lineWidth = n;
			if (color) {
				prop.strokeColor = color;
			}
			return polygon(ctx, prop, identity);
		},
		vertices: (verts: Array<{ x: number; y: number }>) => {
			prop.vertices = verts;
			return polygon(ctx, prop, identity);
		},
		render: () => {
			if (prop.vertices.length < 1) {
				throw new Error('A polygon must have at least one vertices/point defined.');
			} else {
				ctx.lineWidth = prop.lineWidth;
				ctx.strokeStyle = prop.strokeColor;

				ctx.translate(prop.pos.x, prop.pos.y); // translated
				ctx.rotate(prop.rot * Math.PI / 180); // rotation about the origin
				ctx.translate(-prop.shift.x, -prop.shift.y); // origin/axis
				ctx.scale(prop.scale.x, prop.scale.y);


				ctx.beginPath();
				ctx.moveTo(prop.vertices[0].x, prop.vertices[0].y);
				for (let i = 1; i < prop.vertices.length; i++) {
					const v = prop.vertices[i];
					ctx.lineTo(v.x, v.y);
				}
				ctx.closePath();
				if (prop.filled) {
					ctx.fillStyle = prop.fillColor;
					ctx.fill();
				}
				if (prop.lineWidth > 0) {
					ctx.stroke();
				}

				identity(); // back to the identity
			}
		},
	};
};
