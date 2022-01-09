import { Image, StyleSheet } from "react-native";

export default function Wallpaper() {
  return (
    <Image
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
      }}
      resizeMode="cover"
      resizeMethod="resize"
      source={require("../assets/img/wallpaper.jpg")}
    />
  );
}
