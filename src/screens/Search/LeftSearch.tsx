import React from "react";

import { SharedValue } from "react-native-reanimated";

import { SNAP_POINTS_HORIZONTAL } from "@react-native-ios/constants/animation";
import LeftSearchContent from "./components/LeftSearchContent";
import AnimatedProvider from "./AnimatedProvider";

type AnimatedProviderProps = {
  offsetX: SharedValue<number>;
  startX: SharedValue<number>;
};

export default function LeftSearch({ offsetX, startX }: AnimatedProviderProps) {
  return (
    <AnimatedProvider
      direction="left"
      startPoint={SNAP_POINTS_HORIZONTAL.ORIGIN}
      snapPoint={SNAP_POINTS_HORIZONTAL.LEFT_PAGE}
      offset={offsetX}
      start={startX}
    >
      <LeftSearchContent />
    </AnimatedProvider>
  );
}
