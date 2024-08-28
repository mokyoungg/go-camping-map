import styles from "./CampingInfo.module.scss";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";
import { getSearchList } from "../../api/camping";
import CampingImage from "./CampingImage/CampingImage";
import { useMemo } from "react";

const cx = classNames.bind(styles);

interface CampingInfoProps {
  closePannel: () => void;
}

const CampingInfo = (props: CampingInfoProps) => {
  const { closePannel } = props;

  const { data: searchData } = useQuery({
    queryKey: ["keyword"],
    queryFn: () => getSearchList({ pageNo: 1, keyword: "솔캠핑" }),
  });

  const data = useMemo(() => searchData?.items.item[0], [searchData]);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("title")}>{data?.facltNm}</div>

        <button className={cx("close-button")} onClick={closePannel}>
          X
        </button>
      </div>
      <CampingImage />

      <div className={cx("info-container")}>
        <div className={cx("info")}>
          <div className={cx("address")}>{data?.addr1}</div>

          <div className={cx("reserve")}>
            <div className={cx("tel")}>{data?.tel}</div>
            <div className={cx("homepage")}>{data?.homepage}</div>
          </div>
        </div>

        {data?.intro && (
          <div className={cx("intro")}>
            <div className={cx("title")}>소개</div>
            <div className={cx("content")}>{data?.intro}</div>
          </div>
        )}

        <div className={cx("sub-info")}>
          <div className={cx("title")}>편의 시설</div>
          <div className={cx("facility")}>{data?.posblFcltyCl}</div>
          <div className={cx("facility")}>{data?.sbrsCl}</div>
        </div>
      </div>
    </div>
  );
};

export default CampingInfo;
