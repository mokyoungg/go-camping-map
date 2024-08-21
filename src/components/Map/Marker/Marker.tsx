import styles from "./Marker.module.scss";
import classNames from "classnames/bind";
import Image from "../../../assets/image/camping.svg";

const cx = classNames.bind(styles);

interface MarkerProps {
  title: string;
}

const Marker = (props: MarkerProps) => {
  const { title } = props;

  return (
    <div className={cx("marker-container")}>
      <div className={cx("img-container")}>
        <img src={Image} alt="img" className={cx("img")} />
      </div>

      <div className={cx("title")}>{title}</div>
    </div>
  );
};

export default Marker;
