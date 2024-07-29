import { useQuery } from "@tanstack/react-query";
import {
  getBasedList,
  getImageList,
  getLocationBasedList,
  getSearchList,
} from "../../api/camping";

const BasedList = () => {
  const { data } = useQuery({
    queryKey: ["based-list"],
    queryFn: () => getBasedList(),
  });

  console.log("data :", data);

  const { data: imageList } = useQuery({
    queryKey: ["image-list"],
    queryFn: () => getImageList({ pageNo: 1, contentId: "10" }),
  });

  console.log("ima :", imageList);

  const { data: searchList } = useQuery({
    queryKey: ["search-list"],
    queryFn: () => getSearchList({ pageNo: 1, keyword: "야영장" }),
  });

  console.log("serach :", searchList);

  const { data: locationList } = useQuery({
    queryKey: ["location-list"],
    queryFn: () =>
      getLocationBasedList({
        pageNo: 1,
        mapX: "127.5117778",
        mapY: "37.82883056",
        radius: "10000",
      }),
  });

  console.log("location :", locationList);

  return <div>basedlist</div>;
};

export default BasedList;
