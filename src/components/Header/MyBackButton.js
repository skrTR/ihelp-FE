import { View } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
const MyBackButton = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View>
      <AntDesign
        name="left"
        size={30}
        color={colors.primaryText}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default MyBackButton;
