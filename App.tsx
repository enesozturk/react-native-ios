import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Wallpaper from "@react-native-ios/components/Wallpaper";
import Footer from "@react-native-ios/components/Footer/Footer";
import Home from "@react-native-ios/screens/Home";
import SwipeableProvider from "@react-native-ios/components/SwipeableProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Wallpaper />
        <SwipeableProvider>
          <Home />
        </SwipeableProvider>
        <Footer />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
