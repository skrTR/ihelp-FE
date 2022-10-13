import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const MyButton = (props) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
      }}
      onPress={props.onPress}
      {...props}
    >
      <Text
        style={{
          textAlign: "center",
          ...props.textStyle,
          color: colors.primaryText,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({});
