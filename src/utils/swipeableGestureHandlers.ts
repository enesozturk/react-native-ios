import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { cancelAnimation, SharedValue } from "react-native-reanimated";

import { handleOnEndHorizontal } from "@react-native-ios/configs/horizontalGestureCalculations";
import { handleOnEndVertical } from "@react-native-ios/configs/verticalGestureCalculations";

type GestureHandlerStartProps = {
  direction: SharedValue<number>;
  e: PanGestureHandlerEventPayload;
  startX: SharedValue<number>;
};

type GestureHandlerProps = {
  direction: SharedValue<number>;
  e: PanGestureHandlerEventPayload;
  offsetY?: SharedValue<number>;
  startX: SharedValue<number>;
  offsetX: SharedValue<number>;
};

export const handleGestureOnStart = ({
  e,
  direction,
  startX,
}: GestureHandlerStartProps) => {
  "worklet";

  cancelAnimation(startX);
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
    cancelAnimation(startX);
    offsetX.value = e.translationX + startX.value;
  } else {
    if (offsetY) offsetY.value = Math.max(0, e.translationY);
  }
};

export const handleGestureOnEnd = ({
  direction,
  offsetY,
  offsetX,
  startX,
  e,
  destination,
}: GestureHandlerProps & { destination: SharedValue<number> }) => {
  "worklet";
  if (direction.value) {
    handleOnEndHorizontal({
      e,
      startX,
      offsetX,
      destination,
    });
  } else {
    if (offsetY)
      handleOnEndVertical({
        e,
        offsetY,
      });
  }
};
