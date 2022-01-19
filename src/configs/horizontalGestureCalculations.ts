import { SharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";

import {
  MIN_VELOCITY_Y_TO_ACTIVATE,
  SNAP_POINTS_HORIZONTAL_AS_ARRAY,
  SPRING_CONFIG,
} from "@react-native-ios/constants/animation";
import { SCREEN_WIDTH } from "@react-native-ios/constants/ui";

type handleOnUpdateHorizontalProps = {
  e: PanGestureHandlerEventPayload;
  startX: SharedValue<number>;
  offsetX: SharedValue<number>;
};

const getNextSnapPoint = (offset: number) => {
  "worklet";

  let nextSnapPointAvailable = false;
  let snapPoint = 0;

  for (let i = 2; i < 10; i += 2) {
    if (
      offset <= SNAP_POINTS_HORIZONTAL_AS_ARRAY[i - 1] &&
      offset >= SNAP_POINTS_HORIZONTAL_AS_ARRAY[i + 1]
    ) {
      snapPoint = SNAP_POINTS_HORIZONTAL_AS_ARRAY[i];
      nextSnapPointAvailable = true;
    }
  }

  return nextSnapPointAvailable ? snapPoint : -1;
};

export const handleOnEndHorizontal = ({
  e,
  startX,
  offsetX,
}: handleOnUpdateHorizontalProps & {
  destination: SharedValue<number>;
}) => {
  "worklet";

  const velocity = Math.abs(e.velocityX);
  const direction = e.translationX < 0 ? "right" : "left";
  const nextXValue =
    direction === "right"
      ? offsetX.value - SCREEN_WIDTH
      : offsetX.value + SCREEN_WIDTH;

  startX.value = startX.value + e.translationX;

  if (velocity > MIN_VELOCITY_Y_TO_ACTIVATE) {
    const nextSnapPoint = getNextSnapPoint(nextXValue);
    if (nextSnapPoint !== -1) {
      offsetX.value = withSpring(nextSnapPoint, {
        ...SPRING_CONFIG,
        velocity,
      });
      startX.value = withSpring(nextSnapPoint, {
        ...SPRING_CONFIG,
        velocity,
      });
    }
  } else {
    const nextSnapPoint2 = getNextSnapPoint(offsetX.value + e.translationX);
    console.log("else", nextSnapPoint2);
    offsetX.value = withSpring(nextSnapPoint2, {
      ...SPRING_CONFIG,
      velocity,
    });
    startX.value = withSpring(nextSnapPoint2, {
      ...SPRING_CONFIG,
      velocity,
    });
  }
};
