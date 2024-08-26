import styles from "./App.module.scss";
import classNames from "classnames/bind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CampingList from "./components/CampingList/CampingList";
import Map from "./components/Map/Map";

const cx = classNames.bind(styles);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={cx("container")}>
        <Map />
        <CampingList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
