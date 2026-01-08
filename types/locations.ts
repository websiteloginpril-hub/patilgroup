export type CityLocation = {
  name: string;
  plantType: string;
};

export type StateLocation = {
  stateID: string;
  state: string;
  cities: CityLocation[];
  color: string;
};

