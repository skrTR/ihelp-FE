import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
const Verify = (props) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        ...props.style,
      }}
    >
      <AntDesign name="check" size={props.size} color={colors.primaryText} />
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({});
