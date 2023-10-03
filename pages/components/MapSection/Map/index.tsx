import { useRef, useEffect } from "react";
import Script from "next/script";
import { NaverMap } from "../../../types/map";
import { Coordinates } from "../../../types/store";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../../../hooks/useMap";

type Props = {
  mapId?: string;
  initialZoom?: number;
  initialCenter?: Coordinates;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = "map",
  initialZoom = INITIAL_ZOOM,
  initialCenter = INITIAL_CENTER,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOption = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOption);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_CLIENT_ID}`}
        onReady={initializeMap}
        strategy="afterInteractive"
      />
      <div id={mapId} className="w-full h-screen" />
    </>
  );
};

export default Map;
