import { Image, StyleSheet, View } from "react-native";

export default function Wallpaper() {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
      }}
    >
      <Image
        resizeMode="contain"
        source={require("../assets/img/wallpaper.jpg")}
        style={{ height: "100%", width: "100%", backgroundColor: "red" }}
      />
    </View>
  );
}
