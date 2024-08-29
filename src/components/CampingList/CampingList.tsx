import styles from "./CampingList.module.scss";
import classNames from "classnames/bind";
import CampingListItem from "./CampingListItem/CampingListItem";
import useLocationList from "../../hooks/useLocationList";
import NoticeImg from "../../assets/image/notice.jpg";

const cx = classNames.bind(styles);

const CampingList = () => {
  const { locationBasedList } = useLocationList();

  return (
    <>
      <div className={cx("container")}>
        {locationBasedList.length > 0 ? (
          <ul className={cx("list")}>
            {locationBasedList.map((item) => (
              <li key={item.contentId} className={cx("list-item")}>
                <CampingListItem data={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={cx("notice")}>
            <div className={cx("img-wrapper")}>
              <img src={NoticeImg} alt="camp" />
            </div>

            <div className={cx("content")}>
              지명을 검색하거나 지도에서 검색해주세요.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CampingList;
