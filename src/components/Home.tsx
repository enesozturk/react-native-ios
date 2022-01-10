import { StyleSheet, View } from "react-native";

import apps from "../constants/apps";

import AppGroup from "./AppGroup";
import AppItem from "./AppItem";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppGroup />
        <AppItem />
        <AppItem />
        <AppItem />
      </View>
      <View style={styles.row}>
        {Object.keys(apps.home).map((item, index) => {
          return <AppItem key={`app-${item}-${index}`} {...apps.home[item]} />;
        })}
      </View>
      <View style={styles.row}>
        <AppItem />
        <AppItem />
        <AppItem />
        <AppItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 64,
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
