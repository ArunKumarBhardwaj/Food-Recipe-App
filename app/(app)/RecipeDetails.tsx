import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRecipeDetailsStore } from "@/store/store";
import Animated from "react-native-reanimated";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";

interface RecipeDetailsProps {}

const RecipeDetails: React.FC<RecipeDetailsProps> = () => {
  const item = useRecipeDetailsStore((state) => state.items);

  return (
    <ScrollView
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
      <View className="w-full absolute flex-row justify-between items-center pt-12">
        <TouchableOpacity
          className="p-2 bg-white rounded-full ml-4"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons size={hp(3.5)} name="arrow-back" color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-white rounded-full mr-4">
          <Fontisto name="heart" size={hp(3)} color="gray" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;
