import React from "react";
import { Pressable, Text, View } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

import AppItem from "@react-native-ios/components/AppItem";
import apps from "@react-native-ios/constants/apps";

import AnimatedProvider from "./AnimatedProvider";
import styles from "./Search.styles";

type SearchProps = {
  isSearchActive: SharedValue<number>;
  offsetY: SharedValue<number>;
};

export default function Search({ isSearchActive, offsetY }: SearchProps) {
  return (
    <AnimatedProvider {...{ isSearchActive, offsetY }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.searchInput}
        />
        <Pressable>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
      <View style={styles.titleSectionContainer}>
        <Text style={styles.titleText}>Siri Suggestions</Text>
        <Text style={styles.showMoreText}>Show More</Text>
      </View>
      <View style={styles.appsContainer}>
        <View style={styles.row}>
          {apps.home.row1.map((item) => {
            return <AppItem key={`app-${item.title}`} {...item} />;
          })}
        </View>
        <View style={[styles.row, { marginBottom: 24 }]}>
          {apps.home.row2.map((item) => {
            return <AppItem key={`app-${item.title}`} {...item} />;
          })}
        </View>
      </View>
    </AnimatedProvider>
  );
}
