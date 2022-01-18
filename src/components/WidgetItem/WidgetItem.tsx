import { BlurView } from "expo-blur";
import React from "react";
import { View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

import { WIDGET_SQUARE_SIZE, WIDGET_WIDE_SIZE } from "./WidgetItem.constants";
import styles from "./WidgetItem.styles";

export default function WidgetItem({ children, containerStyles, wide }) {
  return (
    <TapGestureHandler onEnded={() => {}}>
      <View
        style={[
          styles.container,
          containerStyles,
          {
            width: wide ? WIDGET_WIDE_SIZE : WIDGET_SQUARE_SIZE,
          },
        ]}
      >
        <BlurView
          intensity={80}
          style={{
            width: wide ? WIDGET_WIDE_SIZE : WIDGET_SQUARE_SIZE,
            height: WIDGET_SQUARE_SIZE,
          }}
        >
          {children}
        </BlurView>
      </View>
    </TapGestureHandler>
  );
}
