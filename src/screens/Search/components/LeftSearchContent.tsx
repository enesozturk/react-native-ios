import React from "react";
import { Pressable, Text, View } from "react-native";

import WidgetItem from "@react-native-ios/components/WidgetItem";
import AnimatedInput from "@react-native-ios/components/AnimatedInput";

import styles from "./LeftSearchContent.styles";

export default function LeftSearchContent() {
  return (
    <>
      <AnimatedInput />
      <View style={styles.appsContainer}>
        <View style={styles.row}>
          <WidgetItem />
          <WidgetItem />
        </View>
        <WidgetItem wide />
        <WidgetItem wide />
      </View>
    </>
  );
}
