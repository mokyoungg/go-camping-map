import apiRequest from ".";
import { ICampItem, IImageItem } from "../type/camping";

export const getBasedList = async (pageNo: number = 1) => {
  return await apiRequest.get<ICampItem[]>("/basedList", {
    params: {
      pageNo,
    },
  });
};

export const getLocationBasedList = async ({
  pageNo = 1,
  mapX,
  mapY,
  radius,
}: {
  pageNo: number;
  mapX: string;
  mapY: string;
  radius: string;
}) => {
  return await apiRequest.get<ICampItem[]>("/locationBasedList", {
    params: {
      pageNo,
      mapX,
      mapY,
      radius,
    },
  });
};

export const getSearchList = async ({
  pageNo = 1,
  keyword,
}: {
  pageNo: number;
  keyword: string;
}) => {
  return await apiRequest.get<ICampItem[]>("/searchList", {
    params: {
      pageNo,
      keyword,
    },
  });
};

export const getImageList = async ({
  pageNo = 1,
  contentId,
}: {
  pageNo: number;
  contentId: string;
}) => {
  return await apiRequest.get<IImageItem[]>("/imageList", {
    params: {
      pageNo,
      contentId,
    },
  });
};
