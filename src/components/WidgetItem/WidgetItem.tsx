import React from "react";
import { View } from "react-native";

import { BlurView } from "expo-blur";
import { TapGestureHandler } from "react-native-gesture-handler";

import { WIDGET_SQUARE_SIZE, WIDGET_WIDE_SIZE } from "./WidgetItem.constants";
import styles from "./WidgetItem.styles";

type WidgetItemProps = {
  children?: React.ReactNode;
  containerStyles?: object;
  wide?: boolean;
};

export default function WidgetItem({
  children,
  containerStyles,
  wide,
}: WidgetItemProps) {
  return (
    <TapGestureHandler onEnded={() => {}}>
      <View
        style={[
          styles.container,
          containerStyles,
          {
            width: wide ? "100%" : WIDGET_SQUARE_SIZE,
          },
        ]}
      >
        <BlurView
          intensity={80}
          style={{
            width: wide ? "100%" : WIDGET_SQUARE_SIZE,
            height: WIDGET_SQUARE_SIZE,
          }}
        >
          {children}
        </BlurView>
      </View>
    </TapGestureHandler>
  );
}
