import { MapProvinces } from "./MapProvinces";
import { useMapProvinces } from "./MapProvinces/hooks";
import spain from "./assets/spain.json";

const MapSimpleProvince = () => {
  const dataMap = useMapProvinces({
    json: spain,
  });
  return (
    <div className="w-full max-w-[400px]">
      <h2 className="text-center text-xl">Multiple provinces</h2>
      <MapProvinces
        {...dataMap}
        styles={{
          all: "red",
          hover: "blue",
          selected: "green",
        }}
      />
      <p>Provinces:</p>
      <pre className="w-[200px] h-[200px] text-sm overflow-scroll">
        {JSON.stringify(dataMap.province, null, 2)}
      </pre>
    </div>
  );
};

const MapMultipleProvinces = () => {
  const dataMap = useMapProvinces({ json: spain, multiple: true });
  return (
    <div className="w-full max-w-[400px]">
      <h2 className="text-center text-xl">Multiple provinces</h2>
      <MapProvinces
        {...dataMap}
        styles={{
          all: "red",
          hover: "blue",
          selected: "green",
        }}
      />
      <p>Provinces:</p>
      <pre className="w-[200px] h-[200px] text-sm overflow-scroll">
        {JSON.stringify(dataMap.provinces, null, 2)}
      </pre>
    </div>
  );
};

const App = () => {
  return (
    <div className="container py-6">
      <h1 className="text-center mb-6 text-2xl">Map Provinces</h1>
      <div className="flex gap-4 justify-between">
        <MapSimpleProvince />
        <MapMultipleProvinces />
      </div>
    </div>
  );
};

export default App;
