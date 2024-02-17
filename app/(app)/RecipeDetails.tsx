import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRecipeDetailsStore } from "@/store/store";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Octicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useGetRecipeDeatils } from "@/api/useGetRecipeDetails";
import Loader from "@/components/Loader";
import YoutubeIframe from "react-native-youtube-iframe";

interface RecipeDetailsProps {}

const RecipeDetails: React.FC<RecipeDetailsProps> = () => {
  const item = useRecipeDetailsStore((state) => state.items);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { data: recipeDetail, status } = useGetRecipeDeatils(item?.idMeal);

  const ingredientIndex = (meal: any): number[] => {
    if (!meal) return [];
    let index: number[] = [];
    for (let i = 0; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        index.push(i);
      }
    }
    return index;
  };

  const getVideoId = (id: any): any => {
    const regex = /[?&]v=([^&]+)/;
    const match = id?.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      overScrollMode="never"
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <StatusBar style="light" />
      <View>
        <Animated.Image
          sharedTransitionTag={`recipe${item?.idMeal}`}
          source={{ uri: item?.strMealThumb }}
          style={{ width: wp(100), height: hp(50) }}
        />
      </View>
      <Animated.View
        entering={FadeIn.delay(200).duration(300)}
        className="w-full absolute flex-row justify-between items-center pt-12"
      >
        <TouchableOpacity
          className="p-2 bg-white rounded-full ml-4"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons size={hp(3.5)} name="arrow-back" color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 bg-white rounded-full mr-4"
          onPress={() => {
            setIsFavourite(!isFavourite);
          }}
        >
          <Ionicons
            name="heart"
            size={hp(3.5)}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {status !== "success" ? (
        <Loader />
      ) : (
        <View className="px-4 justify-between space-y-4 pt-8">
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipeDetail?.meals[0]?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-700"
            >
              {recipeDetail?.meals[0]?.strArea}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="rounded-full bg-amber-500 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <AntDesign name="clockcircleo" size={hp(4)} color="#525252" />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="rounded-full bg-amber-500 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <FontAwesome5
                  name="user-friends"
                  size={hp(3.5)}
                  color="#525252"
                />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="rounded-full bg-amber-500 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <FontAwesome6 name="fire" size={hp(3.5)} color="#525252" />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="rounded-full bg-amber-500 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <Octicons name="stack" size={hp(3.5)} color="#525252" />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* {'Ingredients'} */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientIndex(recipeDetail?.meals[0]).map((item: any) => {
                return (
                  <View key={item} className="flex-row space-x-4 items-center">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="rounded-full bg-amber-500"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {recipeDetail?.meals[0]["strMeasure" + item]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {recipeDetail?.meals[0]["strIngredient" + item]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* {'Instructions'} */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {recipeDetail?.meals[0]?.strInstructions}
            </Text>
          </Animated.View>

          {/* {'Youtube Video'} */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
          >
            {recipeDetail?.meals[0]?.strYoutube && (
              <View className="space-y-4">
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold flex-1 text-neutral-700"
                >
                  Recipe Video
                </Text>
                <View>
                  <YoutubeIframe
                    videoId={getVideoId(recipeDetail?.meals[0]?.strYoutube)}
                    height={hp(30)}
                  />
                </View>
              </View>
            )}
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetails;
