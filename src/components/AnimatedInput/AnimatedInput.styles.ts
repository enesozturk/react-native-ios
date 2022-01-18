import { StyleSheet } from "react-native";

import theme from "@react-native-ios/constants/theme";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    paddingVertical: theme.spacing.xl,
    borderRadius: theme.spacing.md,
    backgroundColor: theme.colors.white.white15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "red",
  },
  input: {
    paddingHorizontal: theme.spacing.sm,
    color: theme.colors.white.white75,
    ...theme.font.body,
  },
  cancelText: {
    ...theme.font.body,
    color: theme.colors.white.white50,
    position: "absolute",
    right: -52,
  },
});
