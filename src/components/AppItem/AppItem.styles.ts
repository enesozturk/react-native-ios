import { StyleSheet } from "react-native";

import theme from "@react-native-ios/constants/theme";

import { APP_ICON_SIZE } from "./AppItem.constants";

export default StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 17,
  },
  title: {
    position: "absolute",
    bottom: -20,
    left: -8,
    textAlign: "center",
    color: "white",
    width: APP_ICON_SIZE + 16,
    ...theme.font.caption1,
  },
});
