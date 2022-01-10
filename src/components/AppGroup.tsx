import { StyleSheet, View } from "react-native";

import AppItem, { APP_ICON_SIZE } from "./AppItem";

export default function AppGroup() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <AppItem size="small" />
        <AppItem size="small" />
        <AppItem size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: APP_ICON_SIZE,
    height: APP_ICON_SIZE,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 17,
    padding: 8,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
