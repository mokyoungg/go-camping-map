import styles from "./CampingList.module.scss";
import classNames from "classnames/bind";
import CampingListItem from "./CampingListItem/CampingListItem";
import useLocationList from "../../hooks/useLocationList";

const cx = classNames.bind(styles);

const CampingList = () => {
  const { locationBasedList } = useLocationList();

  return (
    <ul className={cx("container")}>
      {locationBasedList.map((item) => (
        <li key={item.contentId}>
          <CampingListItem data={item} />
        </li>
      ))}
    </ul>
  );
};

export default CampingList;
