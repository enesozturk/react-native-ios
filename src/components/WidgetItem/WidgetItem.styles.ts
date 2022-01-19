import { StyleSheet } from "react-native";

import theme from "@react-native-ios/constants/theme";

import { WIDGET_SQUARE_SIZE } from "./WidgetItem.constants";

export default StyleSheet.create({
  container: {
    width: WIDGET_SQUARE_SIZE,
    height: WIDGET_SQUARE_SIZE,
    borderRadius: theme.spacing.lg,
    backgroundColor: theme.colors.white.white25,
    overflow: "hidden",
    marginBottom: theme.spacing.lg,
  },
});
