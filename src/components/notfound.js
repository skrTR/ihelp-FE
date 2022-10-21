import React from "react";
import LottieView from "lottie-react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
const Notfound = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <AntDesign
        name="arrowleft"
        size={30}
        color="#ffffff"
        style={{
          position: "absolute",
          top: 60,
          left: 10,
          zIndex: 2,
        }}
        onPress={() => navigation.goBack()}
      />
      <Image
        source={require("../../assets/ihelp/logo.png")}
        style={{ width: 300, height: 100, resizeMode: "contain" }}
      />
      <LottieView
        source={require("../../assets/404.json")}
        loop={true}
        autoPlay={true}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ color: colors.primaryText, fontSize: 30 }}>
        Алдаа гарлаа
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 20,
          borderRadius: 10,
        }}
      >
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{
            paddingVertical: 10,
            borderRadius: 10,
            padding: 10,
          }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 25 }}>
            {" "}
            Буцах{" "}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Notfound;
