import { ICampItem } from "../../../type/camping";
import styles from "./CampingListItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface CampingListItemProps {
  data: ICampItem;
}

const CampingListItem = (props: CampingListItemProps) => {
  const { data } = props;

  const {
    facltNm,
    addr1,
    intro,
    homepage,
    tel,
    posblFcltyCl,
    sbrsCl,
    themaEnvrnCl,
  } = data;

  return (
    <div className={cx("container")}>
      <div className={cx("main-info")}>
        <div className={cx("infos")}>
          <div className={cx("name")}>{facltNm}</div>
          <div className={cx("address")}>{addr1}</div>
        </div>
        <div className={cx("detail-infos")}>
          <div className={cx("tel")}>{tel}</div>
          <a className={cx("homepage")} href={homepage}>
            {homepage}
          </a>
        </div>
      </div>

      {intro && <div className={cx("intro")}>{intro}</div>}

      <div className={cx("sub-info")}>
        {posblFcltyCl && (
          <div className={cx("chip", "chip--green")}>{posblFcltyCl}</div>
        )}
        {sbrsCl && <div className={cx("chip", "chip--yellow")}>{sbrsCl}</div>}
        {themaEnvrnCl && (
          <div className={cx("chip", "chip--blue")}>{themaEnvrnCl}</div>
        )}
      </div>
    </div>
  );
};

export default CampingListItem;
