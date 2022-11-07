import React from "react";
import LottieView from "lottie-react-native";
import { View, Text, Image } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
const Loading = ({ back }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      {back && (
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.primaryText}
          style={{
            position: "absolute",
            top: 30,
            left: 10,
            zIndex: 2,
          }}
          onPress={() => navigation.goBack()}
        />
      )}

      <Image
        source={require("../../assets/ihelp/logo.png")}
        style={{ width: 300, height: 100, resizeMode: "contain" }}
      />
      <LottieView
        source={require("../../assets/testLoading.json")}
        loop={true}
        autoPlay={true}
        style={{ width: 300, height: 300 }}
      />
      <Animatable.Text
        animation="pulse"
        iterationCount="infinite"
        direction="alternate"
        easing="ease-out"
        style={{ color: colors.primaryText, fontSize: 30, fontWeight: "100" }}
      >
        Та түр хүлээнэ үү
      </Animatable.Text>
    </View>
  );
};

export default Loading;
