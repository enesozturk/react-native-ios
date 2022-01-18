import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import theme from "@react-native-ios/constants/theme";

const useAnimatedInput = () => {
  const containerWidth = useSharedValue(0);
  const cancelTextWidth = useSharedValue(0);
  const active = useSharedValue(0);

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      width: "100%",
    };
  }, []);

  const animatedContentContainerStyles = useAnimatedStyle(() => {
    return {
      marginRight: interpolate(
        active.value,
        [0, 1],
        [0, cancelTextWidth.value + 8],
        Extrapolate.CLAMP
      ),
      paddingVertical: interpolate(
        active.value,
        [0, 1],
        [theme.spacing.xl, theme.spacing.md],
        Extrapolate.CLAMP
      ),
      borderRadius: interpolate(
        active.value,
        [0, 1],
        [24, 12],
        Extrapolate.CLAMP
      ),
    };
  }, [cancelTextWidth]);

  const animatedInputContainerStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: interpolate(
        active.value,
        [0, 1],
        [containerWidth.value / 2, 0],
        Extrapolate.CLAMP
      ),
    };
  }, []);

  const animatedInputStyles = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        active.value,
        [0, 1],
        [theme.font.title2.fontSize, theme.font.body.fontSize],
        Extrapolate.CLAMP
      ),
    };
  }, []);

  const animatedCancelTextStyles = useAnimatedStyle(() => {
    return {
      right: -cancelTextWidth.value - 8,
      opacity: active.value,
    };
  }, []);

  return {
    active,
    cancelTextWidth,
    containerWidth,
    animatedContainerStyles,
    animatedContentContainerStyles,
    animatedInputContainerStyles,
    animatedInputStyles,
    animatedCancelTextStyles,
  };
};

export default useAnimatedInput;
