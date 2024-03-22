import { useEffect } from "react";
import { TMapProvincesProps } from "../..";

export const useShowLabel = ({
  id,
  nameRef,
  availableProvinces,
  active,
}: {
  id: string;
  nameRef: React.RefObject<HTMLDivElement>;
  availableProvinces: TMapProvincesProps["availableProvinces"];
  active: boolean;
}) => {
  useEffect(() => {
    const svg = document.querySelector(
      `[data-wrapper-map-id="${id}"]`
    )! as SVGSVGElement;
    const nameEl = nameRef.current! as HTMLDivElement;
    const handleMove = (e: MouseEvent) => {
      if (!active) return;
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
      if (!active) return;
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
};
