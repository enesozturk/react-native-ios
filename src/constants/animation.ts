import { SCREEN_WIDTH } from "./ui";

export const BLUR_VIEW_MAX_INTENSITY = 75;
export const MAX_OFFSET_TO_ANIMATE = 90;
export const DISTANCE_TO_ACTIVATE = MAX_OFFSET_TO_ANIMATE / 2;
export const MIN_VELOCITY_Y_TO_ACTIVATE = 100;

export const SPRING_CONFIG = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};

export const SNAP_POINTS_HORIZONTAL = {
  LEFT_PAGE: SCREEN_WIDTH,
  LEFT_PAGE_HALF: SCREEN_WIDTH / 2,
  ORIGIN: 0,
  FIRST_PAGE_HALF: SCREEN_WIDTH / -2,
  SECOND_PAGE: SCREEN_WIDTH * -1,
  SECOND_PAGE_HALF: (SCREEN_WIDTH * -3) / 2,
  RIGHT_PAGE: SCREEN_WIDTH * -2, // -750
};

export const SNAP_POINTS_HORIZONTAL_AS_ARRAY = [
  SCREEN_WIDTH * 3,
  (SCREEN_WIDTH * 3) / 2,
  SCREEN_WIDTH,
  SCREEN_WIDTH / 2, // 187.5
  0,
  SCREEN_WIDTH / -2, // -187
  SCREEN_WIDTH * -1, // -375
  (SCREEN_WIDTH * -3) / 2, // -375 + (-375/2) = -562
  SCREEN_WIDTH * -2, // -375 * 2 == -750
  (SCREEN_WIDTH * -5) / 2, // -375 * 2 + (-375/2) = -937
  SCREEN_WIDTH * -3, // -375 * 3 = -1500
  (SCREEN_WIDTH * -7) / 2, // -375 * 3 + (-375/2) = -1875
];
