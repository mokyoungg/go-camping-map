import styles from "./CampingInfo.module.scss";
import classNames from "classnames/bind";
import CampingImage from "./CampingImage/CampingImage";
import { useLayoutStore } from "../../store/layout";
import { useCampingStore } from "../../store/camping";

const cx = classNames.bind(styles);

const CampingInfo = () => {
  const { isDetailPannelOpen, closeDetailPannel } = useLayoutStore();
  const { selectedItem } = useCampingStore();

  return (
    <>
      {selectedItem ? (
        <div className={cx("pannel", { "pannel--open": isDetailPannelOpen })}>
          <div
            className={cx("container", {
              "container--open": isDetailPannelOpen,
            })}
          >
            <div className={cx("header")}>
              <div className={cx("title")}>{selectedItem.facltNm}</div>

              <button
                className={cx("close-button")}
                onClick={closeDetailPannel}
              >
                X
              </button>
            </div>
            <CampingImage />

            <div className={cx("info-container")}>
              <div className={cx("info")}>
                <div className={cx("address")}>{selectedItem.addr1}</div>

                <div className={cx("reserve")}>
                  <div className={cx("tel")}>{selectedItem.tel}</div>
                  <div className={cx("homepage")}>{selectedItem.homepage}</div>
                </div>
              </div>

              {selectedItem.intro && (
                <div className={cx("intro")}>
                  <div className={cx("title")}>소개</div>
                  <div className={cx("content")}>{selectedItem.intro}</div>
                </div>
              )}

              <div className={cx("sub-info")}>
                <div className={cx("title")}>편의 시설</div>
                <div className={cx("facility")}>
                  {selectedItem.posblFcltyCl}
                </div>
                <div className={cx("facility")}>{selectedItem.sbrsCl}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CampingInfo;
