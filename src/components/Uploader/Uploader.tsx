import { FC, useCallback } from "react";
import uploaderService from "../../service/uploaderService";
import "./uploader.css";

interface UpladerProps {
  setData: React.Dispatch<React.SetStateAction<Uint8Array>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  center: boolean;
}

const Uploader: FC<UpladerProps> = ({ setData, setLoading, center }) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!uploaderService.checkFileFormat(file, /.grid/, 647964000)) return;
    setLoading(true);
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = uploaderService.isArrayBuffer(reader.result);

      if (!fileContent) return;

      setData(new Uint8Array(fileContent));
    };

    reader.readAsArrayBuffer(file);
  }, []);

  return (
    <>
      <label
        htmlFor="uploader"
        className={`uploader ${center ? "center" : ""}`}
      >
        Upload temperature grid
      </label>
      <input
        type={"file"}
        accept={".grid"}
        onChange={onChange}
        className={`dontDisplay`}
        id="uploader"
      />
    </>
  );
};

export default Uploader;
