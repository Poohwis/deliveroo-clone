import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import filter from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Link, useNavigation } from "expo-router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

interface FilterItem {
  name: string;
  icon: string;
  description?: string;
}

const ListHeaderComponent = () => {
  const items: FilterItem[] = [
    { name: "Sort", icon: "swap-vertical-outline", description: "Recommended" },
    { name: "Hygiene rating", icon: "restaurant-outline" },
    { name: "Offer", icon: "pricetag-outline" },
    { name: "Dietary", icon: "nutrition-outline" },
  ];
  return (
    <>
      {/* Header */}
      <View className="bg-white rounded-md">
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row justify-between py-2 border-lightgray  px-2 
            ${index !== items.length - 1 ? "border-b-[1px]" : ""} `}
          >
            <View className="flex-row space-x-4 ">
              <Ionicons
                //@ts-ignore
                name={item.icon}
                size={20}
                color={Colors.medium}
              />
              <Text className="text-sm">{item.name}</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View className="my-2">
        <Text className="font-bold text-md">Categories</Text>
      </View>
    </>
  );
};
const Filter = () => {
  // console.log('filter re-renderd')
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(filter);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);

  useEffect(() => {
    const selectedItems = items.filter((item) => item.checked);
    if (selectedItems.length !== 0) {
      flexWidth.value = withTiming(50,{duration: 50})
    } else {
      flexWidth.value = withTiming(0,{duration: 50})
    }
    // console.log(selectedItems, selectedItems.length)
  }, [items]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${flexWidth.value}%`,
      display: flexWidth.value > 0 ? 'flex': 'none'
    };
  });

  const onToggle = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        checked: !updatedItems[index].checked,
      };
      return updatedItems;
    });
  };

  const handleClearToggle = () => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.map((item) => {
        item.checked = false;
      });
      return updatedItems;
    });
  };
  const renderItem: ListRenderItem<Category> = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onToggle(index);
        }}
        className={`flex-row  py-2  px-4 bg-white border-lightgray
         ${index === 0 ? "rounded-t-md" : ""} ${
          index === items.length - 1 ? "rounded-b-md" : ""
        }
            ${index !== items.length - 1 ? "border-b-[1px]" : ""} 
        } `}
      >
        <View className="flex-1">
          <Text className="text-sm">
            {item.name} ({item.count})
          </Text>
        </View>
        <BouncyCheckbox
          isChecked={items[index].checked}
          onPress={() => {
            onToggle(index);
          }}
          fillColor={Colors.primary}
          iconStyle={{ borderRadius: 4, width: 18, height: 18 }}
          innerIconStyle={{ borderRadius: 4, width: 15, height: 15 }}
          disableBuiltInState={true}
          className="-right-4 "
        />
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 bg-lightgray ">
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-4 pt-2"
      />

      {/* footer */}
      <View
        className="absolute bottom-0 left-0 right-0 h-[100px] bg-white items-center "
        style={styles.footer}
      >
        <View className="flex-row mx-4">
          <Animated.View style={[animatedStyle, { display: "none" }]}>
            <TouchableOpacity
              className="flex-1 bg-white py-4 mt-4 mx-2 items-center align-middle rounded-md border-gray-200 border-[2px]"
              onPress={handleClearToggle}
            >
              <Text className="text-md font-bold text-gray-500">Clear all</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            className="flex-1 bg-primary py-4 mt-4 mx-2  items-center align-middle rounded-md"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text className="text-md font-bold text-white">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
});
export default Filter;
