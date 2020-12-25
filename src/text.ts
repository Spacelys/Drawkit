export interface CanvasBuilderText {
	at: (x: number, y: number) => CanvasBuilderText;
	color: (color: string) => CanvasBuilderText;
	size: (n: number) => CanvasBuilderText;
	go: () => void;
};

export const text = (
		msg: string, 
		ctx: CanvasRenderingContext2D, 
		props: any = null
	): CanvasBuilderText => {
    const prop = props || {
        pos: {x: 0, y: 0},
        size: 12,
        color: "#000000"
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
        size: (n: number): CanvasBuilderText => {
            prop.size = n;
            return text(msg, ctx, prop);
        },
        go: () => {
            ctx.font=`${prop.size}px Consolas`;
            ctx.fillStyle = prop.color;
            ctx.fillText(msg,
                prop.pos.x,prop.pos.y);
        }
    };
};
