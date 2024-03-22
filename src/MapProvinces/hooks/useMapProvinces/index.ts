import { useMemo, useState } from "react";
import {
  TUseMapProvincesCoreAlternativesParam,
  TUseMapProvincesCoreParam,
  TUseMapProvincesCoreResult,
} from "./types";
import { TMapJson, TMapProvincesProps, TProvince } from "../../types";

const useMapProvincesCore = ({
  availableProvinces,
  ...params
}: TUseMapProvincesCoreParam): TUseMapProvincesCoreResult => {
  const [provinces, setProvinces] = useState(() => {
    if ("initialProvinces" in params) {
      return params.initialProvinces || [];
    }
    return [];
  });

  const [province, setProvince] = useState(() => {
    if ("initialProvince" in params) {
      return params.initialProvince;
    }
  });

  const checkIsSingle = () => {
    if ("multiple" in params) {
      return !params.multiple;
    }
    if ("initialProvince" in params) {
      return true;
    }
    if ("initialProvinces" in params) {
      return false;
    }
    return true;
  };

  const select = (idProvince: TProvince["id"]) => {
    const province = availableProvinces.find(
      (province) => province.id === idProvince
    );

    if (!province) return;

    const isSingle = checkIsSingle();

    if (isSingle) {
      setProvince(province);
      return;
    }
    setProvinces((previousProvinces) => {
      if (!province) return previousProvinces;

      const provinceIsPresent = previousProvinces.find(
        (province) => province.id === idProvince
      );

      return provinceIsPresent
        ? previousProvinces.filter((province) => province.id !== idProvince)
        : previousProvinces.concat(province);
    });
  };

  const result = useMemo(() => {
    const isSingle = checkIsSingle();
    return (
      isSingle
        ? {
            province,
            select,
          }
        : {
            provinces,
            select,
          }
    ) as TUseMapProvincesCoreResult;
  }, [params, province, provinces]);

  return result;
};

export type TUseMapProvincesParam = TMapProvincesProps &
  TUseMapProvincesCoreAlternativesParam;

export const useMapProvinces = ({
  json,
  idProvinces,
  ...params
}: TUseMapProvincesParam) => {
  const availableProvinces = (
    idProvinces && idProvinces.length > 0
      ? json.layers.filter((layer) => {
          return idProvinces.includes(layer.id);
        })
      : json.layers.filter((layer) => layer.id !== "divider")
  ).map((layer) => {
    return {
      id: layer.id,
      name: layer.name,
    };
  });

  const core = useMapProvincesCore({
    availableProvinces,
    ...params,
  });

  const result = {
    json,
    availableProvinces,
    ...params,
    ...core,
  };
  return result as TResult;
};

export type useMapProvinces = (params: TUseMapProvincesParam) => TResult;

type TResult = {
  json: TMapJson;
  availableProvinces: TProvince[];
  select: (idProvince: TProvince["id"]) => void;
  multiple?: boolean;
  initialProvince?: TProvince;
  initialProvinces?: TProvince[];
  province?: TProvince;
  provinces?: TProvince[];
};
