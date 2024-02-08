import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View>
      <ActivityIndicator size={"large"} color={"gray"} className="mt-40" />
    </View>
  );
};

export default Loader;
