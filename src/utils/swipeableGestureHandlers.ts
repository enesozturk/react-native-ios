import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

import { handleOnEndHorizontal } from "@react-native-ios/configs/horizontalGestureCalculations";
import { handleOnEndVertical } from "@react-native-ios/configs/verticalGestureCalculations";

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
    handleOnEndHorizontal({
      e,
      startX,
      offsetX,
    });
  } else {
    handleOnEndVertical({
      e,
      isSearchActive,
      offsetY,
    });
  }
};
