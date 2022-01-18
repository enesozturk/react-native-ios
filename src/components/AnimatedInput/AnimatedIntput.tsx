import React from "react";
import { TextInput } from "react-native";

import Animated, { withTiming } from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

import theme from "@react-native-ios/constants/theme";

import styles from "./AnimatedInput.styles";
import useAnimatedInput from "./AnimatedInput.hooks";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function AnimatedIntput() {
  const {
    active,
    cancelTextWidth,
    containerWidth,
    animatedContainerStyles,
    animatedContentContainerStyles,
    animatedInputContainerStyles,
    animatedInputStyles,
    animatedCancelTextStyles,
  } = useAnimatedInput();

  return (
    <Animated.View style={[styles.container, animatedContainerStyles]}>
      <Animated.View
        onLayout={(e) => {
          containerWidth.value = e.nativeEvent.layout.width;
        }}
        style={[styles.contentContainer, animatedContentContainerStyles]}
      >
        <Animated.View
          style={[styles.inputContainer, animatedInputContainerStyles]}
        >
          <AnimatedTextInput
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
        <TapGestureHandler
          onEnded={() => {
            active.value = withTiming(0, { duration: 300 });
          }}
        >
          <Animated.Text
            style={[styles.cancelText, animatedCancelTextStyles]}
            onLayout={(e) => {
              cancelTextWidth.value = e.nativeEvent.layout.width;
            }}
          >
            Cancel
          </Animated.Text>
        </TapGestureHandler>
      </Animated.View>
    </Animated.View>
  );
}
