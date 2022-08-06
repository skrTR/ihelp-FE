import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { api } from "../../../Constants";
const VerificationScreen = (props) => {
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { firstName, lastName, phone, password, email } = props.route.params;
  const [random, setRandom] = useState();
  const [counter, setCounter] = useState(59);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);
  const signUpHandler = () => {
    state.signUp(phone, email, password, firstName, lastName, random);
  };
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/cvs/send`, { phone: phone })
      .then((res) => {})
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
        navigation.goBack();
      });
  };
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        {/* Header */}
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
              OTP код
            </Text>
          </View>
        </ImageBackground>
        <View>
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 5,
              paddingTop: 10,
              paddingBottom: 5,
              color: "#765097",
              fontWeight: "600",
            }}
          >
            Хэрэглэгч баталгаажуулах
          </Text>
          <Text
            style={{
              fontSize: 12,
              paddingLeft: 5,
              paddingTop: 10,
              paddingBottom: 5,
              color: "#765097",
            }}
          >
            Таны оруулсан <Text>{phone}</Text> дугаар луу 4 оронтой код
            явуулсан.
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 20,
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 1: text });
                  text && secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 2: text });
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 3: text });
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 4: text });
                  !text && thirdInput.current.focus();
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={{ top: 5 }} onPress={signUpHandler}>
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
                Нэвтрэх
              </Text>
            </ImageBackground>
          </TouchableOpacity>

          {counter > 0 ? (
            <Text style={{ textAlign: "right", marginRight: 10 }}>
              {" "}
              Дахин message илгээх 00:{counter}{" "}
            </Text>
          ) : (
            <Text
              style={{ textAlign: "right", marginRight: 10 }}
              onPress={() => {
                sendMessage();
                setCounter(59);
              }}
            >
              Дахин message илгээх
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    width: "20%",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: "yellow",
  },

  otpBox: {
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: "black",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor: "green",
    borderRadius: 8,
    marginHorizontal: 20,
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: "white",
  },
});

export default VerificationScreen;
