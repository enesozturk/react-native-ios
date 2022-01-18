import { SharedValue, withTiming } from "react-native-reanimated";
import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";

import { SNAP_POINTS_HORIZONTAL } from "@react-native-ios/constants/animation";

type handleOnUpdateHorizontalProps = {
  e: PanGestureHandlerEventPayload;
  startX: SharedValue<number>;
  offsetX: SharedValue<number>;
};

export const handleOnEndHorizontal = ({
  e,
  startX,
  offsetX,
}: handleOnUpdateHorizontalProps) => {
  "worklet";

  const tX = e.translationX + startX.value;

  if (
    tX > SNAP_POINTS_HORIZONTAL.FIRST_PAGE_HALF &&
    tX < SNAP_POINTS_HORIZONTAL.LEFT_PAGE_HALF
  ) {
    offsetX.value = startX.value = withTiming(SNAP_POINTS_HORIZONTAL.ORIGIN, {
      duration: 300,
    });
  } else if (
    tX < SNAP_POINTS_HORIZONTAL.SECOND_PAGE_HALF &&
    tX > SNAP_POINTS_HORIZONTAL.RIGHT_PAGE
  ) {
    offsetX.value = startX.value = withTiming(
      SNAP_POINTS_HORIZONTAL.RIGHT_PAGE,
      {
        duration: 300,
      }
    );
  } else if (tX > SNAP_POINTS_HORIZONTAL.LEFT_PAGE_HALF) {
    offsetX.value = startX.value = withTiming(
      SNAP_POINTS_HORIZONTAL.SECOND_PAGE * -1,
      {
        duration: 300,
      }
    );
  } else {
    offsetX.value = startX.value = withTiming(
      SNAP_POINTS_HORIZONTAL.SECOND_PAGE,
      {
        duration: 300,
      }
    );
  }
};
