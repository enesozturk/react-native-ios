import React from "react";
import { Pressable, Text, View } from "react-native";

import { Gesture, TextInput } from "react-native-gesture-handler";

import SearchSVG from "@react-native-ios/assets/svg/search.svg";
import MichrophoneSVG from "@react-native-ios/assets/svg/michrophone.svg";
import ChevronRightSVG from "@react-native-ios/assets/svg/chevron-right.svg";

import styles from "./LeftSearchContent.styles";
import theme from "@react-native-ios/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WidgetItem from "@react-native-ios/components/WidgetItem";
import AnimatedInput from "@react-native-ios/components/AnimatedInput";

export default function LeftSearchContent() {
  const { top } = useSafeAreaInsets();

  const gesture = Gesture.Pan()
    .onStart((e) => {})
    .onUpdate((e) => {})
    .onEnd((e) => {});

  return (
    <>
      <View
        style={[styles.searchContainer, { marginTop: top + theme.spacing.md }]}
      >
        <AnimatedInput />
        <Pressable style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
      <View style={[styles.appsContainer, {}]}>
        <View style={styles.row}>
          <WidgetItem />
          <WidgetItem />
        </View>
        <WidgetItem wide />
      </View>
    </>
  );
}
