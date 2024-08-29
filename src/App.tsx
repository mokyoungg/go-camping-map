import styles from "./App.module.scss";
import classNames from "classnames/bind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./components/Map/Map";
import SideBar from "./components/SideBar/SideBar";

const cx = classNames.bind(styles);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={cx("container")}>
        <SideBar />
        <Map />
      </div>
    </QueryClientProvider>
  );
}

export default App;
