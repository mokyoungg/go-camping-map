import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocationBasedList } from "../../api/camping";
import Marker from "./Marker/Marker";
import ReactDOMServer from "react-dom/server";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import styles from "./Map.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

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
    queryKey: ["location-list", mapCenter.lat, mapCenter.lng],
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

    locationList.items.item.forEach((item) => {
      const position = new naver.maps.LatLng(
        Number(item.mapY),
        Number(item.mapX)
      );

      const markerHtml = ReactDOMServer.renderToString(
        <Marker title={item.facltNm} />
      );

      new naver.maps.Marker({
        position: position,
        map,
        title: item.facltNm,
        icon: {
          content: markerHtml,
          anchor: new naver.maps.Point(16, 32),
        },
      });
    });
  }, [locationList, map]);

  const getCenter = () => {
    const { lat, lng } = centerRef.current;
    setMapCenter({ lat, lng });
  };

  const [keyword, setKeyword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const searchLocation = async () => {
    if (!naver || !map) return;

    naver.maps.Service.geocode({ query: keyword }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert("Something wrong!");
      }

      const resAddress = response.v2.addresses[0];

      const newMapCenter = {
        lat: Number(resAddress.x),
        lng: Number(resAddress.y),
      };

      setMapCenter(newMapCenter);
      map.setCenter(new naver.maps.LatLng(newMapCenter.lng, newMapCenter.lat));
      centerRef.current.lat = newMapCenter.lat;
      centerRef.current.lng = newMapCenter.lng;

      getCenter();
    });
  };

  return (
    <div className={cx("container")}>
      <div className={cx("search-container")}>
        <Input
          placeholder="지역 검색"
          value={keyword}
          onChange={handleChange}
        />
        <Button size="small" onClick={searchLocation}>
          검색
        </Button>
      </div>

      <div ref={mapElement} style={{ width: "100%", height: "500px" }} />

      <button onClick={getCenter}>Get Center</button>
    </div>
  );
};

export default Map;
