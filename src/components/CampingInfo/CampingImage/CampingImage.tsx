import styles from "./CampingImage.module.scss";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";
import { getImageList } from "../../../api/camping";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import { useMemo } from "react";
import { useCampingStore } from "../../../store/camping";

const cx = classNames.bind(styles);

const CampingImage = () => {
  const { selectedItem } = useCampingStore();

  const { data: imageData } = useQuery({
    queryKey: ["image", selectedItem],
    queryFn: () =>
      getImageList({ pageNo: 1, contentId: selectedItem?.contentId || "" }),
    enabled: selectedItem?.contentId ? true : false,
  });

  const images = useMemo(
    () =>
      imageData
        ? imageData?.items.item.map((item) => {
            return {
              serialnum: item.serialnum,
              imageUrl: item.imageUrl,
            };
          })
        : [],
    [imageData]
  );

  return (
    <>
      {images.length > 0 ? (
        <div className={cx("container")}>
          <Swiper
            style={{ height: "100%" }}
            navigation={true}
            modules={[Navigation]}
          >
            {images &&
              images.map((image) => (
                <SwiperSlide key={image.serialnum}>
                  <div className={cx("image-wrapper")}>
                    <img
                      className={cx("image")}
                      src={image.imageUrl}
                      alt="img"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
};

export default CampingImage;
