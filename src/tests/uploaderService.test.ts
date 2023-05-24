import uploaderService from "../service/uploaderService";
import "./mocha.setup";
import { expect } from "chai";
import sinon from "sinon";

(global as any).alert = () => {};

describe("uploaderService", () => {
  //@ts-ignore
  let alertStub;

  before(() => {
    sinon.stub(window, "alert");
  });

  it("checkFileFormat should return true when format and size are equal variables in function ", () => {
    const testFile: File = {
      name: "testFile.grid",
      size: 30,
      lastModified: 300,
      webkitRelativePath: "test",
      type: "grid",
      //@ts-ignore
      slice: () => {},
      //@ts-ignore
      arrayBuffer: () => {},
      //@ts-ignore
      stream: () => {},
      //@ts-ignore
      text: () => {},
    };
    expect(uploaderService.checkFileFormat(testFile, /.grid/, 30)).to.be.true;
    expect(
      uploaderService.checkFileFormat(
        // @ts-ignore
        { ...testFile, name: "test.png" },
        /.png/,
        30
      )
    ).to.be.true;
    expect(
      uploaderService.checkFileFormat(
        // @ts-ignore
        { ...testFile, name: "test.png", size: 1999 },
        /.png/,
        1999
      )
    ).to.be.true;
  });

  it("checkFileFormat should return false when format and size are not equal variables in function", () => {
    const testFile: File = {
      name: "testFile.grid",
      size: 30,
      lastModified: 300,
      webkitRelativePath: "test",
      type: "grid",
      //@ts-ignore
      slice: () => {},
      //@ts-ignore
      arrayBuffer: () => {},
      //@ts-ignore
      stream: () => {},
      //@ts-ignore
      text: () => {},
    };
    uploaderService.checkFileFormat(testFile, /.png/, 30);
    expect(
      uploaderService.checkFileFormat(
        // @ts-ignore
        { ...testFile, name: "test.png" },
        /.grid/,
        330
      )
    ).to.be.false;
    expect(
      uploaderService.checkFileFormat(
        // @ts-ignore
        { ...testFile, name: "test.png", size: 1999 },
        /.jpeg/,
        19990
      )
    ).to.be.false;
  });

  it("isArrayBuffer should return Array buffer if variable is Array Buffer", () => {
    const arrayBuffer = new ArrayBuffer(3);
    const dataView = new DataView(arrayBuffer);
    for (let i = 0; i < arrayBuffer.byteLength; i++) dataView.setInt8(i, i);

    expect(uploaderService.isArrayBuffer(arrayBuffer)).to.be.deep.eq(
      arrayBuffer
    );
  });
  it("isArrayBuffer should return false if variable is not Array Buffer", () => {
    expect(uploaderService.isArrayBuffer("arrayBuffer")).to.be.false;
    expect(uploaderService.isArrayBuffer(null)).to.be.false;
  });
});
