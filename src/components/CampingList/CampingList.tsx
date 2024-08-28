import styles from "./CampingList.module.scss";
import classNames from "classnames/bind";
import CampingListItem from "./CampingListItem/CampingListItem";
import useLocationList from "../../hooks/useLocationList";
import { useLayoutStore } from "../../store/layout";
import CampingInfo from "../CampingInfo/CampingInfo";

const cx = classNames.bind(styles);

const CampingList = () => {
  const { locationBasedList } = useLocationList();
  const { isListOpen } = useLayoutStore();

  return (
    <>
      <div className={cx("container")}>
        <ul
          className={cx("list", {
            "list--open": isListOpen,
          })}
        >
          {locationBasedList.map((item) => (
            <li key={item.contentId}>
              <CampingListItem data={item} />
            </li>
          ))}
        </ul>

        {/* <div
          className={cx("pannel", {
            "pannel--open": isDetailPannelOpen,
          })}
        > */}
        <CampingInfo />
        {/* </div> */}
      </div>
    </>
  );
};

export default CampingList;
