import styles from "./CampingList.module.scss";
import classNames from "classnames/bind";
import CampingListItem from "./CampingListItem/CampingListItem";
import useLocationList from "../../hooks/useLocationList";
import { useLayoutStore } from "../../store/layout";

const cx = classNames.bind(styles);

const CampingList = () => {
  const { locationBasedList } = useLocationList();
  const { isListOpen } = useLayoutStore();

  console.log("is L :", isListOpen);

  return (
    <>
      {isListOpen ? (
        <ul className={cx("container")}>
          {locationBasedList.map((item) => (
            <li key={item.contentId}>
              <CampingListItem data={item} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default CampingList;
