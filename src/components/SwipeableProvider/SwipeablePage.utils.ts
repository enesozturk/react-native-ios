import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { SharedValue, withSpring, withTiming } from "react-native-reanimated";

import {
  DISTANCE_TO_ACTIVATE,
  MAX_OFFSET_TO_ANIMATE,
  MIN_VELOCITY_Y_TO_ACTIVATE,
  SPRING_CONFIG,
} from "@react-native-ios/constants/animation";

type GestureHandlerProps = {
  isSearchActive: SharedValue<number>;
  offsetY: SharedValue<number>;
  e: PanGestureHandlerEventPayload;
};

export const handleGestureOnStart = ({
  isSearchActive,
  offsetY,
  e,
}: GestureHandlerProps) => {
  "worklet";
  offsetY.value = Math.max(0, e.translationY);
};

export const handleGestureOnUpdate = ({
  isSearchActive,
  offsetY,
  e,
}: GestureHandlerProps) => {
  "worklet";
  offsetY.value = Math.max(0, e.translationY);
};

export const handleGestureOnEnd = ({
  isSearchActive,
  offsetY,
  e,
}: GestureHandlerProps) => {
  "worklet";
  // Left and Right Page Calculations

  // Search Page Calculations
  if (
    e.velocityY > MIN_VELOCITY_Y_TO_ACTIVATE &&
    e.translationY < DISTANCE_TO_ACTIVATE
  ) {
    // todo: why?
    // isSearchActive.value = 1;
    // offsetYSearch.value = withTiming(MAX_OFFSET_TO_ANIMATE, {
    //   duration: 300,
    // });
    offsetY.value = withTiming(MAX_OFFSET_TO_ANIMATE, { duration: 300 });
  } else if (e.translationY >= DISTANCE_TO_ACTIVATE) {
    isSearchActive.value = 1;
    offsetY.value = withSpring(MAX_OFFSET_TO_ANIMATE, SPRING_CONFIG);
  } else {
    offsetY.value = withSpring(0, SPRING_CONFIG);
  }
};
