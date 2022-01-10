import { Image, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH } from "../constants/ui";

type AppItemProps = {
  size?: "small" | undefined;
  noTitle?: boolean;
  title?: string;
  icon: any;
};

export const APP_ICON_WIDTH_RATIO = 828 / 128;
export const APP_ICON_SIZE = SCREEN_WIDTH / APP_ICON_WIDTH_RATIO;

export default function AppItem({ icon, title, size, noTitle }: AppItemProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size === "small" ? 16 : APP_ICON_SIZE,
          height: size === "small" ? 16 : APP_ICON_SIZE,
          borderRadius: size === "small" ? 4 : 17,
        },
      ]}
    >
      <Image style={styles.image} source={icon} />
      {noTitle || size === "small" ? null : (
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit={false}
        >
          {title ? title : "Square"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2e2e2",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 17,
  },
  title: {
    position: "absolute",
    bottom: -24,
    left: -8,
    textAlign: "center",
    color: "white",
    fontSize: 12,
    width: APP_ICON_SIZE + 16,
  },
});
