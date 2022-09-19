import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import axios from "axios";
import { api } from "../../../Constants";
import * as Animatable from "react-native-animatable";
import MyPasswordInput from "../../components/MyPasswordInput";
const ResetPasswordScreen2 = (props) => {
  const navigation = useNavigation();
  const { phone } = props.route.params;
  const [random, setRandom] = useState();
  const [counter, setCounter] = useState(59);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);
  const signUpHandler = () => {
    if (password1 !== password2) {
      alert("Нууц үг таарахгүй байна");
    }
    axios
      .post(`${api}/api/v1/cvs/reset-password`, {
        password: password1,
        resetToken: random,
      })
      .then((res) => {
        navigation.navigate("PersonAfterLogin", {
          SignPhone: phone,
          SignPassword: password1,
        });
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert(err.response.data.error.message);
      });
  };
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/cvs/forgot-password`, { phone: phone })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert(err.response.data.error.message);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#ffffff" }}
    >
      <ScrollView style={{ flex: 1 }}>
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
              }}
            >
              Person
            </Text>
          </View>
        </ImageBackground>
        <Text
          style={{
            fontSize: 18,
            color: "#765097",
            textAlign: "center",
            fontFamily: "Sf-bold",
          }}
        >
          Хэрэглэгч баталгаажуулах
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#765097",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Таны оруулсан <Text>{phone}</Text> дугаар луу 4 оронтой код явуулсан.
        </Text>
        <View
          style={{
            marginTop: 20,
            bottom: 20,
            marginHorizontal: 20,
            height: 150,
          }}
        >
          <OTPInputView
            pinCount={4}
            code={random}
            onCodeChanged={(val) => setRandom(val)}
            autoFocusOnLoad
            onCodeFilled={(code) => {}}
            codeInputFieldStyle={{ color: "#765097", borderRadius: 10 }}
            codeInputHighlightStyle={{
              borderColor: "#765097",
              borderRadius: 10,
            }}
          />
          {counter > 0 ? (
            <Text style={{ textAlign: "right", marginRight: 10 }}>
              {" "}
              Дахин мессеж илгээх 00:{counter}{" "}
            </Text>
          ) : (
            <TouchableOpacity
              style={{
                marginRight: 10,
                backgroundColor: "#765097",
                alignSelf: "flex-end",
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                sendMessage();
                setCounter(59);
              }}
            >
              <Text style={{ textAlign: "right" }}>Дахин мессеж илгээх</Text>
            </TouchableOpacity>
          )}
          <View style={{ top: 10, marginHorizontal: 20 }}>
            <Text style={styles.inputHeadText}>Нууц үг:</Text>
            <MyPasswordInput value={password1} onChangeText={setPassword1} />
            <Text style={styles.inputHeadText}>Нууц үг баталгаажуулах:</Text>
            <MyPasswordInput value={password2} onChangeText={setPassword2} />
          </View>
          <TouchableOpacity style={{}} onPress={signUpHandler}>
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
        </View>
        <View style={{ marginBottom: 500 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen2;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
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
