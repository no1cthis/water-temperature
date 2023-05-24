import { numberToHSLColorRange } from "../utilities/color/numberToHSLColorRange";
import { HSLToRGBA } from "../utilities/color/HSLToRGBA";
import { expect } from "chai";

describe("utilities", () => {
  it("numberToHSLColorRange should return hsl color value depends on value in range 0 - maxColorValue", () => {
    expect(numberToHSLColorRange(20)).to.be.eq(240);
    expect(numberToHSLColorRange(100)).to.be.eq(0);
    expect(numberToHSLColorRange(50)).to.be.eq(150);
    expect(numberToHSLColorRange(60)).to.be.eq(120);
  });
  it("numberToHSLColorRange should return error when not in range", () => {
    expect(numberToHSLColorRange(0)).to.be.eq("error");
    expect(numberToHSLColorRange(300)).to.be.eq("error");
  });
  it("HSLToRGBA should convert hsl to RGBA where A always 255", () => {
    expect(HSLToRGBA(300)).to.be.deep.eq([255, 0, 255, 255]);
    expect(HSLToRGBA(100)).to.be.deep.eq([85, 255, 0, 255]);
    expect(HSLToRGBA(50, 60, 40)).to.be.deep.eq([163, 143, 41, 255]);
    expect(HSLToRGBA(60, 40, 60)).to.be.deep.eq([194, 194, 112, 255]);
    expect(HSLToRGBA(0, 30, 40)).to.be.deep.eq([133, 71, 71, 255]);
    expect(HSLToRGBA(125, 30, 40)).to.be.deep.eq([71, 133, 77, 255]);
  });
});
