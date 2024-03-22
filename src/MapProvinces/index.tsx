import { VectorMap } from "@south-paw/react-vector-maps";
import { useMapProvinces } from "./hooks";
import { useId, useRef } from "react";
import { Style } from "./style";
import { useShowLabel } from "./hooks/useShowLabel";

export type TMapProvincesProps = ReturnType<typeof useMapProvinces>;

export const MapProvinces = ({
  json,
  availableProvinces,
  select,
  styles,
  ...params
}: TMapProvincesProps & {
  styles: {
    all: string;
    hover: string;
    selected: string;
  };
}) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const selectedProvinces = params.province
    ? [params.province]
    : params.provinces || [];

  const id = useId();

  useShowLabel({ id, nameRef, availableProvinces });

  return (
    <>
      <div data-wrapper-map-id={id}>
        <div
          ref={nameRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "none",
            fontSize: "12px",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        ></div>
        <Style
          id={id}
          availableProvinces={availableProvinces}
          selectedProvinces={selectedProvinces}
          styles={styles}
        />
        <VectorMap
          {...json}
          layerProps={{
            onClick: (e) => {
              const path = e.target as SVGPathElement;
              const provinceId = path.getAttribute("id");
              if (!provinceId) return;
              select(provinceId);
            },
          }}
        />
      </div>
    </>
  );
};
