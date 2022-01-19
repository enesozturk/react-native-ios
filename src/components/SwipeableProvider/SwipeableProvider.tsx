import React from "react";

import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import Search from "@react-native-ios/screens/Search";
import RightSearch from "@react-native-ios/screens/Search/RightSearch";
import LeftSearch from "@react-native-ios/screens/Search/LeftSearch";
import useSwipeableProvider from "@react-native-ios/hooks/useSwipeableProvider";

import styles from "./SwipeableProvider.styles";

type SwipeableProviderProps = {
  pages: React.ReactNode[];
};

export default function SwipeableProvider({ pages }: SwipeableProviderProps) {
  const {
    offsetY,
    offsetX,
    startX,
    animatedStyles,
    animatedPageContainerStyles,
    animatedPagesContainerStyles,
    swipeableProviderGesture,
  } = useSwipeableProvider();

  return (
    <>
      <Search {...{ offsetY }} />
      <LeftSearch {...{ offsetX, startX }} />
      <RightSearch {...{ offsetX, startX }} />
      <GestureDetector gesture={swipeableProviderGesture}>
        <Animated.View style={[styles.container, animatedStyles]}>
          <Animated.View
            style={[styles.pagesContainer, animatedPagesContainerStyles]}
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
