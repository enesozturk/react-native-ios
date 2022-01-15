import { Image, Text, View } from "react-native";
import { APP_ICON_SIZE } from "./AppItem.constants";

import styles from "./AppItem.styles";

type AppItemProps = {
  size?: "small" | undefined;
  noTitle?: boolean;
  title?: string;
  icon: any;
};

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
