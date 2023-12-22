import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SectionList,
  ListRenderItem,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { restaurant } from "@/assets/data/restaurant";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const Details = () => {
  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const navigation = useNavigation();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-IMG_HEIGHT, 0, IMG_HEIGHT],
          [-IMG_HEIGHT / 2, 0, IMG_HEIGHT / 2]
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-IMG_HEIGHT, 0, IMG_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollOffset.value,
      [-IMG_HEIGHT, 0, IMG_HEIGHT / 1.5],
      [0, 0, 1]
    );
    return {
      opacity:
        scale >= 1.05
          ? withTiming(1, { duration: 250 })
          : withTiming(0, { duration: 250 }),
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      header: () => (
        <>
          <View className=" w-full h-[85px] absolute top-0 left-0 flex-row justify-between items-end z-20">
            <View className="ml-4 mb-2">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-white rounded-full p-2 "
              >
                <Ionicons name="arrow-back" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <View className="flex-row  space-x-2 mb-2 mr-4">
              <TouchableOpacity className="bg-white rounded-full p-2">
                <Ionicons
                  name="share-outline"
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-full p-2">
                <Ionicons
                  name="search-outline"
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View
            className="bg-white w-full h-[85px] absolute top-0 left-0 z-0 items-center justify-end"
            style={headerAnimatedStyle}
          >
            <Text className="font-bold text-md mb-4">{restaurant.name}</Text>
          </Animated.View>
        </>
      ),
    });
  }, []);

  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return (
      <Link href={{pathname:"/(modal)/Dish",params: {id: item.id}}} asChild>
        <TouchableOpacity
          key={index}
          className="flex-row justify-between bg-white "
        >
          <View className="flex-1 flex-col ml-4 py-2">
            <View className="justify-start flex-1">
              <Text className="font-bold text-[16px]">{item.name}</Text>
              <Text className="text-medium">{item.info}</Text>
            </View>
            <View className="justify-end  flex-1">
              <Text className="text-gray-600 pt-1 ">£{item.price}</Text>
            </View>
          </View>
          <View className="flex-1 items-end mr-4 justify-center py-2 my-2">
            <Image
              source={item.img}
              className="w-[100px] h-[100px] rounded-sm "
            />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-lightgray">
      <StatusBar style="dark" />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={restaurant.img}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View className="bg-lightgray" >
          <View className="mx-4">
            <Text className="text-[24px] font-bold py-2 mt-2">
              {restaurant.name}
            </Text>
            <Text className=" text-medium py-2">
              {restaurant.delivery} ·{" "}
              {restaurant.tags.map(
                (tag, index) =>
                  `${tag}${index < restaurant.tags.length - 1 ? " · " : ""}`
              )}
            </Text>
            <Text className="text-gray-600 py-2">{restaurant.about}</Text>
          </View>
          <SectionList
            keyExtractor={(item, index) =>
              item.id.toString() + index.toString()
            }
            contentContainerStyle={{ paddingBottom: 50 }}
            scrollEnabled={false}
            sections={DATA}
            ItemSeparatorComponent={() => (
              <View className="h-[1px] bg-grey"></View>
            )}
            SectionSeparatorComponent={() => (
              <View className="h-[1px] bg-grey"></View>
            )}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text
              // onLayout={(event)=>console.log(event.nativeEvent.layout)}
                key={`${title}-${index}`}
                className="text-[18px] font-bold mt-8 mb-4 ml-4"
              >
                {title}
              </Text>
            )}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
});

export default Details;
