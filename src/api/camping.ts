import axios from "axios";

const MOBILE_OS = "ETC";
const MOBILE_APP = "GO_CAMPING_MAP";
const TYPE = "json";
const NUM_OF_ROWS = 10;

export const getBasedList = async () => {
  return await axios.get(
    "https://apis.data.go.kr/B551011/GoCamping/basedList",
    {
      params: {
        MobileOS: MOBILE_OS,
        MobileApp: MOBILE_APP,
        _type: TYPE,
        serviceKey: import.meta.env.VITE_API_KEY,
        numOfRows: NUM_OF_ROWS,
        pageNo: 1,
      },
    }
  );
};
