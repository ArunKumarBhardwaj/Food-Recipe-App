import { View, Image, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRecipeDetailsStore } from "@/store/store";

interface RecipeDetailsProps {}

const RecipeDetails: React.FC<RecipeDetailsProps> = () => {
  const items = useRecipeDetailsStore((state) => state.items);

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <StatusBar style="dark" />
      <View>
        <Image
          source={{ uri: items?.strMealThumb }}
          style={{ width: wp(100), height: hp(50) }}
        />
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;
