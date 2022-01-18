import { StyleSheet } from "react-native";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@react-native-ios/constants/ui";

export default StyleSheet.create({
  pagesContainer: {
    width: SCREEN_WIDTH * 2,
    height: SCREEN_HEIGHT,
    display: "flex",
    flexDirection: "row",
  },
  pageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    display: "flex",
  },
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  searchContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
});
