import styles from "./SideBar.module.scss";
import classNames from "classnames/bind";

import SearchBar from "../SearchBar/SearchBar";
import CampingList from "../CampingList/CampingList";
import { useLayoutStore } from "../../store/layout";
import { useCallback } from "react";

const cx = classNames.bind(styles);

const SideBar = () => {
  const { isListOpen, openList, closeList } = useLayoutStore();

  const handleSideBar = useCallback(() => {
    if (isListOpen) {
      closeList();
    } else {
      openList();
    }
  }, [isListOpen]);

  return (
    <div className={cx("container", { "container--open": isListOpen })}>
      <SearchBar />
      <CampingList />

      <button className={cx("handler")} onClick={handleSideBar}>
        {isListOpen ? "<" : ">"}
      </button>
    </div>
  );
};

export default SideBar;
