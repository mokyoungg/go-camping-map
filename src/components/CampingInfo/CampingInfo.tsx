import styles from "./CampingInfo.module.scss";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";
import { getImageList, getSearchList } from "../../api/camping";

const cx = classNames.bind(styles);

const CampingInfo = () => {
  const { data: imageData } = useQuery({
    queryKey: ["image"],
    queryFn: () => getImageList({ pageNo: 1, contentId: "100006" }),
  });

  const { data: searchData } = useQuery({
    queryKey: ["keyword"],
    queryFn: () => getSearchList({ pageNo: 1, keyword: "오커빌리지" }),
  });

  console.log("s :", searchData);

  return <div className={cx("container")}>info</div>;
};

export default CampingInfo;
