import { View } from "react-native";
import AppItem from "./AppItem";

export default function AppGroup() {
  return (
    <View
      style={{
        width: 72,
        height: 72,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 16,
        padding: 8,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppItem size="small" />
        <AppItem size="small" />
        <AppItem size="small" />
      </View>
    </View>
  );
}
