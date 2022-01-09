import { BlurView } from "expo-blur";
import AppItem from "./AppItem";

export default function Footer() {
  return (
    <BlurView
      intensity={100}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 32,
        paddingBottom: 48,
      }}
    >
      <AppItem />
      <AppItem />
      <AppItem />
      <AppItem />
    </BlurView>
  );
}
