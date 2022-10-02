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
          top: 5,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <AntDesign
          name={props.follow ? "deleteuser" : "adduser"}
          size={24}
          color={props.follow ? colors.primaryText : colors.border}
        />
        <Text
          style={{
            textAlign: "center",
            color: props.follow ? colors.primaryText : colors.border,
          }}
        >
          {props.follow ? "Дагадаг" : "   Дагаx"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FollowButton;

const styles = StyleSheet.create({});
