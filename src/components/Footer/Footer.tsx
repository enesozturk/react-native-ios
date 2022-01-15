import { StyleSheet, View } from "react-native";

import { BlurView } from "expo-blur";

import AppItem from "@react-native-ios/components/AppItem";
import apps from "@react-native-ios/constants/apps";
import { SCREEN_WIDTH } from "@react-native-ios/constants/ui";

export default function Footer() {
  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.contentContainer}>
        {Object.keys(apps.footer).map((item, index) => {
          return (
            <AppItem
              key={`footer-app-${item.title}-${index}`}
              noTitle
              icon={apps.footer[item].icon}
            />
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 24,
    width: SCREEN_WIDTH - 24,
    borderRadius: 36,
    overflow: "hidden",
  },
});
