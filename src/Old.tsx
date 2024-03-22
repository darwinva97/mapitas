import { VectorMap } from "@south-paw/react-vector-maps";
import spain from "./assets/spain.json";
import { useId, useState } from "react";

type TSpainMapProps = {
  availableProvinces: string[];
  className?: string;
  callback?: (_: { id: string; name: string; label: string }) => void;
  select: (province: string) => void;
} & (
  | {
      selectedProvinces: string[];
    }
  | {
      selectedProvince: string;
    }
);
const SpainMap = ({
  availableProvinces,
  className,
  callback = () => {},
}: TSpainMapProps) => {
  const hash = useId();
  const id = "_" + hash + "_";
  return (
    <div className={`max-w-[360px] ${className || ""}`}>
      <style>{`
        #${id} svg {
          stroke: #fff;
          fill: gray;
        }
        
        #${id} path {
          outline: none;
        }

        ${availableProvinces
          .map((province) => `#${id} path[id="${province}"]`)
          .join(", ")} {
          fill: blue;
          cursor: pointer;
        }

        ${availableProvinces
          .map((province) => `#${id} path[id="${province}"]:hover`)
          .join(", ")} {
          fill: rgba(168, 43, 43, 0.83);
        }

        ${
          selected &&
          `
          #${id} path[id="${selected}"] {
            fill: yellow;
          }
        `
        }

        #${id} path:hover {
        }
      `}</style>
      <VectorMap
        {...spain}
        layerProps={{
          onClick: (e) => {
            const path = e.target as SVGPathElement;
            const province = {
              id: path.getAttribute("id")!,
              name: path.getAttribute("name")!,
              label: path.getAttribute("label")!,
            };
            const isAvailable = availableProvinces.includes(province.id);
            if (isAvailable) {
              callback(province);
            }
          },
        }}
      />
    </div>
  );
};

const availableProvinces = ["es-le", "es-m", "es-ml"];

const useProvinces = ({
  select
}) => {
  
};

const SingleProvince = () => {
  return (
    <SpainMap
      selectedProvince="es-le"
      callback={console.log}
      availableProvinces={availableProvinces}
      className="max-w-[330px]"
    />
  );
};

function App() {
  return (
    <>
      <div className="container">
        <div className="flex">
          <div className="flex flex-col gap-4 items-center w-full">
            <h1>Una provincia</h1>
            <SpainMap
              selectedProvince="es-le"
              callback={console.log}
              availableProvinces={availableProvinces}
              className="max-w-[330px]"
            />
          </div>
          <div className="flex flex-col gap-4 items-center w-full">
            <h1>Una provincia</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
