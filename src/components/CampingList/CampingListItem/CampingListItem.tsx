import { ICampItem } from "../../../type/camping";
import styles from "./CampingListItem.module.scss";
import classNames from "classnames/bind";
import { useCampingStore } from "../../../store/camping";
import { useLayoutStore } from "../../../store/layout";
import { useCallback } from "react";

const cx = classNames.bind(styles);

interface CampingListItemProps {
  data: ICampItem;
}

const CampingListItem = (props: CampingListItemProps) => {
  const { data } = props;

  const { selectItem } = useCampingStore();
  const { openDetailPannel } = useLayoutStore();

  const {
    facltNm,
    addr1,
    homepage,
    tel,
    posblFcltyCl,
    sbrsCl,
    themaEnvrnCl,
    firstImageUrl,
  } = data;

  const handleListItem = useCallback(() => {
    selectItem(data);
    openDetailPannel();
  }, [data]);

  return (
    <div className={cx("container")} onClick={handleListItem}>
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

      {firstImageUrl && (
        <div className={cx("img-container")}>
          <img src={firstImageUrl} alt="img" />
        </div>
      )}

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
