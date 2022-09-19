import React from "react";
import LottieView from "lottie-react-native";
import { View, Text } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
const Loading = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AntDesign
        name="arrowleft"
        size={30}
        color="#ffffff"
        style={{
          position: "absolute",
          top: 50,
          left: 10,
          zIndex: 2,
        }}
        onPress={() => navigation.goBack()}
      />
      <LottieView
        source={require("../../assets/space.json")}
        loop={true}
        autoPlay={true}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ color: colors.primaryText, fontSize: 30 }}>
        Та түр хүлээнэ үү
      </Text>
    </View>
  );
};

export default Loading;
