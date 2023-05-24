const checkFileFormat = (file: File, nameRegExp: RegExp, fileSize: number) => {
  if (!nameRegExp.test(file.name)) {
    alert('type file must be ".grid", try again');
    return false;
  }

  if (file.size !== fileSize) {
    alert("incorrect file size, must be 647964000. Try again");
    return false;
  }

  return true;
};

const isArrayBuffer = (fileContent: string | ArrayBuffer | null) => {
  if (!fileContent || typeof fileContent === "string") {
    alert("Can't load: file content is string or null");
    return false;
  }
  return fileContent;
};

export default { checkFileFormat, isArrayBuffer };
