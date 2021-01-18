export interface UserLocationObject {
    latitude?: number | undefined;
    longitude?: number | undefined;
  };

export interface CoordinatesObject {
    latitude: number;
    longitude: number
};

export type SetLocationFunction = (geoUserLocation: UserLocationObject) => void;