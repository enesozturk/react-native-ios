export const BLUR_VIEW_MAX_INTENSITY = 75;
export const MAX_OFFSET_TO_ANIMATE = 90;
export const DISTANCE_TO_ACTIVATE = MAX_OFFSET_TO_ANIMATE / 2;
export const MIN_VELOCITY_Y_TO_ACTIVATE = 200;

export const SPRING_CONFIG = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};
