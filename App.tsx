import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Wallpaper from "@react-native-ios/components/Wallpaper";
import Footer from "@react-native-ios/components/Footer/Footer";
import Home from "@react-native-ios/screens/Home";
import SwipeableProvider from "@react-native-ios/components/SwipeableProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Page1, Page2 } from "@react-native-ios/screens/Home/Home";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Wallpaper />
        <SwipeableProvider pages={[<Page1 />, <Page2 />]} />
        <Footer />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
