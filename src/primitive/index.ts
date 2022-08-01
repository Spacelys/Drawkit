import {rect, CanvasBuilderPrimitiveRect} from './rect';
import {line, CanvasBuilderPrimitiveLine} from './line';
import {circle, CanvasBuilderPrimitiveCircle} from './circle';
import {polygon, CanvasBuilderPrimitivePolygon} from './polygon';

export interface CanvasBuilderPrimitive {
	clear: () => void;
	rect: () => CanvasBuilderPrimitiveRect;
	line: () => CanvasBuilderPrimitiveLine;
	circle: () => CanvasBuilderPrimitiveCircle;
	polygon: () => CanvasBuilderPrimitivePolygon;
}

export const primitive = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	identity: () => void,
): CanvasBuilderPrimitive => ({
	clear: () => {
		ctx.clearRect(0, 0, width, height);
	},
	rect: () => rect(ctx, undefined, identity),
	line: () => line(ctx, undefined, identity),
	circle: () => circle(ctx, undefined, identity),
	polygon: () => polygon(ctx, undefined, identity),
});
