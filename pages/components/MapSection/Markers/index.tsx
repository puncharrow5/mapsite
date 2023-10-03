import useSWR from "swr";
import Marker from "../Marker";
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from "../../../hooks/useCurrentStore";
import { MAP_KEY } from "../../../hooks/useMap";
import { STORE_KEY } from "../../../hooks/useStores";
import { NaverMap, ImageIcon } from "../../../types/map";
import { Store } from "../../../types/store";

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;
  return (
    <div>
      {stores.map((store: Store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            icon={markerIcon(store.foodtype, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.nid}
          />
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={markerIcon(currentStore.foodtype, true)}
          onClick={() => {
            clearCurrentStore;
          }}
          key={currentStore.nid}
        />
      )}
    </div>
  );
};

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export default Markers;

export function markerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  return {
    url: isSelected ? "/selectedMarkers.png" : "/markers.png",
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
