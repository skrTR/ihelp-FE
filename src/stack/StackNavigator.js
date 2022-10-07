import React, { useContext, useEffect } from "react";
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
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";
import ResetPasswordScreen2 from "../screens/Auth/ResetPasswordScreen2";
import PersonAfterLogin from "../screens/Auth/PersonAfterLogin";
import CompanyAfterLogin from "../screens/Auth/CompanyAfterLogin";
import CompanyResetPassword1 from "../screens/Auth/CompanyResetPassword1";
import CompanyResetPassword from "../screens/Auth/CompanyResetPassword";

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
          initialRouteName="Ажилтан авна"
          sceneContainerStyle={{ backgroundColor: colors.background }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Ажил авна") {
                iconName = focused ? "briefcase" : "briefcase-outline";
              } else if (route.name === "Ажилтан авна") {
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
            name="Ажил авна"
            component={EmployeeGroup}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Ажилтан авна"
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
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="ResetPasswordScreen2"
            component={ResetPasswordScreen2}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="PersonAfterLogin"
            component={PersonAfterLogin}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="CompanyAfterLogin"
            component={CompanyAfterLogin}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="CompanyResetPassword"
            component={CompanyResetPassword}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <Stack.Screen
            name="CompanyResetPassword1"
            component={CompanyResetPassword1}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;
