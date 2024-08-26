import { ICampItem } from "../../../type/camping";
import styles from "./CampingListItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface CampingListItemProps {
  data: ICampItem;
}

const CampingListItem = (props: CampingListItemProps) => {
  const { data } = props;

  const { facltNm, addr1, intro, homepage, tel } = data;

  return (
    <div className={cx("container")}>
      <div className={cx("name")}>{facltNm}</div>
      <div className={cx("intro")}>{intro}</div>

      <div className={cx("info")}>
        <div className={cx("address")}>{addr1}</div>
        <div className={cx("homepage")}>{homepage}</div>
        <div className={cx("tel")}>{tel}</div>
      </div>
    </div>
  );
};

export default CampingListItem;
