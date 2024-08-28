import styles from "./CampingImage.module.scss";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";
import { getImageList } from "../../../api/camping";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import { useMemo } from "react";

const cx = classNames.bind(styles);

const CampingImage = () => {
  const { data: imageData } = useQuery({
    queryKey: ["image"],
    queryFn: () => getImageList({ pageNo: 1, contentId: "100006" }),
  });

  const images = useMemo(
    () =>
      imageData?.items.item.map((item) => {
        return {
          serialnum: item.serialnum,
          imageUrl: item.imageUrl,
        };
      }),
    [imageData]
  );

  return (
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
                <img className={cx("image")} src={image.imageUrl} alt="img" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CampingImage;
