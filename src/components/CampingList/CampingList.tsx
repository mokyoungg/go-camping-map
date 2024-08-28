import styles from "./CampingList.module.scss";
import classNames from "classnames/bind";
import CampingListItem from "./CampingListItem/CampingListItem";
import useLocationList from "../../hooks/useLocationList";
import { useLayoutStore } from "../../store/layout";
import CampingInfo from "../CampingInfo/CampingInfo";

import { useState } from "react";

const cx = classNames.bind(styles);

const CampingList = () => {
  const { locationBasedList } = useLocationList();
  const { isListOpen } = useLayoutStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cx("container")}>
        <ul
          className={cx("list", {
            "list--open": isListOpen,
          })}
        >
          <button onClick={() => setIsOpen(!isOpen)}>hi</button>
          {locationBasedList.map((item) => (
            <li key={item.contentId}>
              <CampingListItem data={item} />
            </li>
          ))}
        </ul>

        <div
          className={cx("pannel", {
            "pannel--open": isOpen,
          })}
        >
          <CampingInfo closePannel={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default CampingList;
