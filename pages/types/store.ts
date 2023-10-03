type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type Menu = { name: string; price: string };
export type Store = {
  nid: number;
  foodtype: number;
  name: string;
  description: string;
  coordinates: Coordinates;
  images: string[];
  characteristic: string;
  foodKind: string;
  address: string;
  phone: string;
  menus: Menu[];
};
