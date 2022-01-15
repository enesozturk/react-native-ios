import { StyleSheet } from "react-native";

import theme from "@react-native-ios/constants/theme";

export default StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  searchInputContainer: {
    flex: 1,
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
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingLeft: (theme.spacing.sm + theme.spacing.xs) * 2 + 14,
    paddingRight: theme.spacing.sm * 2 + theme.spacing.xs + 12,
    backgroundColor: theme.colors.white.white15,
    color: theme.colors.white.white75,
    borderRadius: 12,
    marginRight: 8,
    ...theme.font.body,
  },
  cancelText: {
    color: theme.colors.white.white50,
    ...theme.font.body,
  },
  titleSectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  titleText: {
    ...theme.font.title2,
    fontWeight: "600",
    color: "white",
  },
  showMoreText: {
    ...theme.font.footnote,
    color: theme.colors.white.white50,
  },
  appsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.md,
    borderRadius: theme.spacing.md,
    width: "100%",
    backgroundColor: theme.colors.white.white15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xl,
  },
});
