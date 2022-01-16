import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import { BlurView } from "expo-blur";
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from "react-native-gesture-handler";
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
  SPRING_CONFIG,
} from "@react-native-ios/constants/animation";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@react-native-ios/constants/ui";
import { SNAP_POINTS_HORIZONTAL } from "@react-native-ios/components/SwipeableProvider/SwipeablePage.utils";
import LeftSearchContent from "./components/LeftSearchContent";

type AnimatedProviderProps = {
  offsetX: SharedValue<number>;
  startX: SharedValue<number>;
  children: React.ReactNode;
};

export default function LeftSearch({
  offsetX,
  startX,
  children,
}: AnimatedProviderProps) {
  const { top } = useSafeAreaInsets();

  const animatedBlurBackdropStyles = useAnimatedStyle(() => {
    return {
      zIndex: offsetX.value > SNAP_POINTS_HORIZONTAL.ORIGIN ? 10 : -1,
    };
  });

  const animatedContentStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            offsetX.value,
            [SNAP_POINTS_HORIZONTAL.ORIGIN, SNAP_POINTS_HORIZONTAL.LEFT_PAGE],
            [SNAP_POINTS_HORIZONTAL.SECOND_PAGE, SNAP_POINTS_HORIZONTAL.ORIGIN],
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
        [SNAP_POINTS_HORIZONTAL.ORIGIN, SNAP_POINTS_HORIZONTAL.LEFT_PAGE],
        [0, BLUR_VIEW_MAX_INTENSITY],
        Extrapolate.CLAMP
      ),
    };
  });

  const handleTapOutside = () => {
    offsetX.value = withSpring(SNAP_POINTS_HORIZONTAL.ORIGIN, SPRING_CONFIG);
    startX.value = withSpring(SNAP_POINTS_HORIZONTAL.ORIGIN, SPRING_CONFIG);
    Keyboard.dismiss();
  };

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      offsetX.value = SNAP_POINTS_HORIZONTAL.LEFT_PAGE + e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX < SNAP_POINTS_HORIZONTAL.FIRST_PAGE_HALF) {
        offsetX.value = startX.value = withSpring(
          SNAP_POINTS_HORIZONTAL.ORIGIN,
          SPRING_CONFIG
        );
      } else {
        offsetX.value = startX.value = withSpring(
          SNAP_POINTS_HORIZONTAL.LEFT_PAGE,
          SPRING_CONFIG
        );
      }
    });

  return (
    <>
      <AnimatedBlurView
        tint="dark"
        animatedProps={animatedBlurBackdropProps}
        style={[styles.blurBackdrop, animatedBlurBackdropStyles]}
      >
        <GestureDetector gesture={gesture}>
          <TapGestureHandler numberOfTaps={1} onEnded={handleTapOutside}>
            <Animated.View
              style={[styles.contentContainer, animatedContentStyles]}
            >
              <LeftSearchContent />
            </Animated.View>
          </TapGestureHandler>
        </GestureDetector>
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
  },
  blurBackdrop: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
});
