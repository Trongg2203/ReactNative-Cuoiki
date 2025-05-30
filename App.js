import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2563eb", // Màu xanh dương tươi sáng (Blue 600)
    accent: "#f97316", // Màu cam ấm áp (Orange 500)
    background: "#f1f5f9", // Màu nền xám xanh nhạt (BlueGray 50)    
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle="light-content" //Chữ trắng, biểu tượng sáng
        backgroundColor={theme.colors.primary}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: "#ffffff", // Màu trắng cho các phần tử header
            headerTitleStyle: {
              fontWeight: "600",
              fontSize: 20,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.colors.background, // Màu nền cho vùng nội dung
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Latest News" }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Article Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
