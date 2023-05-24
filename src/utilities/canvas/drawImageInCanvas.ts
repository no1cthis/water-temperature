export const drawImageInCavas = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  const context = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  if (context) context.drawImage(image, 0, 0);
};
