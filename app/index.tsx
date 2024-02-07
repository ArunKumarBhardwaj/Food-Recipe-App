import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn, Easing } from "react-native-reanimated";
import { router } from "expo-router";

const WelcomeScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(app)/");
    }, 1500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-amber-500">
      <StatusBar style="light" />
      <Animated.View entering={FadeIn.duration(1000).easing(Easing.ease)}>
        <Image
          source={require("../assets/appImages/recipe.png")}
          resizeMode="contain"
          style={[
            {
              width: wp(80),
              height: hp(20),
            },
          ]}
        />
      </Animated.View>
      <Animated.View style={{ position: "absolute", bottom: 50 }}>
        <Text
          className="items-center text-center text-2xl text-white"
          style={{ fontFamily: "SpaceMono" }}
        >
          FOOD RECEIPE APP
        </Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
