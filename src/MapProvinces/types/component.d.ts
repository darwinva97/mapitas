export type TProvince = {
  id: string;
  name: string;
};

export type TMapProvincesProps = {
  json: TMapJson;
  idProvinces?: TProvince["id"][];
};

export type TLayer = {
  id: "divider" | string;
  name: string;
  d: string;
};
export type TMapJson = {
  id: string;
  name: string;
  viewBox: string;
  layers: TLayer[];
};
