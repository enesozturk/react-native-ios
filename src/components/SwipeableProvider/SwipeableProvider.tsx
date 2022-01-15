import React from "react";
import { StyleSheet } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  handleGestureOnEnd,
  handleGestureOnUpdate,
} from "./SwipeablePage.utils";

import Search from "@react-native-ios/screens/Search";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@react-native-ios/constants/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "@react-native-ios/constants/theme";

type SwipeableProviderProps = {
  children: React.ReactNode;
};

export default function SwipeableProvider({
  children,
}: SwipeableProviderProps) {
  const { top } = useSafeAreaInsets();
  const offsetY = useSharedValue(0);
  const isSearchActive = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      handleGestureOnUpdate({
        isSearchActive,
        offsetY,
        e,
      });
    })
    .onEnd((e) => {
      handleGestureOnEnd({
        isSearchActive,
        offsetY,
        e,
      });
    });

  return (
    <>
      <Search {...{ isSearchActive, offsetY }} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.container,
            { paddingTop: top + theme.spacing.md },
            animatedStyles,
          ]}
        >
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
