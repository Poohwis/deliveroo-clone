import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getDishById } from "@/assets/data/restaurant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Dish = () => {
  const { id } = useLocalSearchParams();
  const numericId = parseInt(id.toString(), 10);
  const item = getDishById(numericId);

  const addTocart = () => {
    return;
  };
  const [cartCount, setCartCount] = useState<number>(0);

  const updateCart = (action: string) => {
    if (action === "add") {
      setCartCount((prevCount) => prevCount + 1);
    } else if (action === "remove" && cartCount > 0) {
      setCartCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Image source={item?.img} className="w-full h-[300px]" />
      <View className="px-4 pt-4">
        <Text className="text-lg font-bold mb-2">{item?.name}</Text>
        <Text className="text-md text-medium">{item?.info}</Text>
      </View>
      <View
        className="absolute bottom-0 left-0 h-[150px] bg-white w-full  items-center space-y-4 pt-2"
        style={styles.footerShadow}
      >
        <View className="flex-row space-x-6 justify-center items-center">
          <TouchableOpacity onPress={() => updateCart("remove")}>
            <Ionicons
              name="remove-circle-outline"
              size={32}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <Text className="font-bold">{cartCount}</Text>
          <TouchableOpacity onPress={() => updateCart("add")}>
            <Ionicons
              name="add-circle-outline"
              size={32}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="w-[85%] h-[45px] bg-primary items-center justify-center rounded-md"
          onPress={addTocart}
        >
          <Text className="font-bold text-md text-white">
            Add for £{item?.price}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footerShadow: {
    shadowColor: "#000",
    elevation: 10,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
export default Dish;
