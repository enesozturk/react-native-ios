import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import { BlurView } from "expo-blur";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

import {
  BLUR_VIEW_MAX_INTENSITY,
  MAX_OFFSET_TO_ANIMATE,
  SPRING_CONFIG,
} from "@react-native-ios/constants/animation";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@react-native-ios/constants/ui";
import theme from "@react-native-ios/constants/theme";
import { SNAP_POINTS_X } from "./SwipeablePage.utils";

type AnimatedProviderProps = {
  offsetX: SharedValue<number>;
  startX: SharedValue<number>;
  children: React.ReactNode;
};

export default function RightSearch({
  offsetX,
  startX,
  children,
}: AnimatedProviderProps) {
  const { top } = useSafeAreaInsets();

  const animatedBlurBackdropStyles = useAnimatedStyle(() => {
    return {
      zIndex: offsetX.value < SNAP_POINTS_X[2] ? 10 : -1,
    };
  });

  const animatedContentStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            offsetX.value,
            [SNAP_POINTS_X[2], SNAP_POINTS_X[4]],
            [SNAP_POINTS_X[2] * -1, SNAP_POINTS_X[0] * -1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const animatedBlurBackdropProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        offsetX.value,
        [SNAP_POINTS_X[2], SNAP_POINTS_X[3]],
        [0, BLUR_VIEW_MAX_INTENSITY],
        Extrapolate.CLAMP
      ),
    };
  });

  //   const animatedContentStyles = useAnimatedStyle(
  //     () => ({
  //       opacity: interpolate(
  //         offsetX.value,
  //         [MAX_OFFSET_TO_ANIMATE / 10, MAX_OFFSET_TO_ANIMATE / 2],
  //         [0, 1],
  //         Extrapolate.CLAMP
  //       ),
  //       transform: [{ translateY: offsetX.value - MAX_OFFSET_TO_ANIMATE }],
  //     }),
  //     [offsetX]
  //   );

  const handleTapOutside = () => {
    offsetX.value = withSpring(SNAP_POINTS_X[2], SPRING_CONFIG);
    startX.value = withSpring(SNAP_POINTS_X[2], SPRING_CONFIG);
    Keyboard.dismiss();
  };

  return (
    <>
      <AnimatedBlurView
        tint="dark"
        animatedProps={animatedBlurBackdropProps}
        style={[styles.blurBackdrop, animatedBlurBackdropStyles]}
      >
        <TapGestureHandler numberOfTaps={1} onEnded={handleTapOutside}>
          <Animated.View
            style={[styles.contentContainer, animatedContentStyles]}
          >
            {children}
          </Animated.View>
        </TapGestureHandler>
      </AnimatedBlurView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 8,
    backgroundColor: "red",
  },
  blurBackdrop: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
});
