import { StyleSheet, View } from "react-native";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@react-native-ios/constants/ui";

import AppItem from "@react-native-ios/components/AppItem";
import apps from "@react-native-ios/constants/apps";

export function Page1() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {apps.home.row1.map((item) => {
          return <AppItem key={`app-${item.title}`} {...item} />;
        })}
      </View>
      <View style={styles.row}>
        {apps.home.row2.map((item) => {
          return <AppItem key={`app-${item.title}`} {...item} />;
        })}
      </View>
      <View style={styles.row}>
        {apps.home.row3.map((item) => {
          return <AppItem key={`app-${item.title}`} {...item} />;
        })}
      </View>
    </View>
  );
}

export function Page2() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {apps.home.row3.map((item) => {
          return <AppItem key={`app-${item.title}`} {...item} />;
        })}
      </View>
      <View style={styles.row}>
        {apps.home.row2.map((item) => {
          return <AppItem key={`app-${item.title}`} {...item} />;
        })}
      </View>
      <View style={styles.row}>
        {apps.home.row1.map((item) => {
          return <AppItem key={`app-${item.title}`} {...item} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    width: SCREEN_WIDTH * 2,
    height: SCREEN_HEIGHT,
    display: "flex",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 32,
  },
});
