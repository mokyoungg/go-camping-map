import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocationBasedList } from "../../api/camping";

const Map = () => {
  const { naver } = window;

  const mapElement = useRef<HTMLDivElement>(null);
  const centerRef = useRef<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });

  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });

  // observer map center
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(
        centerRef.current.lat,
        centerRef.current.lng
      ),
      zoom: 13,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    naver.maps.Event.addListener(map, "center_changed", () => {
      const center = map.getCenter();
      centerRef.current = {
        lat: center.x,
        lng: center.y,
      };
    });

    return () => {
      // naver.maps.Event.removeListener();
    };
  }, []);

  const getCenter = () => {
    const { lat, lng } = centerRef.current;

    setMapCenter({ lat: lat, lng: lng });
  };

  const { data: locationList } = useQuery({
    queryKey: ["location-list", mapCenter],
    queryFn: () =>
      getLocationBasedList({
        pageNo: 1,
        mapX: mapCenter.lat.toString(),
        mapY: mapCenter.lng.toString(),
        radius: "10000",
      }),
  });

  return (
    <div>
      <div ref={mapElement} style={{ width: "100%", height: "500px" }} />

      <button onClick={getCenter}>Get Center</button>
    </div>
  );
};

export default Map;
