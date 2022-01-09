import { View } from "react-native";
import AppGroup from "./AppGroup";
import AppItem from "./AppItem";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: 64,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 32,
          marginBottom: 32,
        }}
      >
        <AppGroup />
        <AppItem />
        <AppItem />
        <AppItem />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 32,
          marginBottom: 32,
        }}
      >
        <AppItem />
        <AppItem />
        <AppItem />
        <AppItem />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 32,
          marginBottom: 32,
        }}
      >
        <AppItem />
        <AppItem />
        <AppItem />
        <AppItem />
      </View>
    </View>
  );
}
