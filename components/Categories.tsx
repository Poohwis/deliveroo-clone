import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { categories } from "@/assets/data/home";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 18,}}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          className={`w-[100px] h-[100px] bg-white  rounded-md items-center  mr-${
            index === categories.length - 1 ? 0 : 2
          }`}
          key={index}
          style={styles.cardContainer}
        >
          <Image source={category.img} className="object-cover rounded-t-md" />
          <View className="justify-center items-center  flex-1">
            <Text className="text-sm font-bold">{category.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
  },
});

export default Categories;
