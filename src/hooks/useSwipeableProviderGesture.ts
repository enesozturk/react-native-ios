import {
  handleGestureOnEnd,
  handleGestureOnStart,
  handleGestureOnUpdate,
} from "@react-native-ios/utils/swipeableGestureHandlers";
import { Gesture } from "react-native-gesture-handler";

const useSwipeableProviderGesture = ({
  direction,
  isSearchActive,
  startX,
  offsetX,
  offsetY,
}) => {
  const swipeableProviderGesture = Gesture.Pan()
    .onStart((e) => {
      handleGestureOnStart({
        direction,
        e,
      });
    })
    .onUpdate((e) => {
      handleGestureOnUpdate({
        direction,
        startX,
        isSearchActive,
        offsetY,
        offsetX,
        e,
      });
    })
    .onEnd((e) => {
      handleGestureOnEnd({
        direction,
        startX,
        isSearchActive,
        offsetY,
        offsetX,
        e,
      });
    });

  return { swipeableProviderGesture };
};

export default useSwipeableProviderGesture;
