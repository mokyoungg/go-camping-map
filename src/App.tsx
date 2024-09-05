import styles from "./App.module.scss";
import classNames from "classnames/bind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./components/Map/Map";
import SideBar from "./components/SideBar/SideBar";

import BottomSheet from "./components/BottomSheet/BottomSheet";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

const queryClient = new QueryClient();

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 창 크기가 변경될 때마다 상태를 업데이트
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={cx("container")}>
        {!isMobile && <SideBar />}
        <Map />

        {isMobile && <BottomSheet />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
