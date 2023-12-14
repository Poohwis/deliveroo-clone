import { View, Text, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const [isToggled, setIsToggled] = useState<Boolean>(false);

  const handleModeToggle = () => {
    return setIsToggled(!isToggled);
  };

  return (
    <BottomSheetModal
      ref={ref}
      handleIndicatorStyle={{ display: "none" }}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: Colors.lightgray }}
    >
      <View className="flex-1 space-y-10">
        {/* toggle */}
        <View className="flex-row space-x-2  self-center  ">
          <TouchableOpacity
            className={`${
              isToggled ? "bg-transparent" : "bg-primary"
            } px-6 py-2 rounded-full`}
            onPress={() => {
              if (isToggled) {
                handleModeToggle();
              }
            }}
          >
            <Text className={`${isToggled ? "text-black" : "text-white"}`}>
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${
              isToggled ? "bg-primary" : "bg-transparent"
            } px-6 py-2  rounded-full`}
            onPress={() => {
              if (!isToggled) {
                handleModeToggle();
              }
            }}
          >
            <Text className={`${isToggled ? "text-white" : "text-black"}`}>
              Pickup
            </Text>
          </TouchableOpacity>
        </View>

        {/* Location and Time */}
        <View className=" space-y-2 ">
          <Text className="text-lg font-bold mx-2">Your Location</Text>
          <Link asChild href={"./"}>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-y border-gray-300 bg-white">
              <View className="flex-row items-center space-x-2 ml-2">
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={Colors.medium}
                />
                <Text className="text-md text-medium">Current Location</Text>
              </View>
              <View className="mr-2">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        <View className=" space-y-2">
          <Text className="text-lg font-bold mx-2">Arrival Time</Text>
          <Link asChild href={"./"}>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-y border-gray-300 bg-white">
              <View className="flex-row items-center space-x-2 ml-2">
                <Ionicons name="time-outline" size={20} color={Colors.medium} />
                <Text className="text-md text-medium">Now</Text>
              </View>
              <View className="mr-2">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        {/* ConfirmButton */}
        <TouchableOpacity
          onPress={() => {
            dismiss();
          }}
          className=" bg-primary items-center w-[85%] py-2 rounded-md self-center"
        >
          <Text className="text-white font-bold text-sm">Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;
