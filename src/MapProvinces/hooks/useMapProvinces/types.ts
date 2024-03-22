import { TProvince } from "../../types";

export type T1 = {
  multiple: true;
  initialProvinces?: TProvince[];
};

export type T2 = {
  multiple: false;
  initialProvince?: TProvince;
};

export type T3 = {
  initialProvince: TProvince;
  multiple?: false;
};
export type T4 = {
  initialProvinces: TProvince[];
  multiple?: true;
};

export type T5 = {};

export type TUseMapProvincesCoreAlternativesParam = T1 | T2 | T3 | T4 | T5;

export type TUseMapProvincesCoreParam = {
  availableProvinces: TProvince[];
} & TUseMapProvincesCoreAlternativesParam;

export type TUseMapProvincesCoreResult =
  | {
      select: (idProvince: string) => void;
      province: TProvince;
    }
  | {
      provinces: TProvince[];
      select: (idProvince: string) => void;
    };
