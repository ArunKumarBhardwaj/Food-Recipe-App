import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

interface CategoriesProps {
  data: Category[];
  selectedCategory: string | undefined;
  setSelectedCategory: (val: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  data,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 14 }}
      >
        {data?.map((item: Category) => {
          let activeCat = item?.strCategory == selectedCategory;
          let activeBtn = activeCat ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={item?.idCategory}
              className="items-center space-y-1"
              onPress={() => setSelectedCategory(item?.strCategory)}
            >
              <View className={`rounded-full p-[6px] ${activeBtn}`}>
                <Image
                  source={{ uri: item?.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text style={{ fontSize: hp(1.6) }} className="text-neutral-600">
                {item?.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
