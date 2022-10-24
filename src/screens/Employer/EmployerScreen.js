import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import Header from "../../components/Header/Header";
import CompanyHeader from "../../components/Header/CompanyHeader";
import UserContext from "../../context/UserContext";
import useChecked from "../../hooks/useChecked";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmployerWorkScreen from "./EmployerWorkScreen";
import EmployerCompanyScreen from "./EmployerCompanyScreen";
const height = Dimensions.get("screen").height;
const EmployerScreen = () => {
  const { colors } = useTheme();
  const [error] = useChecked();
  const state = useContext(UserContext);
  const Tab = createMaterialTopTabNavigator();
  const insents = useSafeAreaInsets();
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

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: !isFocused ? colors.background : "white",
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
    <View
      style={{
        backgroundColor: colors.header,
        height: height,
        paddingTop: insents.top,
        position: "absolute",
        width: "100%",
      }}
    >
      {state.isCompany ? (
        <CompanyHeader
          isEmployerAddWork={true}
          isSearch={true}
          sortWork={true}
        />
      ) : (
        <Header isEmployerSaved={true} sortWork={true} />
      )}
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Ажлын зар" component={EmployerWorkScreen} />
        <Tab.Screen name="Байгууллага" component={EmployerCompanyScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default EmployerScreen;

const styles = StyleSheet.create({});
