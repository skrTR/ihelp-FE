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
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";
import ResetPasswordScreen2 from "../screens/Auth/ResetPasswordScreen2";
import PersonAfterLogin from "../screens/Auth/PersonAfterLogin";
import CompanyAfterLogin from "../screens/Auth/CompanyAfterLogin";
import CompanyResetPassword1 from "../screens/Auth/CompanyResetPassword1";
import CompanyResetPassword from "../screens/Auth/CompanyResetPassword";
import TermsPolicy from "../screens/Auth/TermsPolicy";
import MyBackButton from "../components/Header/MyBackButton";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const colorScheme = useColorScheme();
  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      {state.isLoggedIn ? (
        <Tab.Navigator
          initialRouteName="EmployerStack"
          sceneContainerStyle={{ backgroundColor: colors.background }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "EmployeeStack") {
                iconName = focused ? "briefcase" : "briefcase-outline";
              } else if (route.name === "EmployerStack") {
                iconName = focused ? "business" : "business-outline";
              } else if (route.name === "NetworkingStack") {
                iconName = focused ? "people-sharp" : "people-outline";
              } else if (route.name === "ProfileStack") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              } else if (route.name === "AnketStack") {
                iconName = focused ? "logo-ionic" : "md-logo-ionic";
              } else if (route.name === "SearchStack") {
                iconName = focused ? "md-search-sharp" : "md-search-outline";
              } else if (route.name === "CvStack") {
                iconName = focused ? "logo-ionic" : "md-logo-ionic";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FFB6C1",
            // colorScheme === "dark" ?  : "#FDEDEC",
            tabBarInactiveTintColor:
              colorScheme === "dark" ? colors.secondaryText : "#2c3539",
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen
            name="SearchStack"
            component={SearchGroup}
            options={{ headerShown: false, title: "Хайх" }}
          />

          <Tab.Screen
            name="EmployeeStack"
            component={EmployeeGroup}
            options={{ headerShown: false, title: "Ажил захиалга" }}
          />
          <Tab.Screen
            name="EmployerStack"
            component={EmployerGroup}
            options={{ headerShown: false, title: "Ажлын байр" }}
          />
          {state.isCompany ? (
            <Tab.Screen
              name="CvStack"
              component={CvGroup}
              options={{ headerShown: false, title: "Анкет сан" }}
            />
          ) : (
            <Tab.Screen
              name="NetworkingStack"
              component={NetworkingGroup}
              options={{ headerShown: false, title: "Нетворк" }}
            />
          )}
          <Tab.Screen
            name="ProfileStack"
            component={ProfileGroup}
            options={{ headerShown: false, title: "Профайл" }}
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
          <Stack.Screen
            name="TermsPolicy"
            component={TermsPolicy}
            options={{
              fullScreenGestureEnabled: true,
              presentation: "formSheet",
              title: "Үйлчилгээний нөхцөл",
              headerLeft: () => <MyBackButton />,
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;
