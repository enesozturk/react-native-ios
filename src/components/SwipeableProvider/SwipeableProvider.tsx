import React from "react";
import { StyleSheet } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  handleGestureOnEnd,
  handleGestureOnStart,
  handleGestureOnUpdate,
  MAX_TX_VALUE,
  MIN_TX_VALUE,
  SNAP_POINTS_HORIZONTAL,
} from "./SwipeablePage.utils";

import Search from "@react-native-ios/screens/Search";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@react-native-ios/constants/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "@react-native-ios/constants/theme";
import RightSearch from "@react-native-ios/screens/Search/RightSearch";
import LeftSearch from "@react-native-ios/screens/Search/LeftSearch";

type SwipeableProviderProps = {
  pages: React.ReactNode[];
};

export default function SwipeableProvider({ pages }: SwipeableProviderProps) {
  const { top } = useSafeAreaInsets();
  const offsetY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const startX = useSharedValue(0);
  const direction = useSharedValue(0); // 0: horizontal, 1: vertical
  const isSearchActive = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
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

  const animatedHorizontalContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Math.min(
            Math.max(offsetX.value, MIN_TX_VALUE),
            MAX_TX_VALUE
          ),
        },
      ],
    };
  }, [offsetX]);

  const gesture = Gesture.Pan()
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

  return (
    <>
      <Search {...{ isSearchActive, offsetY }} />
      <LeftSearch {...{ offsetX, startX }} />
      <RightSearch {...{ offsetX, startX }} />
      <GestureDetector gesture={gesture} key={`h-gesture`}>
        <Animated.View
          style={[
            styles.container,
            { paddingTop: top + theme.spacing.md },
            animatedStyles,
          ]}
        >
          <Animated.View
            style={[
              styles.horizontalContainer,
              animatedHorizontalContainerStyles,
            ]}
          >
            {pages.map((item) => (
              <Animated.View
                style={[styles.pageContainer, animatedPageContainerStyles]}
              >
                {item}
              </Animated.View>
            ))}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    width: SCREEN_WIDTH * 2,
    height: SCREEN_HEIGHT,
    display: "flex",
    flexDirection: "row",
  },
  pageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    display: "flex",
  },
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
