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

type AnimatedProviderProps = {
  isSearchActive: SharedValue<number>;
  offsetY: SharedValue<number>;
  children: React.ReactNode;
};

export default function AnimatedProvider({
  isSearchActive,
  offsetY,
  children,
}: AnimatedProviderProps) {
  const { top } = useSafeAreaInsets();

  const animatedBackdropStyles = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        offsetY.value,
        [0, MAX_OFFSET_TO_ANIMATE],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }),
    [offsetY]
  );

  const animatedBlurBackdropStyles = useAnimatedStyle(() => {
    return {
      zIndex: isSearchActive.value === 1 ? 10 : offsetY.value > 1 ? 10 : -1,
    };
  });

  const animatedBlurBackdropProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        offsetY.value,
        [0, MAX_OFFSET_TO_ANIMATE],
        [0, BLUR_VIEW_MAX_INTENSITY],
        Extrapolate.CLAMP
      ),
    };
  });

  const animatedContentStyles = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        offsetY.value,
        [MAX_OFFSET_TO_ANIMATE / 10, MAX_OFFSET_TO_ANIMATE / 2],
        [0, 1],
        Extrapolate.CLAMP
      ),
      transform: [{ translateY: offsetY.value - MAX_OFFSET_TO_ANIMATE }],
    }),
    [offsetY]
  );

  const handleTapOutside = () => {
    isSearchActive.value = 0;
    offsetY.value = withSpring(0, SPRING_CONFIG);
    Keyboard.dismiss();
  };

  return (
    <>
      <Animated.View style={[styles.backdrop, animatedBackdropStyles]} />
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
    paddingHorizontal: 8,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.black.black75,
  },
  blurBackdrop: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
});
