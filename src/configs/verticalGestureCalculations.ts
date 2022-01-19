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
  offsetY: SharedValue<number>;
};

export const handleOnEndVertical = ({
  e,
  offsetY,
}: handleOnUpdateVerticalProps) => {
  "worklet";

  const velocity = Math.abs(e.velocityY);
  const translation = Math.abs(e.translationY);

  if (
    translation > DISTANCE_TO_ACTIVATE ||
    velocity > MIN_VELOCITY_Y_TO_ACTIVATE
  ) {
    offsetY.value = withSpring(MAX_OFFSET_TO_ANIMATE, {
      ...SPRING_CONFIG,
      overshootClamping: false,
      velocity,
    });
  } else {
    offsetY.value = withSpring(0, SPRING_CONFIG);
  }
};
