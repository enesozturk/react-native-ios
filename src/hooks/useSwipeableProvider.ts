import { useEffect } from "react";

import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  MAX_OFFSET_TO_ANIMATE,
  SNAP_POINTS_HORIZONTAL,
} from "@react-native-ios/constants/animation";
import theme from "@react-native-ios/constants/theme";
import useSwipeableProviderGesture from "./useSwipeableProviderGesture";

const useSwipeableProvider = () => {
  const { top } = useSafeAreaInsets();
  const offsetY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const startX = useSharedValue(0);
  const direction = useSharedValue(0); // 0: horizontal, 1: vertical
  const isSearchActive = useSharedValue(0);
  const { swipeableProviderGesture } = useSwipeableProviderGesture({
    direction,
    isSearchActive,
    offsetY,
    offsetX,
    startX,
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
      opacity: interpolate(
        offsetY.value,
        [0, MAX_OFFSET_TO_ANIMATE],
        [1, 0.6],
        Extrapolate.CLAMP
      ),
      paddingTop: top + theme.spacing.md,
    };
  });

  const animatedPageContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale:
            offsetX.value > 0
              ? interpolate(
                  offsetX.value,
                  [
                    SNAP_POINTS_HORIZONTAL.LEFT_PAGE,
                    SNAP_POINTS_HORIZONTAL.ORIGIN,
                  ],
                  [0.85, 1],
                  Extrapolate.CLAMP
                )
              : interpolate(
                  offsetX.value,
                  [
                    SNAP_POINTS_HORIZONTAL.SECOND_PAGE,
                    SNAP_POINTS_HORIZONTAL.RIGHT_PAGE,
                  ],
                  [1, 0.85],
                  Extrapolate.CLAMP
                ),
        },
      ],
    };
  });

  const animatedPagesContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Math.min(
            Math.max(offsetX.value, SNAP_POINTS_HORIZONTAL.SECOND_PAGE),
            SNAP_POINTS_HORIZONTAL.ORIGIN
          ),
        },
      ],
    };
  }, [offsetX]);

  return {
    offsetY,
    offsetX,
    startX,
    direction,
    isSearchActive,
    animatedStyles,
    animatedPageContainerStyles,
    animatedPagesContainerStyles,
    swipeableProviderGesture,
  };
};

export default useSwipeableProvider;
