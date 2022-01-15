import { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH } from "../constants/ui";

import WalpaperImage from "../assets/img/wallpaper.jpg";

export default function Wallpaper() {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useLayoutEffect(() => {
    const { width, height } = Image.resolveAssetSource(WalpaperImage);
    setImageWidth(SCREEN_WIDTH);
    setImageHeight((SCREEN_WIDTH * height) / width);
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
      }}
    >
      <Image
        resizeMode="contain"
        source={WalpaperImage}
        style={{
          height: imageHeight,
          width: imageWidth,
        }}
      />
    </View>
  );
}
