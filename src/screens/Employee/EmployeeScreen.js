import { View, TouchableOpacity, Animated, useColorScheme } from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";

import Header from "../../components/Header/Header";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmployeeWorkScreen from "./EmployeeWorkScreen";
import EmployeeCompanyScreen from "./EmployeeCompanyScreen";
const EmployeeScreen = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const Tab = createMaterialTopTabNavigator();
  const insents = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  function MyTabBar({ state, descriptors, navigation, position }) {
    return (
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0.2)),
          });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                flex: 1,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor:
                  colorScheme === "dark"
                    ? !isFocused
                      ? colors.background
                      : "white"
                    : colorScheme === "light" && !isFocused
                    ? colors.background
                    : "#FFB6C1",
              }}
            >
              <Animated.Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 30,
                  color:
                    colorScheme === "dark"
                      ? isFocused
                        ? colors.background
                        : colors.primaryText
                      : colorScheme === "light" && isFocused
                      ? "black"
                      : colors.primaryText,

                  textAlign: "center",
                }}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return (
    <>
      <View
        style={{ paddingTop: insents.top, backgroundColor: colors.header }}
      />
      {state.isCompany ? (
        <CompanyHeader isEmployeeAddWork={true} isSearch={true} />
      ) : (
        <Header isEmployeeSaved={true} />
      )}
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Ажлын зар" component={EmployeeWorkScreen} />
        <Tab.Screen name="Байгууллага" component={EmployeeCompanyScreen} />
      </Tab.Navigator>
    </>
  );
};

export default EmployeeScreen;
