import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { NaverMap } from "../types/map";
import { Coordinates } from "../types/store";

export const MAP_KEY = "/map";

export const INITIAL_CENTER: Coordinates = [37.5639569, 126.9612464];
export const INITIAL_ZOOM = 14;

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);

  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  const resetMapOption = useCallback(() => {
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  const getMapOption = useCallback(() => {
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOption,
    getMapOption,
  };
};

export default useMap;
