import { SharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";

import {
  DISTANCE_TO_ACTIVATE,
  MAX_OFFSET_TO_ANIMATE,
  MIN_VELOCITY_Y_TO_ACTIVATE,
  SPRING_CONFIG,
} from "@react-native-ios/constants/animation";

type handleOnUpdateVerticalProps = {
  e: PanGestureHandlerEventPayload;
  isSearchActive: SharedValue<number>;
  offsetY: SharedValue<number>;
};

export const handleOnEndVertical = ({
  e,
  isSearchActive,
  offsetY,
}: handleOnUpdateVerticalProps) => {
  "worklet";

  if (
    e.velocityY > MIN_VELOCITY_Y_TO_ACTIVATE &&
    e.translationY < DISTANCE_TO_ACTIVATE
  ) {
    offsetY.value = withSpring(MAX_OFFSET_TO_ANIMATE, {
      ...SPRING_CONFIG,
      velocity: e.velocityY,
    });
  } else if (e.translationY >= DISTANCE_TO_ACTIVATE) {
    isSearchActive.value = 1;
    offsetY.value = withSpring(MAX_OFFSET_TO_ANIMATE, SPRING_CONFIG);
  } else {
    offsetY.value = withSpring(0, SPRING_CONFIG);
  }
};
