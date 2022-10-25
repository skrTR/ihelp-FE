import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
const FollowButton = (props) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={{
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color:
              colorScheme === "dark"
                ? props.follow
                  ? colors.primaryText
                  : colors.border
                : props.follow
                ? colors.primaryText
                : colors.primaryText,
            ...props.fontStyle,
          }}
        >
          {props.follow ? "Дагасан" : "Дагах"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FollowButton;

const styles = StyleSheet.create({});
