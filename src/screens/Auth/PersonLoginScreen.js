import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import MyTextInput from "../../components/MyTextInput";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import UserContext from "../../context/UserContext";
import MyPasswordInput from "../../components/MyPasswordInput";

const PersonLoginScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const signUpHandler = () => {
    state.login(phone, password);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
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
            source={require("../../../assets/header.png")}
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

        <View style={{ top: 10, flex: 1 }}>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.inputHeadText}>Утасны дугаар:</Text>
            <MyTextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="number-pad"
            />

            <Text style={styles.inputHeadText}>Нууц үг:</Text>
            <MyPasswordInput
              value={password}
              onChangeText={setPassword}
              iconStyle={"#765097"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, top: 5 }}
              onPress={signUpHandler}
            >
              <ImageBackground
                source={require("../../../assets/ihelp/personbutton.png")}
                style={{ height: 100 }}
                imageStyle={{ resizeMode: "contain" }}
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
            <View style={{ flex: 1, marginBottom: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  alignSelf: "center",
                  color: "black",
                  marginBottom: 10,
                }}
              >
                Бүртгүүлэх бол{" "}
                <Text
                  style={{ color: colors.primary }}
                  onPress={() => navigation.navigate("PersonSignUpScreen")}
                >
                  энд дар
                </Text>{" "}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  alignSelf: "center",
                  color: "black",
                }}
              >
                Хэрэв та нууц үгээ мартсан бол{" "}
                <Text
                  style={{ color: colors.primary }}
                  onPress={() => navigation.navigate("ResetPasswordScreen")}
                >
                  энд дар
                </Text>{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonLoginScreen;

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
