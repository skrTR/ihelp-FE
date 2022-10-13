import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import FormText from "../../../../components/FormText";

const ChangePasswordModal = () => {
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
      <Text
        style={[
          styles.textTitle,
          { color: colors.primaryText, fontWeight: "100", marginBottom: 10 },
        ]}
      >
        Ирсэн код
      </Text>

      <FormText value={recievedToken} onChangeText={setRecievedToken} />
      <View style={{ marginVertical: 5 }} />
      <Text
        style={[
          styles.textTitle,
          { color: colors.primaryText, fontWeight: "100", marginBottom: 10 },
        ]}
      >
        Нууц үг
      </Text>
      <FormText value={password1} onChangeText={setPassword1} secureTextEntry />
      <View style={{ marginVertical: 5 }} />
      <Text
        style={[
          styles.textTitle,
          { color: colors.primaryText, fontWeight: "100", marginBottom: 10 },
        ]}
      >
        Нууц үг давтах
      </Text>
      <FormText value={password2} onChangeText={setPassword2} secureTextEntry />
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          marginVertical: 10,
          backgroundColor: !Boolean(recievedToken && password1 && password2)
            ? colors.background
            : "#FFB6C1",
        }}
        onPress={changePassword}
      >
        <Text
          style={{
            textAlign: "center",
            color: !Boolean(recievedToken && password1 && password2)
              ? colors.primaryText
              : "black",
          }}
        >
          Солих
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({});
