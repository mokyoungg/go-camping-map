import styles from "./BottomSheet.module.scss";
import classNames from "classnames/bind";
import CampingList from "../CampingList/CampingList";
import SearchBar from "../SearchBar/SearchBar";
import { useRef, TouchEvent } from "react";

const cx = classNames.bind(styles);

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향
  };
  isContentAreaTouched: boolean;
}

const BottomSheet = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const meticsRef = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!sheetRef.current) return;

    const { touchStart } = meticsRef.current;

    // sheetRef 의 현재 높이
    touchStart.sheetY = sheetRef.current.getBoundingClientRect().y;

    // 터치 이벤트가 발생한 높이
    touchStart.touchY = e.touches[0].clientY;
  };

  const canUserMoveBottomSheet = () => {
    if (!sheetRef.current || !contentRef.current) return;

    const { isContentAreaTouched } = meticsRef.current;

    // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀시트를 움직입니다.
    if (!isContentAreaTouched) {
      return true;
    }

    return false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!sheetRef.current) return;

    const { touchStart, touchMove } = meticsRef.current;

    // 현재 호출되는 터치 이벤트
    const currentTouch = e.touches[0];

    // touchMove 의 prevTouchY 값이 없다면
    // if (touchMove.prevTouchY === undefined) {
    if (!touchMove.prevTouchY) {
      touchMove.prevTouchY = touchStart.touchY;
    }

    // touchMove 의 prevTouchY 가 현재 터치 이벤트보다 값이 작을때
    // 터치가 밑으로 내려갈수록 y 값이 커진다.
    if (touchMove.prevTouchY < currentTouch.clientY) {
      touchMove.movingDirection = "down";
    }

    // touchMove 의 prevTouchY 가 현재 터치 이벤트보다 값이 클 때
    // 터치가 위로 올라갈수록 y 값이 작아진다.
    if (touchMove.prevTouchY > currentTouch.clientY) {
      touchMove.movingDirection = "up";
    }

    if (canUserMoveBottomSheet()) {
      // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
      const touchOffset = currentTouch.clientY - touchStart.touchY;

      // 업데이트되어야 할 sheetRef 의 y 값
      let nextSheetY = touchStart.sheetY + touchOffset;

      // sheet 위치 갱신.
      sheetRef.current.style.transform = `translateY(${nextSheetY}px)`;
    } else {
      // 컨텐츠를 스크롤하는 동안에는 body가 스크롤되는 것을 막습니다
      document.body.style.overflowY = "hidden";
    }
  };

  const handleTouchEnd = () => {
    if (!sheetRef.current) return;

    document.body.style.overflowY = "auto";

    const { touchMove } = meticsRef.current;

    if (touchMove.movingDirection === "down") {
      sheetRef.current.style.transform = `translateY(80%)`; // 화면의 80% 보이기
    }

    if (touchMove.movingDirection === "up") {
      sheetRef.current.style.transform = `translateY(0%)`; //
    }

    // metrics 초기화.
    meticsRef.current = {
      touchStart: {
        sheetY: 0,
        touchY: 0,
      },
      touchMove: {
        prevTouchY: 0,
        movingDirection: "none",
      },
      isContentAreaTouched: false,
    };
  };

  const handleContentTouchStart = () => {
    meticsRef.current.isContentAreaTouched = true;
  };

  return (
    <div
      className={cx("container", { "container--open": false })}
      ref={sheetRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={cx("header")}>
        <div className={cx("handle")} />
      </div>

      <SearchBar />

      <div
        ref={contentRef}
        onTouchStart={handleContentTouchStart}
        onTouchEnd={(e) => e.stopPropagation()}
        // onTouchMove={(e) => e.stopPropagation()}
      >
        <CampingList />
      </div>
    </div>
  );
};

export default BottomSheet;
