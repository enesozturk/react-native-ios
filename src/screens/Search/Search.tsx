import React from "react";

import { SharedValue } from "react-native-reanimated";

import AnimatedProvider from "./AnimatedProvider";
import SearchContent from "./SearchContent";

type SearchProps = {
  isSearchActive: SharedValue<number>;
  offsetY: SharedValue<number>;
};

export default function Search({ isSearchActive, offsetY }: SearchProps) {
  return (
    <AnimatedProvider {...{ isSearchActive, offsetY }}>
      <SearchContent />
    </AnimatedProvider>
  );
}
