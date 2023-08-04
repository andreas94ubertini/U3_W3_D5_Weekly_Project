import {LocalNames} from "./query-resp2";

export interface CityDet {
  name:        string;
  local_names: LocalNames;
  lat:         number;
  lon:         number;
  country:     string;
  state?:      string;
}
