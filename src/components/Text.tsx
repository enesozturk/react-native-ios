import React from "react";

import { Text as RNText, TextProps } from "react-native";

export default function Text(props: TextProps) {
  return (
    <RNText numberOfLines={1} adjustsFontSizeToFit={false} {...props}>
      {props.children}
    </RNText>
  );
}
