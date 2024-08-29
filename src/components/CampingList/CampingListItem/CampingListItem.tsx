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

  const { facltNm, addr1, posblFcltyCl, sbrsCl, themaEnvrnCl, firstImageUrl } =
    data;

  const handleListItem = useCallback(() => {
    selectItem(data);
    openDetailPannel();
  }, [data]);

  return (
    <div className={cx("container")} onClick={handleListItem}>
      <div className={cx("infos")}>
        <div className={cx("name")}>{facltNm}</div>
        <div className={cx("address")}>{addr1}</div>
      </div>

      {firstImageUrl && (
        <div className={cx("img-container")}>
          <img src={firstImageUrl} alt="img" />
        </div>
      )}

      <div className={cx("sub-info")}>
        {posblFcltyCl && <div className={cx("chip")}>{posblFcltyCl}</div>}
        {sbrsCl && <div className={cx("chip")}>{sbrsCl}</div>}
        {themaEnvrnCl && <div className={cx("chip")}>{themaEnvrnCl}</div>}
      </div>
    </div>
  );
};

export default CampingListItem;
