import { View, TouchableOpacity, Animated, useColorScheme } from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import Header from "../../components/Header";
import UserContext from "../../context/UserContext";
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
                backgroundColor: !isFocused ? colors.background : "white",
                justifyContent: "center",
              }}
            >
              <Animated.Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 30,
                  color: isFocused ? colors.background : colors.primaryText,
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
      {/* {state.isCompany ? (
        <CompanyHeader isSearch={true} isEmployeeAddWork={true} />
      ) : (
        // <CompanyHeader isEmployeeAddWork={true} isSearch={true} />
      <Header isEmployeeSaved={true} isEmployeeAddWork={true} />
      )} */}
      <Header isEmployeeSort={true} isEmployeeAddWork={true} />
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Ажил гүйцэтгэгч" component={EmployeeWorkScreen} />
        <Tab.Screen name="Ажил захиалагч" component={EmployeeCompanyScreen} />
      </Tab.Navigator>
      {/* <Empty text={"Тун удахгүй"} /> */}
    </>
  );
};

export default EmployeeScreen;
