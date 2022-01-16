import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { SharedValue, withSpring, withTiming } from "react-native-reanimated";

import {
  DISTANCE_TO_ACTIVATE,
  MAX_OFFSET_TO_ANIMATE,
  MIN_VELOCITY_Y_TO_ACTIVATE,
  SPRING_CONFIG,
} from "@react-native-ios/constants/animation";
import { SCREEN_WIDTH } from "@react-native-ios/constants/ui";

type GestureHandlerStartProps = {
  direction: SharedValue<number>;
  e: PanGestureHandlerEventPayload;
};

type GestureHandlerProps = {
  direction: SharedValue<number>;
  e: PanGestureHandlerEventPayload;
  isSearchActive: SharedValue<number>;
  offsetY: SharedValue<number>;
  startX: SharedValue<number>;
  offsetX: SharedValue<number>;
};

export const SNAP_POINTS_HORIZONTAL = {
  LEFT_PAGE: SCREEN_WIDTH,
  LEFT_PAGE_HALF: SCREEN_WIDTH / 2,
  ORIGIN: 0,
  FIRST_PAGE_HALF: SCREEN_WIDTH / -2,
  SECOND_PAGE: SCREEN_WIDTH * -1,
  SECOND_PAGE_HALF: (SCREEN_WIDTH * -3) / 2,
  RIGHT_PAGE: SCREEN_WIDTH * -2,
};

export const SNAP_POINTS_X = [
  0,
  SCREEN_WIDTH / -2,
  SCREEN_WIDTH * -1,
  (SCREEN_WIDTH * -3) / 2,
  SCREEN_WIDTH * -2,
];
export const MIN_TX_VALUE = SNAP_POINTS_HORIZONTAL.SECOND_PAGE;
export const MAX_TX_VALUE = SNAP_POINTS_HORIZONTAL.ORIGIN;

export const handleGestureOnStart = ({
  e,
  direction,
}: GestureHandlerStartProps) => {
  "worklet";
  direction.value = Math.abs(e.translationX) > Math.abs(e.translationY) ? 1 : 0;
};

export const handleGestureOnUpdate = ({
  direction,
  offsetY,
  offsetX,
  startX,
  e,
}: GestureHandlerProps) => {
  "worklet";

  if (direction.value) {
    offsetX.value = e.translationX + startX.value;
    // offsetX.value = Math.min(
    //   Math.max(e.translationX + startX.value, MIN_TX_VALUE),
    //   MAX_TX_VALUE
    // );
  } else {
    offsetY.value = Math.max(0, e.translationY);
  }
};

export const handleGestureOnEnd = ({
  direction,
  isSearchActive,
  offsetY,
  offsetX,
  startX,
  e,
}: GestureHandlerProps) => {
  "worklet";
  if (direction.value) {
    // Left Right Page Calculations
    const tX = e.translationX + startX.value;

    if (
      tX > SNAP_POINTS_HORIZONTAL.FIRST_PAGE_HALF &&
      tX < SNAP_POINTS_HORIZONTAL.LEFT_PAGE_HALF
    ) {
      offsetX.value = withTiming(SNAP_POINTS_HORIZONTAL.ORIGIN, {
        duration: 300,
      });
      startX.value = withTiming(SNAP_POINTS_HORIZONTAL.ORIGIN, {
        duration: 300,
      });
    } else if (
      tX < SNAP_POINTS_HORIZONTAL.SECOND_PAGE_HALF &&
      tX > SNAP_POINTS_HORIZONTAL.RIGHT_PAGE
    ) {
      offsetX.value = withTiming(SNAP_POINTS_HORIZONTAL.RIGHT_PAGE, {
        duration: 300,
      });
      startX.value = withTiming(SNAP_POINTS_HORIZONTAL.RIGHT_PAGE, {
        duration: 300,
      });
    } else if (tX > SNAP_POINTS_HORIZONTAL.LEFT_PAGE_HALF) {
      offsetX.value = withTiming(SNAP_POINTS_HORIZONTAL.SECOND_PAGE * -1, {
        duration: 300,
      });
      startX.value = withTiming(SNAP_POINTS_HORIZONTAL.SECOND_PAGE * -1, {
        duration: 300,
      });
    } else {
      offsetX.value = withTiming(SNAP_POINTS_HORIZONTAL.SECOND_PAGE, {
        duration: 300,
      });
      startX.value = withTiming(SNAP_POINTS_HORIZONTAL.SECOND_PAGE, {
        duration: 300,
      });
    }
  } else {
    // Search Page Calculations
    if (
      e.velocityY > MIN_VELOCITY_Y_TO_ACTIVATE &&
      e.translationY < DISTANCE_TO_ACTIVATE
    ) {
      offsetY.value = withSpring(MAX_OFFSET_TO_ANIMATE, {
        ...SPRING_CONFIG,
        stiffness: 100,
        velocity: e.velocityY,
      });
    } else if (e.translationY >= DISTANCE_TO_ACTIVATE) {
      isSearchActive.value = 1;
      offsetY.value = withSpring(MAX_OFFSET_TO_ANIMATE, SPRING_CONFIG);
    } else {
      offsetY.value = withSpring(0, SPRING_CONFIG);
    }
  }
};
