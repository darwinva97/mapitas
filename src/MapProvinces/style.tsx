import { TProvince } from "./types";

export const Style = ({
  id,
  availableProvinces,
  selectedProvinces,
  styles: { all, hover, selected },
}: {
  id: string;
  availableProvinces: TProvince[];
  selectedProvinces: TProvince[];
  styles: {
    all: string;
    hover: string;
    selected: string;
  };
}) => {
  return (
    <style>{`
      [data-wrapper-map-id="${id}"] svg {
        stroke: #fff;
        fill: gray;
      }

      [data-wrapper-map-id="${id}"] svg path {
        outline: none;
        position: relative;
      }

      ${availableProvinces
        .map(
          (province) =>
            `[data-wrapper-map-id="${id}"] svg path[id="${province.id}"]`
        )
        .join(", ")}
      {
        fill: ${all};
        cursor: pointer;
      }

      ${availableProvinces
        .map(
          (province) =>
            `[data-wrapper-map-id="${id}"] svg path[id="${province.id}"]:hover`
        )
        .join(", ")}
      {
        fill: ${hover};
      }

      ${selectedProvinces
        .map(
          (province) =>
            `[data-wrapper-map-id="${id}"] svg path[id="${province.id}"]`
        )
        .join(", ")}
      {
        fill: ${selected};
      }

    `}</style>
  );
};
