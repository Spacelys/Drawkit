import {util} from '../util';

export interface CanvasBuilderPrimitiveRect {
	color: (color: string) => CanvasBuilderPrimitiveRect;
	filled: (fill: boolean) => CanvasBuilderPrimitiveRect;
	border: (size: number) => CanvasBuilderPrimitiveRect;
	at: (x: number, y: number) => CanvasBuilderPrimitiveRect;
	shifted: (dx: number, dy: number) => CanvasBuilderPrimitiveRect;
	size: (w: number, h: number) => CanvasBuilderPrimitiveRect;
	scale: (sx: number, sy: number) => CanvasBuilderPrimitiveRect;
	render: () => void;
};

export const rect = (ctx: CanvasRenderingContext2D, props: any = null): CanvasBuilderPrimitiveRect => {
        const prop = props || {
            color: util.color.random(),
            pos: {x: 0, y: 0},
            size: {w: 32, h: 32},
            scale: {sx: 1, sy: 1},
            shift: {dx: 0, dy: 0},
            border: 0,
            filled: true
        };

        return {
            color: (color: string) => {
                prop.color = color;
                return rect(ctx, prop);
            },
            filled: (fill: boolean) => {
                prop.filled = fill;
                return rect(ctx, prop);
            },
            border: (size: number) => {
                prop.border = size;
                return rect(ctx, prop);
            },
            at: (x: number, y: number) => {
                prop.pos = {x, y};
                return rect(ctx, prop);
            },
            shifted: (dx: number, dy: number) => {
                prop.shift = {dx, dy};
                return rect(ctx, prop);
            },
            size: (w: number, h: number) => {
                prop.size = {w, h};
                return rect(ctx, prop);
            },
            scale: (sx: number, sy: number) => {
                prop.scale = {sx, sy};
                return rect(ctx, prop);
            },
            render: () => {
                ctx.fillStyle = prop.color;
                ctx.translate(prop.shift.dx-prop.scale.sx*prop.shift.dx,
                    prop.shift.dy-prop.scale.sy*prop.shift.dy);
                ctx.scale(prop.scale.sx, prop.scale.sy);
                if(prop.filled) {
                    ctx.fillRect(prop.pos.x, prop.pos.y, prop.size.w, prop.size.h);
                }

                if(prop.border > 0) {
                    ctx.lineWidth=prop.border;
                    ctx.beginPath();
                    ctx.strokeStyle="black";
                    ctx.rect(prop.pos.x, prop.pos.y, prop.size.w, prop.size.h);
                    ctx.stroke();
                    ctx.closePath();
                }

                ctx.setTransform(1, 0, 0, 1, 0, 0); // back to the identity
            }
        };
    };

