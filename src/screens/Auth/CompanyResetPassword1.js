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
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import * as Animatable from "react-native-animatable";
import MyPasswordInput from "../../components/MyPasswordInput";
import MyTextInput from "../../components/MyTextInput";
const CompanyResetPassword1 = (props) => {
  const navigation = useNavigation();
  const { email } = props.route.params;
  const [random, setRandom] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { colors } = useTheme();
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
        navigation.navigate("CompanyAfterLogin", {
          SignEmail: email,
          SignPassword: password1,
        });
      })
      .catch((err) => {
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
          source={require("../../../assets/ihelp/companyhead.png")}
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
                color: colors.primary,
                fontFamily: "Sf-Nunito",
              }}
            >
              Байгууллага
            </Text>
          </View>
        </ImageBackground>
        <Text
          style={{
            fontSize: 18,
            color: colors.primary,
            textAlign: "center",
            fontFamily: "Sf-bold",
          }}
        >
          Хэрэглэгч баталгаажуулах
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.primary,
            textAlign: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          Таны оруулсан <Text>{email}</Text> и-мэйл хаяг луу 4 оронтой токен
          явуулсан.
        </Text>
        <View
          style={{
            marginTop: 20,
            bottom: 20,
            marginHorizontal: 20,
            height: 150,
          }}
        >
          <View style={{ top: 10, marginHorizontal: 20 }}>
            <Text style={[styles.inputHeadText, { color: colors.primary }]}>
              Токен:
            </Text>
            <MyTextInput value={random} onChangeText={setRandom} />
            <Text style={[styles.inputHeadText, { color: colors.primary }]}>
              Нууц үг:
            </Text>
            <MyPasswordInput
              value={password1}
              onChangeText={setPassword1}
              iconStyle={colors.primary}
            />
            <Text style={[styles.inputHeadText, { color: colors.primary }]}>
              Нууц үг баталгаажуулах:
            </Text>
            <MyPasswordInput
              value={password2}
              onChangeText={setPassword2}
              iconStyle={colors.primary}
            />
          </View>
          <TouchableOpacity style={{}} onPress={signUpHandler}>
            <ImageBackground
              source={require("../../../assets/ihelp/companybutton.png")}
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

export default CompanyResetPassword1;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
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
