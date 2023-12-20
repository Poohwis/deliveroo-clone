import { View, Text, ScrollView, StatusBar, Platform } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Categories from "@/components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "@/components/Restaurants";
import {StatusBar as SB} from 'expo-status-bar'

const Page = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight || 0);
  }, []);
  const indexMarginTop = Platform.OS === "android" ? statusBarHeight + 60 : 25;
  // this solution look hacking need to revise to reference with header height later
  return (
    <SafeAreaView
      className={`flex-1 bg-lightgray  `}
      style={{ marginTop: indexMarginTop, }}
    >
      <SB style="dark"/>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <Categories />
        <View className="mt-2 mx-4">
          <Text className="font-bold text-md">
            Top picks in your neighborhood
          </Text>
        </View>
        <Restaurants />
        <View className="mt-2 mx-4">
          <Text className="font-bold text-md">Offer near you</Text>
        </View>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
