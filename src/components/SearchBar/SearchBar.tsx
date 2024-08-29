import styles from "./SearchBar.module.scss";
import classNames from "classnames/bind";
import Input from "../UI/Input/Input";
import { useLocationStore } from "../../store/location";
import { useCallback, ChangeEvent, KeyboardEvent } from "react";
import { useLayoutStore } from "../../store/layout";

const cx = classNames.bind(styles);

const SearchBar = () => {
  const { map, locationKeyword, setLat, setLng, setLocationKeyword } =
    useLocationStore();
  const { closeDetailPannel } = useLayoutStore();

  const searchLocationKeyword = useCallback(() => {
    const { naver } = window;

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

        closeDetailPannel();
      }
    );
  }, [naver, map, locationKeyword, closeDetailPannel]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocationKeyword(e.target.value);
  }, []);

  const handleEnterKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        searchLocationKeyword();
      }
    },
    [searchLocationKeyword]
  );

  return (
    <div className={cx("container")}>
      <Input
        className={cx("input")}
        placeholder="지역 검색"
        value={locationKeyword}
        onChange={handleChange}
        onKeyDown={handleEnterKey}
      />
    </div>
  );
};

export default SearchBar;
