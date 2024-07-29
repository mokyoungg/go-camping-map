import axios, { AxiosRequestConfig } from "axios";

const baseURL = `https://apis.data.go.kr/B551011/GoCamping`;

const MOBILE_OS = "ETC";
const MOBILE_APP = "GO_CAMPING_MAP";
const TYPE = "json";
const NUM_OF_ROWS = 10;

const baseInstance = axios.create({
  baseURL,
  params: {
    MobileOS: MOBILE_OS,
    MobileApp: MOBILE_APP,
    _type: TYPE,
    serviceKey: import.meta.env.VITE_API_KEY,
    numOfRows: NUM_OF_ROWS,
  },
});

export interface ResponseData<T> {
  body: {
    numOfRows: number;
    pageNo: number;
    totalCount: number;
    items: T;
  };
}

baseInstance.interceptors.response.use(
  ({ data }) => {
    if (data?.response?.body) {
      return data.response.body;
    } else {
      throw new Error("Unexpected response structure");
    }
  },
  (error) => {
    if (!error.response) {
      throw error;
    }

    const { data } = error.response;

    throw data || {};
  }
);

const apiRequest = {
  get: <T = undefined>(url: string, request?: AxiosRequestConfig) =>
    baseInstance.get<T, ResponseData<T>>(url, request),
};

export default apiRequest;
