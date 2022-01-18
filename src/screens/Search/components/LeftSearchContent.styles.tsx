import { StyleSheet } from "react-native";

import theme from "@react-native-ios/constants/theme";

export default StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  searchInputContainer: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.spacing.md,
    backgroundColor: theme.colors.white.white15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  searchIconContainer: {
    position: "absolute",
    top: theme.spacing.sm + theme.spacing.xs - 1,
    left: theme.spacing.sm + theme.spacing.xs,
  },
  michrophoneIconContainer: {
    position: "absolute",
    top: theme.spacing.sm,
    right: 12 + theme.spacing.sm,
  },
  searchInput: {
    paddingHorizontal: theme.spacing.sm,
    color: theme.colors.white.white75,
    backgroundColor: "red",
    ...theme.font.body,
  },
  cancelButton: {
    position: "absolute",
    right: 0,
    opacity: 0,
  },
  cancelText: {
    color: theme.colors.white.white50,
    ...theme.font.body,
  },
  appsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.lg,
    width: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
});
