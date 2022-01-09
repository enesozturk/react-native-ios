import { Text, View } from "react-native";

type AppItemProps = {
  size?: "small" | undefined;
};

export default function AppItem({ size }: AppItemProps) {
  return (
    <View
      style={{
        width: size === "small" ? 16 : 72,
        height: size === "small" ? 16 : 72,
        backgroundColor: "#e2e2e2",
        borderRadius: size === "small" ? 4 : 16,
      }}
    >
      {size === "small" ? null : (
        <Text
          style={{
            position: "absolute",
            bottom: -24,
            width: 72,
            maxWidth: 80,
            textAlign: "center",
            color: "white",
          }}
          numberOfLines={1}
        >
          Square
        </Text>
      )}
    </View>
  );
}
