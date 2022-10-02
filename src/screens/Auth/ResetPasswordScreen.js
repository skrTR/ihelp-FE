import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../../components/MyTextInput";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
const ResetPasswordScreen2 = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/cvs/forgot-password`, { phone: phone })
      .then((res) => {
        setMessage(res.data.success);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
        navigation.goBack();
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView style={{ flex: 1 }}>
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
        <ImageBackground
          source={require("../../../assets/ihelp/personhead.png")}
          style={{ flex: 1, height: 220 }}
          resizeMode="cover"
        >
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            direction="alternate"
            easing="ease-out"
            source={require("../../../assets/ihelp/logo.png")}
            style={{ width: 250, height: 90, alignSelf: "center", top: 65 }}
          />
          <View
            style={{
              backgroundColor: "white",
              top: 80,
              marginHorizontal: 100,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              padding: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#765097",
                fontFamily: "Sf-Nunito",
              }}
            >
              Хувь хүн
            </Text>
          </View>
        </ImageBackground>
        <View style={{ top: 10, marginHorizontal: 20 }}>
          <Text style={styles.inputHeadText}>Утас:</Text>
          <MyTextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={{ flex: 1, top: 5 }}
          onPress={() => {
            if (phone.length < 5) {
              return alert("Та утасны дугаараа оруулна уу");
            }
            sendMessage();
            navigation.navigate("ResetPasswordScreen2", {
              phone: phone,
            });
          }}
        >
          <ImageBackground
            source={require("../../../assets/ihelp/personbutton.png")}
            style={{ height: 100 }}
          >
            <Text
              style={{
                top: 45,
                fontSize: 18,
                color: "white",
                textAlign: "center",
              }}
            >
              Илгээх
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen2;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#765097",
    fontWeight: "600",
  },

  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
    color: "grey",
    fontWeight: "bold",
  },
});
