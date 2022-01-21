import React from "react";
import { TextInput, View } from "react-native";

import Animated, { withTiming } from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

import theme from "@react-native-ios/constants/theme";
import SearchSVG from "@react-native-ios/assets/svg/search.svg";
import MichrophoneSVG from "@react-native-ios/assets/svg/michrophone.svg";

import styles from "./AnimatedInput.styles";
import useAnimatedInput from "./AnimatedInput.hooks";
import { useRef } from "react";
import CancelButton from "./CancelButton";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedSearchIcon = Animated.createAnimatedComponent(SearchSVG);

export default function AnimatedIntput() {
  const {
    active,
    cancelTextWidth,
    containerWidth,
    animatedSearchIconStyles,
    animatedMicIconStyles,
    animatedSearchIconProps,
    animatedContainerStyles,
    animatedContentContainerStyles,
    animatedInputStyles,
    animatedCancelTextStyles,
  } = useAnimatedInput();
  const inputRef = useRef(null);

  return (
    <TapGestureHandler onEnded={() => {}}>
      <Animated.View style={[styles.container, animatedContainerStyles]}>
        <TapGestureHandler
          onEnded={() => {
            inputRef?.current?.focus();
            active.value = withTiming(1, { duration: 300 });
          }}
        >
          <Animated.View
            onLayout={(e) => {
              containerWidth.value = e.nativeEvent.layout.width;
            }}
            style={[styles.contentContainer, animatedContentContainerStyles]}
          >
            <Animated.View
              style={[styles.searchIconContainer, animatedSearchIconStyles]}
            >
              <AnimatedSearchIcon
                animatedProps={animatedSearchIconProps}
                fill={theme.colors.white.white50}
              />
            </Animated.View>
            <Animated.View
              style={[styles.michrophoneIconContainer, animatedMicIconStyles]}
            >
              <MichrophoneSVG height={18} fill={theme.colors.white.white50} />
            </Animated.View>
            <AnimatedTextInput
              ref={inputRef}
              placeholder="Search"
              placeholderTextColor={theme.colors.white.white75}
              autoCorrect={false}
              autoCompleteType="off"
              keyboardAppearance="dark"
              style={[styles.input, animatedInputStyles]}
              onFocus={() => {
                active.value = withTiming(1, { duration: 300 });
              }}
              onBlur={() => {
                active.value = withTiming(0, { duration: 300 });
              }}
            />
          </Animated.View>
        </TapGestureHandler>
        <CancelButton
          active={active}
          animatedCancelTextStyles={animatedCancelTextStyles}
          onClose={() => {
            inputRef?.current?.blur();
          }}
          cancelTextWidth={cancelTextWidth}
        />
      </Animated.View>
    </TapGestureHandler>
  );
}
