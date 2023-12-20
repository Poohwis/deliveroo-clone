import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8 , paddingHorizontal: 18, paddingBottom: 10 }}
    >
      {restaurants.map((restaurant, index) => (
        <Link href={{pathname : "./Details", params: {id: restaurant.id}}} asChild key={index}>
          <TouchableOpacity
            className={`w-[300px] h-[250px] bg-white  rounded-md   mr-${
              index === restaurants.length - 1 ? 0 : 2
            }`}
            style={styles.cardContainer}
          >
            <Image
              source={restaurant.img}
              className="flex-1 w-full rounded-t-md"
              style={{ resizeMode: "cover" }}
            />
            <View className="h-[30%] p-2">
              <Text className="font-bold text-md">{restaurant.name}</Text>
              <Text className=" text-sm text-green">{restaurant.rating} {restaurant.ratings}</Text>
              <Text className=" text-sm text-medium">{restaurant.distance}</Text>
            </View>
          </TouchableOpacity>
        </Link>
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

export default Restaurants;
