import { MAX_OFFSET_TO_ANIMATE } from "@react-native-ios/constants/animation";
import React from "react";

import { SharedValue } from "react-native-reanimated";

import AnimatedProvider from "./AnimatedProvider";
import SearchContent from "./SearchContent";

type SearchProps = {
  offsetY: SharedValue<number>;
};

export default function Search({ offsetY }: SearchProps) {
  return (
    <AnimatedProvider
      direction="vertical"
      snapPoint={MAX_OFFSET_TO_ANIMATE}
      startPoint={0}
      offset={offsetY}
    >
      <SearchContent />
    </AnimatedProvider>
  );
}
