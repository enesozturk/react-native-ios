import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Wallpaper from "./src/components/Wallpaper";
import Home from "./src/components/Home";
import Footer from "./src/components/Footer";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Wallpaper />
      <Home />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
