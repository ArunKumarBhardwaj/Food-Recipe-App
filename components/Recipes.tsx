import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import MasonryList from "@react-native-seoul/masonry-list";

import { router } from "expo-router";
import { useRecipeDetailsStore } from "@/store/store";

interface RecipeItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipeCardProps {
  item: RecipeItem;
  index: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, index }) => {
  const addItem = useRecipeDetailsStore((state) => state.storeDetails);
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
      style={{ paddingVertical: 10 }}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="justify-center mb-4 space-y-1"
        onPress={() => {
          addItem(item);
          router.push("/(app)/RecipeDetails");
        }}
      >
        <Animated.Image
          sharedTransitionTag={item?.idMeal}
          source={{ uri: item?.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />

        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item?.strMeal?.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

interface RecipesProps {
  data: RecipeItem[];
}

const Recipes: React.FC<RecipesProps> = ({ data }) => {
  return (
    <View className="mx-4 mb-4 pt-2">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        <MasonryList
          data={data}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: any) => (
            <RecipeCard item={item} index={i} />
          )}
        />
      </View>
    </View>
  );
};

export default Recipes;
