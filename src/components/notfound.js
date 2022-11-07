import React from "react";
import LottieView from "lottie-react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
const Notfound = ({ message, isHeader }) => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [text, setText] = useState(message);
  if (text === "Network Error") {
    setText("Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "Request failed with status code 429") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "403 Forbidden") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "Request failed with status code 404") {
    setText("Сервер таны хайсан хүсэлтийг олсонгүй");
  } else if (text === "Request failed with status code 408") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "Request failed with status code 413") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "Request failed with status code 500") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "Request failed with status code 502") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "Request failed with status code 504") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text == "JSON Parse error: Unrecognized token '<'") {
    setText("Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу");
  } else if (text === "Request failed with status code 400") {
    state.logout();
    setText("Та апп аа гаргаад оруулна уу");
  }
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      {!isHeader && (
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
      )}
      <Image
        source={require("../../assets/ihelp/logo.png")}
        style={{ width: 300, height: 100, resizeMode: "contain" }}
      />
      <LottieView
        source={require("../../assets/error.json")}
        loop={true}
        autoPlay={true}
        style={{ width: 300, height: 300 }}
      />
      <Text
        style={{
          color: colors.primaryText,
          fontSize: 30,
          marginHorizontal: 20,
          textAlign: "center",
        }}
      >
        {text
          ? text
          : "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу"}
      </Text>
    </View>
  );
};

export default Notfound;
