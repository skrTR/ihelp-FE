import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import FormText from "../../../../components/FormText";
import MyButton from "../../../../components/MyButton";

const ChangeCompanyPassword = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [recievedToken, setRecievedToken] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const changePassword = () => {
    if (password1 !== password2) {
      return Alert.alert("Нууц үг таарахгүй байна", "");
    }
    axios
      .post(`${api}/api/v1/cvs/reset-password`, {
        password: password1,
        resetToken: recievedToken,
      })
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };
  return (
    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Ирсэн код
      </Text>

      <FormText value={recievedToken} onChangeText={setRecievedToken} />
      <View style={{ marginVertical: 5 }} />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Нууц үг
      </Text>
      <FormText
        value={password1}
        onChangeText={setPassword1}
        secureTextEntry={false}
      />
      <View style={{ marginVertical: 5 }} />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        Нууц үг давтах
      </Text>
      <FormText value={password2} onChangeText={setPassword2} secureTextEntry />
      <View style={{ marginVertical: 5 }} />
      <MyButton text="Солих" onPress={changePassword} />
    </View>
  );
};

export default ChangeCompanyPassword;

const styles = StyleSheet.create({});
