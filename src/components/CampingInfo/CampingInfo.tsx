import styles from "./CampingInfo.module.scss";
import classNames from "classnames/bind";
import CampingImage from "./CampingImage/CampingImage";
import { useLayoutStore } from "../../store/layout";
import { useCampingStore } from "../../store/camping";
import { useMemo } from "react";

const cx = classNames.bind(styles);

const CampingInfo = () => {
  const { isDetailPannelOpen, closeDetailPannel } = useLayoutStore();
  const { selectedItem } = useCampingStore();

  const campFacility = useMemo(
    () => (selectedItem ? selectedItem.posblFcltyCl + selectedItem.sbrsCl : ""),
    [selectedItem]
  );

  return (
    <>
      {selectedItem ? (
        <div className={cx("pannel", { "pannel--open": isDetailPannelOpen })}>
          <div className={cx("container")}>
            <CampingImage />

            <button className={cx("close-button")} onClick={closeDetailPannel}>
              X
            </button>

            <div className={cx("header")}>
              <div className={cx("title-info")}>
                <div className={cx("title")}>{selectedItem.facltNm}</div>
                <div className={cx("induty")}>{selectedItem.induty}</div>
              </div>

              {selectedItem.lineIntro && (
                <div className={cx("line-intro")}>{selectedItem.lineIntro}</div>
              )}
            </div>

            <div className={cx("reserve-info")}>
              <div className={cx("address")}>{selectedItem.addr1}</div>
              <div className={cx("tel")}>{selectedItem.tel}</div>
              <a className={cx("homepage")}>{selectedItem.homepage}</a>
            </div>

            {selectedItem.intro && (
              <div className={cx("info")}>
                <div className={cx("title")}>소개</div>
                <div className={cx("content")}>{selectedItem.intro}</div>
              </div>
            )}

            {campFacility && (
              <div className={cx("info")}>
                <div className={cx("title")}>편의시설 및 서비스</div>
                <div className={cx("content")}>
                  - {selectedItem.posblFcltyCl}
                </div>
                <div className={cx("content")}>- {selectedItem.sbrsCl}</div>
              </div>
            )}

            {selectedItem.themaEnvrnCl && (
              <div className={cx("info")}>
                <div className={cx("title")}>주변 테마</div>
                <div className={cx("content")}>{selectedItem.themaEnvrnCl}</div>
              </div>
            )}

            {/* {posblFcltyCl && <div className={cx("chip")}>{posblFcltyCl}</div>}
        {sbrsCl && <div className={cx("chip")}>{sbrsCl}</div>}
        {themaEnvrnCl && <div className={cx("chip")}>{themaEnvrnCl}</div>} */}

            {/* <div className={cx("info-container")}>
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
            </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CampingInfo;
