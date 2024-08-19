import { useEffect, useRef } from "react";

const Map = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;

    if (!mapElement.current || !naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 13,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 마커 추가 예시
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5665, 126.978),
      map: map,
    });

    return () => {
      // Cleanup: 마커를 삭제하거나 이벤트 리스너를 제거할 수 있음
      marker.setMap(null);
    };
  }, []);

  return (
    <div ref={mapElement} style={{ width: "100%", height: "400px" }}></div>
  );
};

export default Map;
