import { StyleSheet } from "react-native";

import { BlurView } from "expo-blur";

import apps from "../constants/apps";
import { SCREEN_WIDTH } from "../constants/ui";

import AppItem from "./AppItem";

export default function Footer() {
  return (
    <BlurView intensity={100} style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
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
