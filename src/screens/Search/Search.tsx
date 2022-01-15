import React from "react";
import { Pressable, Text, View } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

import SearchSVG from "@react-native-ios/assets/svg/search.svg";
import MichrophoneSVG from "@react-native-ios/assets/svg/michrophone.svg";
import ChevronRightSVG from "@react-native-ios/assets/svg/chevron-right.svg";
import AppItem from "@react-native-ios/components/AppItem";
import apps from "@react-native-ios/constants/apps";

import AnimatedProvider from "./AnimatedProvider";
import styles from "./Search.styles";
import theme from "@react-native-ios/constants/theme";

type SearchProps = {
  isSearchActive: SharedValue<number>;
  offsetY: SharedValue<number>;
};

export default function Search({ isSearchActive, offsetY }: SearchProps) {
  return (
    <AnimatedProvider {...{ isSearchActive, offsetY }}>
      <View style={styles.searchContainer}>
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
            style={styles.searchInput}
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
      <View style={styles.appsContainer}>
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
      </View>
    </AnimatedProvider>
  );
}
