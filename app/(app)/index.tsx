import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetCategories } from "@/api/useGetCategories";
import Categories from "@/components/Categories";
import Recipes from "@/components/Recipes";
import { useEffect, useState } from "react";
import { useGetRecipes } from "@/api/useGetRecipes";
import Loader from "@/components/Loader";

interface HomeScreenProps {}

export default function HomeScreen({}: HomeScreenProps) {
  const { data: categories } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const { data: recipes, status } = useGetRecipes(selectedCategory);

  useEffect(() => {
    setSelectedCategory(() => categories?.categories[0]?.strCategory);
  }, [categories]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} className="pt-5">
        {/* {'Header View'} */}
        <View className="flex-row items-center justify-between mx-4 mb-2">
          <Image
            source={require("../../assets/appImages/avatar.png")}
            resizeMode="contain"
            style={[
              {
                width: wp(10),
                height: hp(10),
              },
            ]}
          />
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </View>

        {/* {'Greetings View'} */}
        <View className="mx-4 mb-4">
          <Text style={{ fontSize: hp(1.8) }} className="text-neutral-600">
            Hello, Arun!
          </Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="text-neutral-600">
              Make your own food,
            </Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="text-neutral-600">
            stay at{" "}
            <Text style={{ fontSize: hp(3.8) }} className="text-amber-500">
              Home
            </Text>
          </Text>
        </View>

        {/* {'Greetings View'} */}
        <View className="mx-4 items-center rounded-full flex-row bg-black/5 p-[6px] flex-row justify-bewteen">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 pl-3 pb-1 pt-1 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <FontAwesome6 name="magnifying-glass" size={hp(2.5)} color="gray" />
          </View>
        </View>

        {/* {'Categories View'} */}
        <View>
          {categories?.categories?.length > 0 && (
            <Categories
              data={categories?.categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </View>

        {/* {'Recipes View'} */}
        <View>
          {status !== "success" ? (
            <Loader />
          ) : (
            <Recipes data={recipes?.meals} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
