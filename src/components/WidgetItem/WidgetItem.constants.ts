import theme from "@react-native-ios/constants/theme";
import { SCREEN_WIDTH } from "@react-native-ios/constants/ui";

export const WIDGET_SQUARE_SIZE =
  (SCREEN_WIDTH - (theme.spacing.lg + 4) * 2 - 21) / 2;
export const WIDGET_WIDE_SIZE = SCREEN_WIDTH - theme.spacing.lg * 2;
