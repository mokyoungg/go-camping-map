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
  const [map, setMap] = useState<naver.maps.Map | null>(null);

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

  // Initialize map and observe center change
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(
        centerRef.current.lat,
        centerRef.current.lng
      ),
      zoom: 13,
    };

    const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);
    setMap(mapInstance);

    naver.maps.Event.addListener(mapInstance, "center_changed", () => {
      const center = mapInstance.getCenter();
      centerRef.current = {
        lat: center.x,
        lng: center.y,
      };
    });

    return () => {
      naver.maps.Event.clearInstanceListeners(mapInstance);
    };
  }, [naver]);

  // Update markers when locationList changes
  useEffect(() => {
    if (!locationList || !locationList.items || !map) {
      return;
    }

    locationList.items.item.forEach((item, idx) => {
      const position = new naver.maps.LatLng(
        Number(item.mapY),
        Number(item.mapX)
      );

      new naver.maps.Marker({
        position: position,
        map,
        title: item.facltNm,
      });
    });
  }, [locationList, map]);

  const getCenter = () => {
    const { lat, lng } = centerRef.current;
    setMapCenter({ lat, lng });
  };

  return (
    <div>
      <div ref={mapElement} style={{ width: "100%", height: "500px" }} />

      <button onClick={getCenter}>Get Center</button>
    </div>
  );
};

export default Map;
