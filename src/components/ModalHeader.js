import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useTheme } from "@react-navigation/native";
const ModalHeader = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" color={colors.primaryText} size={30} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: "Sf-bold",
            fontSize: 18,
          }}
        >
          {props.text}
        </Text>
        <Text>{"          "}</Text>
      </View>
      <View
        style={{ borderWidth: 1, borderColor: colors.border, marginBottom: 10 }}
      />
    </>
  );
};

export default ModalHeader;
