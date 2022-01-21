import React from "react";
import { Text, View } from "react-native";

import * as WebBrowser from "expo-web-browser";

import ELetterSVG from "@react-native-ios/assets/svg/e-letter.svg";
import GithubSVG from "@react-native-ios/assets/svg/github.svg";
import LinkSVG from "@react-native-ios/assets/svg/link.svg";
import MessageSVG from "@react-native-ios/assets/svg/message.svg";
import WidgetItem from "@react-native-ios/components/WidgetItem";
import AnimatedInput from "@react-native-ios/components/AnimatedInput";

import styles from "./LeftSearchContent.styles";
import theme from "@react-native-ios/constants/theme";

export default function LeftSearchContent() {
  const handleNavigateWebsite = async () => {
    await WebBrowser.openBrowserAsync("https://ozturkenes.com");
  };

  const handleNavigateToGithub = async () => {
    await WebBrowser.openBrowserAsync("https://github.com/enesozturk");
  };

  return (
    <>
      <AnimatedInput />
      <View style={styles.appsContainer}>
        <View style={styles.row}>
          <WidgetItem onPress={handleNavigateWebsite}>
            <View style={styles.center}>
              <View style={styles.linkIconContainer}>
                <LinkSVG
                  width={24}
                  height={24}
                  color={theme.colors.white.white50}
                />
              </View>
              <ELetterSVG
                color={theme.colors.white.white75}
                width={48}
                height={48}
              />
            </View>
          </WidgetItem>
          <WidgetItem />
        </View>
        <WidgetItem wide onPress={handleNavigateToGithub}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: 24,
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <View style={styles.linkIconContainer}>
              <LinkSVG
                width={24}
                height={24}
                color={theme.colors.white.white50}
              />
            </View>
            <Text style={styles.textBody}>
              Did you like this app? Give me a star and follow me on Github for
              more ⭐️
            </Text>
            <View
              style={[
                styles.row,
                {
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 24,
                },
              ]}
            >
              <GithubSVG
                color={theme.colors.white.white75}
                width={32}
                height={32}
              />
              <Text style={styles.textBodySecondary}>
                enesozturk/react-native-ios
              </Text>
            </View>
          </View>
        </WidgetItem>
        <WidgetItem wide>
          <View style={styles.column}>
            <View style={styles.linkIconContainer}>
              <LinkSVG
                width={24}
                height={24}
                color={theme.colors.white.white50}
              />
            </View>
            <Text style={styles.textBody}>
              You need a React & React Native developer? Contact me!
            </Text>
            <View
              style={[
                styles.row,
                {
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 24,
                },
              ]}
            >
              <MessageSVG
                color={theme.colors.white.white75}
                width={32}
                height={32}
              />
              <Text style={styles.textBodySecondary}>
                enesozturk.d@gmail.com
              </Text>
            </View>
          </View>
        </WidgetItem>
      </View>
    </>
  );
}
