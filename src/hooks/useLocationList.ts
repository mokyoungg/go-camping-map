import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocationStore } from "../store/location";
import { getLocationBasedList } from "../api/camping";
import { useCallback, useMemo } from "react";
import { ICampItem } from "../type/camping";
import { ZOOM_LEVEL } from "../type/camping";

const useLocationList = () => {
  const { lat, lng, zoomLevel } = useLocationStore();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["location-list", lat, lng, zoomLevel],
    queryFn: ({ pageParam }) =>
      getLocationBasedList({
        pageNo: pageParam,
        mapX: lat.toString(),
        mapY: lng.toString(),
        radius: ZOOM_LEVEL[zoomLevel].toString(),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.totalCount / lastPage.numOfRows);
      const nextPage = pages.length + 1;

      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const locationBasedList = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.reduce((acc: ICampItem[], cur) => {
      if (cur?.items?.item) {
        return acc.concat(cur.items.item);
      }

      return acc;
    }, []);
  }, [data]);

  const isPossibleGetData = useMemo(
    () => hasNextPage && !isFetching,
    [hasNextPage, isFetching]
  );

  const loadMoreData = useCallback(() => {
    if (!isPossibleGetData) return;

    console.log("call here");
    fetchNextPage();
  }, [fetchNextPage, isPossibleGetData]);

  return {
    locationBasedList,
    isPossibleGetData,
    loadMoreData,
  };
};

export default useLocationList;
