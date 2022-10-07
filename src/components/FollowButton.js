import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const FollowButton = (props) => {
  const { colors } = useTheme();
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
            color: props.follow ? colors.primaryText : colors.border,
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
