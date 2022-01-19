import { StyleSheet } from "react-native";

import theme from "@react-native-ios/constants/theme";
import { SCREEN_WIDTH } from "@react-native-ios/constants/ui";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    paddingHorizontal: 56 / 2 - 8,
  },
  contentContainer: {
    width: SCREEN_WIDTH - theme.spacing.lg,
    display: "flex",
    flexDirection: "row",
    position: "relative",
    backgroundColor: theme.colors.white.white25,
  },
  input: {
    paddingHorizontal: theme.spacing.sm,
    paddingRight: 36,
    color: theme.colors.white.white75,
    ...theme.font.body,
  },
  searchIconContainer: {
    position: "absolute",
  },
  michrophoneIconContainer: {
    position: "absolute",
    right: 0,
  },
  cancelText: {
    ...theme.font.body,
    textAlignVertical: "center",
    color: theme.colors.white.white50,
    height: "100%",
    paddingVertical: theme.spacing.sm13,
  },
});
