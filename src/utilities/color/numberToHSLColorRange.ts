// return hsl color value depends on value in range 0 - maxColorValue
export const numberToHSLColorRange = (
  number: number,
  lowestValue: number = 20,
  highestValue: number = 100,
  maxColorValue: number = 240
) => {
  if (number < lowestValue || number > highestValue) return "error";
  return (
    (1 - (number - lowestValue) / (highestValue - lowestValue)) * maxColorValue
  );
};
