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
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

import {
  BLUR_VIEW_MAX_INTENSITY,
  MAX_OFFSET_TO_ANIMATE,
  SNAP_POINTS_HORIZONTAL,
  SPRING_CONFIG,
} from "@react-native-ios/constants/animation";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@react-native-ios/constants/ui";
import theme from "@react-native-ios/constants/theme";

type AnimatedProviderProps = {
  startPoint: number;
  snapPoint: number;
  direction: "left" | "right" | "vertical";
  offset: SharedValue<number>;
  start?: SharedValue<number>;
  children: React.ReactNode;
};

export default function AnimatedProvider({
  startPoint = 0,
  snapPoint = 0,
  direction,
  offset,
  start,
  children,
}: AnimatedProviderProps) {
  const { top } = useSafeAreaInsets();
  const direMultiply = useSharedValue(direction == "right" ? -1 : 1);

  const animatedBlurBackdropStyles = useAnimatedStyle(() => {
    return {
      zIndex:
        offset.value * direMultiply.value > startPoint * direMultiply.value
          ? 10
          : -1,
    };
  });

  const animatedBlurBackdropProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        offset.value * direMultiply.value,
        [startPoint * direMultiply.value, snapPoint * direMultiply.value],
        [0, BLUR_VIEW_MAX_INTENSITY],
        Extrapolate.CLAMP
      ),
    };
  });

  const animatedContentStyles = useAnimatedStyle(
    () => ({
      opacity:
        direction == "vertical"
          ? interpolate(
              offset.value * direMultiply.value,
              [startPoint * direMultiply.value, snapPoint * direMultiply.value],
              [0, 1],
              Extrapolate.CLAMP
            )
          : 1,
      transform:
        direction === "vertical"
          ? [{ translateY: offset.value - MAX_OFFSET_TO_ANIMATE }]
          : [
              {
                translateX: interpolate(
                  offset.value * direMultiply.value,
                  [
                    startPoint * direMultiply.value,
                    snapPoint * direMultiply.value,
                  ],
                  [SCREEN_WIDTH * (direction === "right" ? 1 : -1), 0],
                  Extrapolate.CLAMP
                ),
              },
            ],
    }),
    [offset]
  );

  const handleTapOutside = () => {
    offset.value = withSpring(startPoint, SPRING_CONFIG);
    if (start) start.value = withSpring(startPoint, SPRING_CONFIG);
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
          <View style={styles.container}>
            <Animated.View
              style={[
                styles.contentContainer,
                { marginTop: top + theme.spacing.sm },
                animatedContentStyles,
              ]}
            >
              {children}
            </Animated.View>
          </View>
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
    display: "flex",
    flexDirection: "column",
  },
  blurBackdrop: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
});
