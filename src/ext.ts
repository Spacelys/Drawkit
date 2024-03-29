export const loadImage = (url: string): Promise<HTMLImageElement> => new Promise((resolve) => {
	const img = new Image();
	img.onload = () => resolve(img);
	img.src = url;
	return img;
});
