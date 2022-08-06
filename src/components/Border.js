import { View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const Border = (props) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        marginTop: props.margin,
      }}
    />
  );
};

export default Border;
