import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const BlurViewInsesity = 80;
export const SPRING_CONFIG = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/ui";

export default function SwipeablePage({ children }) {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const isSearchActive = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        {
          translateY: offsetY.value,
        },
        // { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      //   backgroundColor: isPressed.value ? "yellow" : "blue",
    };
  });
  const searchAnimatedStyles = useAnimatedStyle(() => {
    return {
      zIndex: isSearchActive.value === 1 ? 10 : offsetY.value > 1 ? 10 : -1,
    };
  });
  const searchAnimatedProps = useAnimatedProps(() => {
    return {
      intensity:
        isSearchActive.value === 1
          ? BlurViewInsesity
          : interpolate(
              offsetY.value,
              [0, 50],
              [0, BlurViewInsesity],
              Extrapolate.CLAMP
            ),
    };
  });

  const start = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      const tX = Math.abs(e.translationX);
      const tY = Math.abs(e.translationY);

      if (tX < 10 && tY < 10) {
        // console.log(e.translationX, e.translationY);
      } else {
        if (tX > tY) {
          offsetY.value = 0;
          offsetX.value = e.translationX + start.value.x; // todo: add left right animations & gestures
        } else {
          offsetY.value = e.translationY;
          offsetX.value = 0;
        }
      }
    })
    .onEnd((e) => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      offsetX.value = offset.value.x;

      if (e.translationY > 80 || e.velocityY > 0.5) {
        offsetY.value = withSpring(80, SPRING_CONFIG, (finishes) => {
          if (finishes) isSearchActive.value = 1;
        });
      } else {
        // isSearchActive.value = 0;
        offsetY.value = withSpring(0, SPRING_CONFIG);
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <>
      <AnimatedBlurView
        tint="default"
        animatedProps={searchAnimatedProps}
        style={[styles.searchContainer, searchAnimatedStyles]}
      >
        <TapGestureHandler
          numberOfTaps={1}
          onBegan={() => {
            isSearchActive.value = 0;
            offsetY.value = withSpring(0, SPRING_CONFIG);
          }}
        >
          <View style={styles.container} />
        </TapGestureHandler>
      </AnimatedBlurView>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyles]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  searchContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
});
