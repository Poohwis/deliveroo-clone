import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location>({
    latitude: 51,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View className="flex-1 ">
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails
        onPress={(data, details = null) => {
          const point = details?.geometry.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={()=>(
        <View className="absolute z-10 left-[12px] top-[18px]">

        <Ionicons name="search-outline" size={24} color={Colors.medium}/>
        </View>)}
        styles={{
          container: { flex: 0 },
          textInput: { backgroundColor: Colors.grey, paddingLeft: 30, borderRadius: 10 },
          textInputContainer: { backgroundColor: 'white', padding: 8 },
        }}
      />
      <MapView
        className="flex-1"
        region={location}
        showsUserLocation
        provider="google"
      />
      <View className=" absolute bottom-8 w-full items-center px-4 ">
        <TouchableOpacity
          className="h-10 w-full  bg-primary rounded-md items-center justify-center"
          onPress={() => navigation.navigate("index" as never)}
        >
          <Text className="text-md font-bold text-white">Comfirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSearch;
