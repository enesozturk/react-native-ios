import { StyleSheet, View } from "react-native";

import apps from "../constants/apps";

import AppItem from "../components/AppItem";

export default function Home() {
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
