import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import MyTextInput from "../../components/MyTextInput";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { api } from "../../../Constants";
import MyPasswordInput from "../../components/MyPasswordInput";
const CompanySignUpScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [isEmployer, setIsEmployer] = useState(true);
  const [isEmployee, setIsEmployee] = useState(false);
  const signUpHandler = () => {
    axios
      .post(`${api}/api/v1/profiles`, {
        firstName: name,
        phone: phone,
        email: email,
        password: password,
        isEmployer: isEmployer,
        isEmployee: isEmployee,
      })
      .then((res) => {
        navigation.navigate("CompanyAfterLogin", {
          SignEmail: email,
          SignPassword: password,
        });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
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
        <View style={{ top: 10, marginHorizontal: 20 }}>
          <Text style={[styles.inputHeadText, { color: colors.primary }]}>
            Байгууллагын нэр:
          </Text>
          <MyTextInput value={name} onChangeText={setName} />
          <Text style={[styles.inputHeadText, { color: colors.primary }]}>
            Утас:
          </Text>
          <MyTextInput value={phone} onChangeText={setPhone} />
          <Text style={[styles.inputHeadText, { color: colors.primary }]}>
            И-мэйл хаяг:
          </Text>
          <MyTextInput value={email} onChangeText={setEmail} />
          <Text style={[styles.inputHeadText, { color: colors.primary }]}>
            Нууц үг:
          </Text>
          <MyPasswordInput
            value={password1}
            onChangeText={setPassword1}
            iconStyle={colors.primary}
          />
          <Text style={[styles.inputHeadText, { color: colors.primary }]}>
            Нууц үг давтах:
          </Text>
          <MyPasswordInput
            value={password}
            onChangeText={setPassword}
            iconStyle={colors.primary}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            top: 34,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setIsEmployer(!isEmployer)}
          >
            <MaterialCommunityIcons
              name={
                !isEmployer
                  ? "checkbox-multiple-blank-outline"
                  : "checkbox-multiple-marked"
              }
              size={24}
              color={colors.primary}
            />
            <Text style={{ color: colors.primary }}> Ажил олгогч</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsEmployee(!isEmployee)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={
                !isEmployee
                  ? "checkbox-multiple-blank-outline"
                  : "checkbox-multiple-marked"
              }
              size={24}
              color={colors.primary}
            />
            <Text style={{ color: colors.primary }}> Ажил гүйцэтгэгч</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ flex: 1, top: 35 }} onPress={signUpHandler}>
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
              Бүртгүүлэх
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CompanySignUpScreen;

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
