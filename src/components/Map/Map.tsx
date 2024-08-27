import { useCallback, useEffect, useRef } from "react";
import Marker from "./Marker/Marker";
import ReactDOMServer from "react-dom/server";
import styles from "./Map.module.scss";
import classNames from "classnames/bind";
import { ICampItem } from "../../type/camping";
import { useLocationStore } from "../../store/location";
import useLocationList from "../../hooks/useLocationList";
import { IZoomLevel } from "../../type/camping";
import { useLayoutStore } from "../../store/layout";

const cx = classNames.bind(styles);

const Map = () => {
  const { naver } = window;

  const mapElement = useRef<HTMLDivElement>(null);
  const mapCenterRef = useRef<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const mapZoomRef = useRef<IZoomLevel>(13);

  const { isListOpen, openList, closeList } = useLayoutStore();

  const { lat, lng, map, setLat, setLng, setZoomLevel, setMap } =
    useLocationStore();

  const { locationBasedList, isPossibleGetData, loadMoreData } =
    useLocationList();

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

      mapZoomRef.current = zoomLevel as IZoomLevel;
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

  const handleListOpen = useCallback(() => {
    if (isListOpen) {
      closeList();
    } else {
      openList();
    }
  }, [isListOpen]);

  return (
    <div className={cx("container")}>
      <div ref={mapElement} style={{ width: "100%", height: "100%" }} />

      <button
        className={cx("list-button", { "list-button--right": isListOpen })}
        onClick={handleListOpen}
      >
        {isListOpen ? "<" : "> 리스트 보기"}
      </button>

      <div className={cx("buttons-box", { "buttons-box--right": isListOpen })}>
        <button onClick={getLocationBasedData} className={cx("feature-button")}>
          현 지도에서 검색
        </button>

        <button
          onClick={loadMoreData}
          disabled={!isPossibleGetData}
          className={cx("feature-button")}
        >
          더 불러오기
        </button>
      </div>
    </div>
  );
};

export default Map;
