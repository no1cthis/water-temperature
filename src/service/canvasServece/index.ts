import { HSLToRGBA } from "../../utilities/color/HSLToRGBA";
import { numberToHSLColorRange } from "../../utilities/color/numberToHSLColorRange";

const drawTemperatureMap = (
  temperatureData: Uint8Array,
  canvas: HTMLCanvasElement
) => {
  const context = canvas.getContext("2d");
  if (!context) return;

  const BINARY_DIMENSION_X = 36000;
  const DIMENSION_Y = 17999;
  const oldPixels = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  ).data;

  const width = canvas.width;
  const height = canvas.height;
  const pixels = new Uint8ClampedArray(width * height * 4); //width * height *[r g b a]
  let arrayIndex;
  let pixelsIndex = 0;

  for (let y = DIMENSION_Y; y > 0; y -= 10) {
    for (let x = 0; x < BINARY_DIMENSION_X; x += 10) {
      arrayIndex = y * BINARY_DIMENSION_X + x;

      const HSLValue = numberToHSLColorRange(temperatureData[arrayIndex]);

      if (
        temperatureData[arrayIndex] === 255 ||
        temperatureData[arrayIndex] === 0 ||
        // @ts-ignore
        isNaN(HSLValue)
      ) {
        pixels[pixelsIndex + 0] = oldPixels[pixelsIndex]; //r
        pixels[pixelsIndex + 1] = oldPixels[pixelsIndex + 1]; //g
        pixels[pixelsIndex + 2] = oldPixels[pixelsIndex + 2]; //b
        pixels[pixelsIndex + 3] = oldPixels[pixelsIndex + 3]; //a
      } else {
        const HSLValue = numberToHSLColorRange(temperatureData[arrayIndex]);

        //@ts-ignore
        const rgba = HSLToRGBA(HSLValue);
        pixels[pixelsIndex] = rgba[0]; //r
        pixels[pixelsIndex + 1] = rgba[1]; //g
        pixels[pixelsIndex + 2] = rgba[2]; //b
        pixels[pixelsIndex + 3] = rgba[3]; //a
      }

      pixelsIndex += 4; //to the next pixel
    }
  }
  const imageData = new ImageData(pixels, width, height);
  context.globalAlpha = 0;

  context.putImageData(imageData, 0, 0);
};

export default { drawTemperatureMap };
