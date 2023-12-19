import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import BottomSheet from "./BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const SearchBar = () => {
  return (
    <View className="h-[60px] bg-white flex-row items-center justify-between space-x-2 px-[20px]">
      <View className="flex-row flex-1  relative py-[10px] items-center ">
        <TextInput
          className="absolute rounded-md bg-lightgray h-full w-full pl-10"
          keyboardType="default"
          placeholder="Restaurants, groceries, dishes"
        />
        <View className="absolute left-2" pointerEvents="none">
          <Ionicons name="search" size={20} color={Colors.grey} />
        </View>
      </View>
      <View>
        <Link href={"/(modal)/Filter"} asChild>
          <TouchableOpacity className="p-[10px] rounded-full bg-lightgray">
            <Ionicons name="options-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const openModal = () =>{
    bottomSheetRef.current?.present()
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <BottomSheet ref={bottomSheetRef}/>
      <View className="flex-row h-[65px] bg-white gap-[20px] items-center justify-between px-[20px]">
        <TouchableOpacity >
          <Image
            source={require("@/assets/images/temp_profile_pic.png")}
            className="object-cover h-[30px] w-[30px] rounded-full"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-1" onPress={openModal}>
          <Text className="text-sm text-medium">Delivery · Now</Text>
          <View className="flex-row items-center">
            <Text className="text-lg font-bold">Bangkok</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-lightgray p-[10px] rounded-full">
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

export default CustomHeader;
