import { useState } from "react";
import TemperatureMap from "./components/TemperatureMap/TemperatureMap";
import Uploader from "./components/Uploader/Uploader";

function App() {
  const [data, setData] = useState<Uint8Array>(new Uint8Array(0));
  const [isLoading, setLoading] = useState(false);

  return (
    <div>
      <Uploader
        setData={setData}
        setLoading={setLoading}
        center={!data.length}
      />
      {isLoading && (
        <div className="loading__wrapper">
          <span className="loading">LOADING</span>
        </div>
      )}
      <TemperatureMap temperatureData={data} setLoading={setLoading} />
    </div>
  );
}

export default App;
