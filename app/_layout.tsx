import { Stack, useNavigation } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Platform, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="(modal)/Filter"
          options={{
            presentation: "modal",
            gestureEnabled: true,
            headerTitle: "Filters",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { fontSize: 16 },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/LocationSearch"
          options={{
            presentation: "fullScreenModal",
            gestureEnabled: true,
            headerTitle: "Search location",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { fontSize: 16 },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("index" as never);
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
        name="(modal)/Dish"
        options={{
          presentation: 'modal',
          headerTransparent: true,
          headerTitle: '',
          // headerShadowVisible: false,
          headerLeft: ()=> (
            <TouchableOpacity
            className="p-2 bg-white rounded-full"
            onPress={()=>{navigation.goBack()}}>
                <Ionicons
                  name={Platform.OS === 'android' ? "arrow-back" : "close-outline"}
                  size={20}
                  color={Colors.primary}
                />
            </TouchableOpacity>
          )
        }}/>
      </Stack>
    </BottomSheetModalProvider>
  );
}
