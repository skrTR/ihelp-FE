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
import { useNavigation, useTheme } from "@react-navigation/native";
import MyTextInput from "../../components/MyTextInput";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import MyPasswordInput from "../../components/MyPasswordInput";
const PersonSignUpScreen = () => {
  const navigation = useNavigation();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [message, setMessage] = useState();
  const [email, setEmail] = useState("");
  const { colors } = useTheme();
  const [check, setCheck] = useState(false);
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/cvs/send`, { phone: phone })
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
          <Text style={styles.inputHeadText}>Овог нэр:</Text>
          <MyTextInput value={lastName} onChangeText={setLastName} />
          <Text style={styles.inputHeadText}>Өөрийн нэр:</Text>
          <MyTextInput value={firstName} onChangeText={setFirstName} />
          <Text style={styles.inputHeadText}>Утас:</Text>
          <MyTextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
          <Text style={styles.inputHeadText}>И-мэйл хаяг:</Text>
          <MyTextInput value={email} onChangeText={setEmail} />
          <Text style={styles.inputHeadText}>Нууц үг:</Text>
          <MyPasswordInput
            value={password}
            onChangeText={setPassword}
            iconStyle={"#765097"}
          />
          <Text style={styles.inputHeadText}>Нууц үг:</Text>
          <MyPasswordInput
            value={password1}
            onChangeText={setPassword1}
            iconStyle={"#765097"}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            left: 20,
            marginTop: 25,
          }}
          onPress={() => setCheck(!check)}
        >
          <MaterialIcons
            name={!check ? "radio-button-unchecked" : "radio-button-checked"}
            size={24}
            color={!check ? "black" : "#765097"}
          />
          <View style={{ width: "90%" }}>
            <Text>
              Үйлчилгээний нөхцөл зөвшөөрөх{" "}
              <Text
                style={{ color: colors.primary }}
                onPress={() => navigation.navigate("TermsPolicy")}
              >
                үйлчилгээний нөхцөлтэй үзэх
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            if (lastName.length < 1) {
              return Alert.alert("Та өөрийн овгоо оруулна уу");
            } else if (firstName.length < 1) {
              return Alert.alert("Та өөрийн нэрийг оруулна уу");
            } else if (phone.length < 5) {
              return Alert.alert("Та утасны дугаараа оруулна уу");
            } else if (password !== password1) {
              return Alert.alert("Нууц үг таарахгүй байна.");
            } else if (!check) {
              return Alert.alert("Үйлчилгээний нөхцөл зөвшөөрнө үү");
            }
            sendMessage();
            navigation.navigate("PersonSignUpScreen2", {
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              password: password,
              email: email,
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
              Бүртгүүлэх
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonSignUpScreen;

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
