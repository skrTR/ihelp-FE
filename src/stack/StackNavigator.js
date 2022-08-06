import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
// Groups
import CvGroup from "./CvGroup";
import SearchGroup from "./SearchGroup";
import EmployeeGroup from "./EmployeeGroup";
import EmployerGroup from "./EmployerGroup";
import NetworkingGroup from "./NetworkingGroup";
import ProfileGroup from "./ProfileGroup";
// LoginScreen
import PersonLoginScreen from "../screens/Auth/PersonLoginScreen";
import HomeScreen from "../screens/HomeScreen";
import CompanyLoginScreen from "../screens/Auth/CompanyLoginScreen";
import SplashScreen from "../screens/SplashScreen";
import PersonSignUpScreen from "../screens/Auth/PersonSignUpScreen";
import PersonSignUpScreen2 from "../screens/Auth/PersonSignUpScreen2";
import CompanySignUpScreen from "../screens/Auth/CompanySignUpScreen";
import VerificationScreen from "../screens/Auth/VerifyScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      {state.isLoggedIn ? (
        <Tab.Navigator
          initialRouteName="Ажил хийе"
          sceneContainerStyle={{ backgroundColor: colors.background }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Ажил өгье") {
                iconName = focused ? "briefcase" : "briefcase-outline";
              } else if (route.name === "Ажил хийе") {
                iconName = focused ? "business" : "business-outline";
              } else if (route.name === "Нетворк") {
                iconName = focused ? "people-sharp" : "people-outline";
              } else if (route.name === "Профайл") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              } else if (route.name === "AnketStack") {
                iconName = focused ? "logo-ionic" : "md-logo-ionic";
              } else if (route.name === "Хайх") {
                iconName = focused ? "md-search-sharp" : "md-search-outline";
              } else if (route.name === "Анкет сан") {
                iconName = focused ? "logo-ionic" : "md-logo-ionic";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FFB6C1",
            tabBarInactiveTintColor: colors.secondaryText,
          })}
        >
          <Tab.Screen
            name="Хайх"
            component={SearchGroup}
            options={{ headerShown: false }}
          />

          <Tab.Screen
            name="Ажил өгье"
            component={EmployeeGroup}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Ажил хийе"
            component={EmployerGroup}
            options={{ headerShown: false }}
          />
          {state.isCompany ? (
            <Tab.Screen
              name="Анкет сан"
              component={CvGroup}
              options={{ headerShown: false }}
            />
          ) : (
            <Tab.Screen
              name="Нетворк"
              component={NetworkingGroup}
              options={{ headerShown: false }}
            />
          )}
          <Tab.Screen
            name="Профайл"
            component={ProfileGroup}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonLoginScreen"
            component={PersonLoginScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="VerifyScreen"
            component={VerificationScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="PersonSignUpScreen"
            component={PersonSignUpScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="PersonSignUpScreen2"
            component={PersonSignUpScreen2}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="CompanyLoginScreen"
            component={CompanyLoginScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="CompanySignUpScreen"
            component={CompanySignUpScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;
