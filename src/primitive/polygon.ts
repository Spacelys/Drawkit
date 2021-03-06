import {util} from "../util";

export interface CanvasBuilderPrimitivePolygon {
	at: (x: number, y: number) => CanvasBuilderPrimitivePolygon;
	rotated: (angle: number) => CanvasBuilderPrimitivePolygon;
	filled: (fill: boolean) => CanvasBuilderPrimitivePolygon;
	color: (color: string) => CanvasBuilderPrimitivePolygon;
	border: (n: number) => CanvasBuilderPrimitivePolygon;
	vertices: (verts: Array<{x: number, y: number}>) => CanvasBuilderPrimitivePolygon;
	go: () => void;
};

export const polygon = (ctx: CanvasRenderingContext2D, props: any = null): CanvasBuilderPrimitivePolygon => {
	const prop = props || {
		strokeColor: 'black',
		fillColor: util.color.random(),
		vertices: [],
		border: 1,
		filled: true,
		pos: {x: 0, y: 0},
		rot: 0,
		scale: {x: 1, y: 1},
		shift: {x: 0, y: 0}
	};

	return {
		at: (x: number, y: number) => {
			prop.pos = {x, y};
			return polygon(ctx, prop);
		},
		rotated: (angle: number) => {
			prop.rot = angle;
			return polygon(ctx, prop);
		},
		filled: (fill: boolean) => {
			prop.filled = fill;
			return polygon(ctx, prop);
		},
		color: (color: string) => {
			prop.fillColor = color;
			return polygon(ctx, prop);
		},
		border: (n: number) => {
			prop.border = n;
			return polygon(ctx, prop);
		},
		vertices: (verts: Array<{x: number, y: number}>) => {
			prop.vertices = verts;
			return polygon(ctx, prop);
		},
		go: () => {
			if(prop.vertices.length < 1) {
				throw("A polygon must have at least one vertices/point defined.");
			} else {
				ctx.lineWidth=prop.width;
				ctx.strokeStyle=prop.strokeColor;

				ctx.translate(prop.pos.x, prop.pos.y); // translated
				ctx.rotate(prop.rot * Math.PI / 180); // rotation about the origin
				ctx.translate(-prop.shift.x, -prop.shift.y); // origin/axis
				ctx.scale(prop.scale.x,	prop.scale.y);


				ctx.beginPath();
				ctx.moveTo(prop.vertices[0].x, prop.vertices[0].y);
				for(let i=1; i < prop.vertices.length; i++) {
					const v = prop.vertices[i];
					ctx.lineTo(v.x, v.y);
				}
				ctx.closePath();
				if(prop.filled) {
					ctx.fillStyle = prop.fillColor;
					ctx.fill();
				}
				if(prop.border > 0) {
					ctx.stroke();
				}

				ctx.setTransform(1, 0, 0, 1, 0, 0); // back to the identity
			}
		}
	};
};
