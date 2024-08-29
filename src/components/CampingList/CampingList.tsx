import styles from "./CampingList.module.scss";
import classNames from "classnames/bind";
import CampingListItem from "./CampingListItem/CampingListItem";
import useLocationList from "../../hooks/useLocationList";
import CampingInfo from "../CampingInfo/CampingInfo";

const cx = classNames.bind(styles);

const CampingList = () => {
  const { locationBasedList } = useLocationList();

  return (
    <>
      <div className={cx("container")}>
        <ul className={cx("list")}>
          {locationBasedList.map((item) => (
            <li key={item.contentId} className={cx("list-item")}>
              <CampingListItem data={item} />
            </li>
          ))}
        </ul>

        <CampingInfo />
      </div>
    </>
  );
};

export default CampingList;
