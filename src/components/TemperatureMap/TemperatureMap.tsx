import { FC, useEffect, useRef } from "react";
import emptyMapImg from "../../assets/empty-map.jpg";
import canvasService from "../../service/canvasServece";
import { drawImageInCavas } from "../../utilities/canvas/drawImageInCanvas";

import "./temperatureMap.css";

interface TemperatureMapProps {
  temperatureData: Uint8Array;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemperatureMap: FC<TemperatureMapProps> = ({
  temperatureData,
  setLoading,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let context = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    context.current = canvas.current.getContext("2d");

    const emptyMap = new Image();

    emptyMap.onload = () => {
      if (!canvas.current || !context.current) {
        alert("Error: can't display map");
        return;
      }

      //   draw empty map
      drawImageInCavas(emptyMap, canvas.current);
    };
    emptyMap.src = emptyMapImg;

    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
  }, []);

  useEffect(() => {
    if (!canvas.current || !context.current || temperatureData.length === 0)
      return;

    canvasService.drawTemperatureMap(temperatureData, canvas.current);
    setLoading(false);
  }, [temperatureData]);

  return <canvas ref={canvas} className="map" />;
};

export default TemperatureMap;
