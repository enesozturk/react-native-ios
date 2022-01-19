import {
  handleGestureOnEnd,
  handleGestureOnStart,
  handleGestureOnUpdate,
} from "@react-native-ios/utils/swipeableGestureHandlers";
import { Gesture } from "react-native-gesture-handler";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type useGestureHandlerProps = {
  startX: SharedValue<number>;
  offsetX: SharedValue<number>;
  offsetY?: SharedValue<number>;
};

const useGestureHandler = ({
  startX,
  offsetX,
  offsetY,
}: useGestureHandlerProps) => {
  const direction = useSharedValue(0);
  const destination = useSharedValue(0);

  const swipeableProviderGesture = Gesture.Pan()
    .onStart((e) => {
      handleGestureOnStart({
        direction,
        e,
        startX,
      });
    })
    .onUpdate((e) => {
      handleGestureOnUpdate({
        direction,
        e,
        startX,
        offsetX,
        offsetY,
      });
    })
    .onEnd((e) => {
      handleGestureOnEnd({
        direction,
        e,
        startX,
        offsetX,
        offsetY,
        destination,
      });
    });

  return { swipeableProviderGesture };
};

export default useGestureHandler;
