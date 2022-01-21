import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import theme from "@react-native-ios/constants/theme";
import { SCREEN_WIDTH } from "@react-native-ios/constants/ui";

const INPUT_WIDTH = SCREEN_WIDTH - 54;

const useAnimatedInput = () => {
  const containerWidth = useSharedValue(0);
  const cancelTextWidth = useSharedValue(0);
  const active = useSharedValue(0);

  const animatedContainerStyles = useAnimatedStyle(
    () => ({
      width: "100%",
    }),
    []
  );

  const animatedContentContainerStyles = useAnimatedStyle(
    () => ({
      height: interpolate(
        active.value,
        [0, 1],
        [22 + 26, 22 + 12], // 48 - 24 24/2 14, 38-20 18/2 7
        Extrapolate.CLAMP
      ),
      width: interpolate(
        active.value,
        [0, 1],
        [INPUT_WIDTH, INPUT_WIDTH - cancelTextWidth.value],
        Extrapolate.CLAMP
      ),
      borderRadius: interpolate(
        active.value,
        [0, 1],
        [theme.spacing.md, 12],
        Extrapolate.CLAMP
      ),
    }),
    [cancelTextWidth]
  );

  const animatedInputContainerStyles = useAnimatedStyle(
    () => ({
      position: "absolute",
      left: interpolate(
        active.value,
        [0, 1],
        [containerWidth.value / 2, 0],
        Extrapolate.CLAMP
      ),
    }),
    []
  );

  const animatedInputStyles = useAnimatedStyle(
    () => ({
      marginLeft: interpolate(
        active.value,
        [0, 1],
        [INPUT_WIDTH / 2 - 30, (theme.spacing.sm + theme.spacing.xs) * 2 - 2],
        Extrapolate.CLAMP
      ),
      marginBottom: interpolate(
        active.value,
        [0, 1],
        [4, 2],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            active.value,
            [0, 1],
            [1, 0.84],
            Extrapolate.CLAMP
          ),
        },
      ],
    }),
    []
  );

  const animatedCancelTextStyles = useAnimatedStyle(
    () => ({
      opacity: active.value,
    }),
    []
  );

  const animatedSearchIconStyles = useAnimatedStyle(
    () => ({
      opacity: 1,
      top: interpolate(active.value, [0, 1], [12, 8], Extrapolate.CLAMP),
      left: interpolate(
        active.value,
        [0, 1],
        [INPUT_WIDTH / 2 - 30 - 32, 8],
        Extrapolate.CLAMP
      ),
    }),
    []
  );

  const animatedSearchIconProps = useAnimatedStyle(
    () => ({
      width: interpolate(active.value, [0, 1], [20, 18], Extrapolate.CLAMP),
      height: interpolate(active.value, [0, 1], [20, 18], Extrapolate.CLAMP),
    }),
    []
  );

  const animatedMicIconStyles = useAnimatedStyle(
    () => ({
      opacity: active.value,
      top: interpolate(active.value, [0, 1], [14, 8], Extrapolate.CLAMP),
    }),
    []
  );

  return {
    active,
    cancelTextWidth,
    containerWidth,
    animatedSearchIconStyles,
    animatedSearchIconProps,
    animatedMicIconStyles,
    animatedContainerStyles,
    animatedContentContainerStyles,
    animatedInputContainerStyles,
    animatedInputStyles,
    animatedCancelTextStyles,
  };
};

export default useAnimatedInput;
