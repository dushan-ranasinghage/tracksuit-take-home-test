import { BRANDS } from "./consts";

export const getBrandName = (brandId: number): string => {
    return BRANDS.find((brand) => brand.id === brandId)?.name || "Unknown brand";
};
