import React from "react";
import { Pressable, Text, View } from "react-native";

import {
  Gesture,
  GestureDetector,
  TextInput,
} from "react-native-gesture-handler";

import SearchSVG from "@react-native-ios/assets/svg/search.svg";
import MichrophoneSVG from "@react-native-ios/assets/svg/michrophone.svg";
import ChevronRightSVG from "@react-native-ios/assets/svg/chevron-right.svg";
import AppItem from "@react-native-ios/components/AppItem";
import apps from "@react-native-ios/constants/apps";

import styles from "../Search.styles";
import theme from "@react-native-ios/constants/theme";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeftSearchContent() {
  const { top } = useSafeAreaInsets();

  const gesture = Gesture.Pan()
    .onStart((e) => {})
    .onUpdate((e) => {})
    .onEnd((e) => {});

  return (
    <>
      <View style={[styles.searchContainer, { marginTop: top }]}>
        <View style={styles.searchInputContainer}>
          <View style={styles.searchIconContainer}>
            <SearchSVG />
          </View>
          <View style={styles.michrophoneIconContainer}>
            <MichrophoneSVG />
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor={theme.colors.white.white75}
            autoCorrect={false}
            autoCompleteType="off"
            keyboardAppearance="dark"
            style={[styles.searchInput, { paddingVertical: 8 }]}
          />
        </View>
        <Pressable>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
      <View style={styles.titleSectionContainer}>
        <Text style={styles.titleText}>Siri Suggestions</Text>
        <ChevronRightSVG width={6} stroke={theme.colors.white.white50} />
      </View>
      <View
        style={[
          styles.appsContainer,
          { padding: 0, backgroundColor: "transparent", overflow: "hidden" },
        ]}
      >
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            width: "100%",
            padding: 16,
          }}
        >
          <View style={styles.row}>
            {apps.home.row3.map((item) => {
              return <AppItem key={`app-${item.title}`} {...item} />;
            })}
          </View>
          <View style={[styles.row, { marginBottom: 24 }]}>
            {apps.home.row1.map((item) => {
              return <AppItem key={`app-${item.title}`} {...item} />;
            })}
          </View>
        </BlurView>
      </View>
    </>
  );
}
