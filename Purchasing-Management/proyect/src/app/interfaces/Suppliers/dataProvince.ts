import { countryInterface } from "./dataCountry";

export interface provinceInterface {
    id?: number;
    name: string;
    country: Partial<countryInterface>;
}