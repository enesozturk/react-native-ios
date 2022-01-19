import React from "react";
import { StyleSheet, View } from "react-native";

import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { SharedValue, withSpring } from "react-native-reanimated";

import { SPRING_CONFIG } from "@react-native-ios/constants/animation";
import theme from "@react-native-ios/constants/theme";

type CancelButtonProps = {
  active: SharedValue<number>;
  cancelTextWidth: SharedValue<number>;
  animatedCancelTextStyles: any;
  onClose: () => void;
};

export default function CancelButton({
  active,
  cancelTextWidth,
  animatedCancelTextStyles,
  onClose,
}: CancelButtonProps) {
  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        cancelTextWidth.value = e.nativeEvent.layout.width;
      }}
    >
      <TapGestureHandler
        onEnded={() => {
          onClose?.();
          active.value = withSpring(0, SPRING_CONFIG);
        }}
      >
        <Animated.Text style={[styles.cancelText, animatedCancelTextStyles]}>
          Cancel
        </Animated.Text>
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm13,
    display: "flex",
    flexDirection: "row",
  },
  cancelText: {
    ...theme.font.body,
    color: theme.colors.white.white50,
    height: "100%",
    marginLeft: 4,
  },
});
