import { StyleSheet } from "react-native";

import theme from "@react-native-ios/constants/theme";

export default StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    marginRight: 8,
    ...theme.font.body,
  },
  cancelText: {
    color: "rgba(255, 255, 255, 0.5)",
    ...theme.font.body,
  },
  titleSectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  titleText: {
    ...theme.font.title2,
    fontWeight: "600",
    color: "white",
  },
  showMoreText: {
    ...theme.font.footnote,
    color: "rgba(255, 255, 255, 0.5)",
  },
  appsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
});
