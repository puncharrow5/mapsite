import { useMemo } from "react";
import { useRouter } from "next/router";
import Map from "./Map";
import Markers from "./Markers";
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from "../../hooks/useMap";
import useCurrentStore from "../../../pages/hooks/useCurrentStore";
import { NaverMap } from "../../types/map";
import { Coordinates } from "../../types/store";

const MapSection = () => {
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, "click", clearCurrentStore);
  };

  const router = useRouter();
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []);

  const initialZoom = useMemo(
    () => (query.get("zoom") ? Number(query.get("zoom")) : INITIAL_ZOOM),
    [query]
  );

  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get("lat") && query.get("lng")
        ? [Number(query.get("lat")), Number(query.get("lng"))]
        : INITIAL_CENTER,
    [query]
  );

  return (
    <div>
      <Map
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </div>
  );
};

export default MapSection;
