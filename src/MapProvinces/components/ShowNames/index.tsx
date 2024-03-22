import { HTMLAttributes, useEffect } from "react";
import { TProvince } from "../../types";

export const ShowNames = ({
  availableProvinces,
  id,
  style,
  ...props
}: {
  availableProvinces: TProvince[];
  id: string;
} & HTMLAttributes<HTMLDivElement>) => {
  useEffect(() => {
    const fn = () => {
      const wrapper = document.querySelector(`[data-wrapper-map-id="${id}"]`);
      wrapper?.querySelectorAll("path").forEach((path) => {
        const id = path.getAttribute("id")!;
        const isAvailable = availableProvinces.find((p) => p.id === id)!!;

        if (!isAvailable) return;

        const { top, left } = path.getBoundingClientRect();

        const nameEl = wrapper.querySelector(`[data-map-province-id="${id}"]`);

        if (!nameEl || !(nameEl instanceof HTMLDivElement)) return;

        nameEl.style.top = `${top}px`;
        nameEl.style.left = `${left}px`;
      });
    };
    fn();
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, []);
  return (
    <>
      {availableProvinces.map((province) => (
        <div
          key={province.id}
          id={province.id}
          data-map-province-id={province.id}
          style={{
            position: "absolute",
            pointerEvents: "none",
            ...style,
          }}
          {...props}
        >
          {province.name}
        </div>
      ))}
    </>
  );
};
