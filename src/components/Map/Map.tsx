import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLocationBasedList } from "../../api/camping";
import Marker from "./Marker/Marker";
import ReactDOMServer from "react-dom/server";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import styles from "./Map.module.scss";
import classNames from "classnames/bind";
import { ICampItem } from "../../type/camping";

const cx = classNames.bind(styles);

const ZOOM_LEVEL = {
  11: 20000,
  12: 10000,
  13: 5000,
  14: 3000,
  15: 1000,
} as const;

const Map = () => {
  const { naver } = window;

  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [lat, setLat] = useState<number>(37.5665);
  const [lng, setLng] = useState<number>(126.978);
  const [locationKeyword, setLocationKeyword] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<keyof typeof ZOOM_LEVEL>(13);

  const mapElement = useRef<HTMLDivElement>(null);
  const mapCenterRef = useRef<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const mapZoomRef = useRef<keyof typeof ZOOM_LEVEL>(13);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["location-list", lat, lng, zoomLevel],
    queryFn: ({ pageParam }) =>
      getLocationBasedList({
        pageNo: pageParam,
        mapX: lat.toString(),
        mapY: lng.toString(),
        radius: ZOOM_LEVEL[zoomLevel].toString(),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.totalCount / lastPage.numOfRows);
      const nextPage = pages.length + 1;

      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const locationBasedList = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.reduce((acc: ICampItem[], cur) => {
      if (cur?.items?.item) {
        return acc.concat(cur.items.item);
      }

      return acc;
    }, []);
  }, [data]);

  // Initialize map
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const mapOption = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 13,
      minZoom: 11,
      maxZoom: 15,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const mapInstance = new naver.maps.Map(mapElement.current, mapOption);
    setMap(mapInstance);

    return () => {
      naver.maps.Event.clearInstanceListeners(mapInstance);
    };
  }, [naver]);

  // Observe Map Center Changed
  useEffect(() => {
    if (!naver || !map) return;

    naver.maps.Event.addListener(map, "center_changed", () => {
      const center = map.getCenter();

      mapCenterRef.current = {
        lat: center.x,
        lng: center.y,
      };
    });
  }, [naver, map]);

  // Observe Map Zoom Change
  useEffect(() => {
    if (!naver || !map) return;

    naver.maps.Event.addListener(map, "zoom_changed", () => {
      const zoomLevel = map.getZoom();

      mapZoomRef.current = zoomLevel as keyof typeof ZOOM_LEVEL;
    });
  }, [naver, map]);

  // show and hide marker
  const updateMarkers = useCallback(
    (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
      const mapBounds = map.getBounds();

      const showMarker = (marker: naver.maps.Marker) => {
        if (marker.getMap()) return;

        marker.setMap(map);
      };

      const hideMarker = (marker: naver.maps.Marker) => {
        if (!marker.getMap()) return;

        marker.setMap(null);
      };

      for (let i = 0; i < markers.length; i++) {
        let marker = markers[i];
        let position = marker.getPosition();

        if (mapBounds.hasPoint(position)) {
          showMarker(marker);
        } else {
          hideMarker(marker);
        }
      }
    },
    []
  );

  // Update Markers when locationsList was changed
  useEffect(() => {
    if (!locationBasedList || !map) {
      return;
    }

    const markers: naver.maps.Marker[] = [];

    locationBasedList.forEach((item: ICampItem) => {
      const position = new naver.maps.LatLng(
        Number(item.mapY),
        Number(item.mapX)
      );

      const markerHtml = ReactDOMServer.renderToString(
        <Marker title={item.facltNm} />
      );

      const marker = new naver.maps.Marker({
        position: position,
        map,
        title: item.facltNm,
        icon: {
          content: markerHtml,
          anchor: new naver.maps.Point(16, 32),
        },
      });

      markers.push(marker);
    });

    naver.maps.Event.addListener(map, "zoom_changed", () => {
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, "dragend", function () {
      updateMarkers(map, markers);
    });
  }, [map, locationBasedList, updateMarkers]);

  const getLocationBasedData = useCallback(() => {
    const { lat, lng } = mapCenterRef.current;
    const zoomLevel = mapZoomRef.current;

    setLat(lat);
    setLng(lng);
    setZoomLevel(zoomLevel);
  }, []);

  const searchLocationKeyword = useCallback(() => {
    if (!naver || !map) return;

    naver.maps.Service.geocode(
      { query: locationKeyword },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something wrong!");
        }

        const responseAddress = response.v2.addresses[0];

        const newCenter = {
          lat: Number(responseAddress.x),
          lng: Number(responseAddress.y),
        };

        map.setCenter(new naver.maps.LatLng(newCenter.lng, newCenter.lat));
        setLat(newCenter.lat);
        setLng(newCenter.lng);
      }
    );
  }, [naver, map, locationKeyword]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocationKeyword(e.target.value);
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("search-container")}>
        <Input
          placeholder="지역 검색"
          value={locationKeyword}
          onChange={handleChange}
        />
        <Button size="small" onClick={searchLocationKeyword}>
          검색
        </Button>
      </div>

      <div ref={mapElement} style={{ width: "100%", height: "500px" }} />

      <button onClick={getLocationBasedData}>Update Center</button>
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load More
      </button>
    </div>
  );
};

export default Map;
