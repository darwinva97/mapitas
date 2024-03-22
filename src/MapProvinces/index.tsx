import { VectorMap } from "@south-paw/react-vector-maps";
import { useMapProvinces } from "./hooks";
import { useEffect, useId, useRef } from "react";
import { Style } from "./style";

export type TMapProvincesProps = ReturnType<typeof useMapProvinces>;

export const MapProvinces = ({
  json,
  availableProvinces,
  select,
  ...params
}: TMapProvincesProps) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const selectedProvinces = params.province
    ? [params.province]
    : params.provinces || [];

  const id = useId();

  useEffect(() => {
    const svg = document.querySelector(
      `[data-wrapper-map-id="${id}"]`
    )! as SVGSVGElement;
    const nameEl = nameRef.current! as HTMLDivElement;
    const handleMove = (e: MouseEvent) => {
      const path = e.target as SVGPathElement;
      if (path.nodeName !== "path") return;

      const id = path.getAttribute("id")!;

      const availableProvince = availableProvinces.find((p) => p.id === id)!;

      if (!availableProvince) return;

      const name = path.getAttribute("name")!;

      const x = e.clientX;
      const y = e.clientY;

      if (nameEl.innerText !== name) {
        nameEl.innerText = name;
      }

      if (nameEl instanceof HTMLDivElement) {
        nameEl.style.display = "block";
        nameEl.style.top = `${y - 16}px`;
        nameEl.style.left = `${x}px`;
      }
    };
    const handleLeave = () => {
      nameEl.style.display = "none";
    };
    svg.addEventListener("mousemove", handleMove);
    svg.addEventListener("mouseenter", handleMove);
    svg.addEventListener("mouseleave", handleLeave);
    return () => {
      svg.removeEventListener("mousemove", handleMove);
      svg.removeEventListener("mouseenter", handleMove);
      svg.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

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
          styles={{
            all: "gray",
            hover: "red",
            selected: "blue",
          }}
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
