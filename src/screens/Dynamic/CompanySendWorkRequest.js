import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";

const CompanySendWorkRequest = ({ route }) => {
  const { id } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [name, setName] = useState("");
  const SendRequestWork = () => {
    axios
      .post(`${api}/api/v1/invitations/${id}`, {
        description: description,
        salary: salary,
        name: name,
      })
      .then((res) => {
        navigation.goBack();
        Alert.alert("Ажлын хүсэлт амжиллтай илгээгдлээ");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ marginHorizontal: 20 }}>
      <TextInput
        placeholder="Ажлын санал"
        value={name}
        onChangeText={setName}
        style={{
          marginTop: 10,
          borderWidth: 1,
          padding: 15,
          borderRadius: 20,
          borderColor: colors.border,
          color: colors.primaryText,
        }}
      />
      <TextInput
        placeholder="Цалин"
        value={salary.toString()}
        onChangeText={setSalary}
        style={{
          marginTop: 10,
          borderWidth: 1,
          padding: 15,
          borderRadius: 20,
          borderColor: colors.border,
          color: colors.primaryText,
        }}
      />
      <TextInput
        placeholder="Тайлбар"
        value={description}
        onChangeText={setDescription}
        style={{
          marginVertical: 10,
          borderWidth: 1,
          padding: 15,
          borderRadius: 20,
          borderColor: colors.border,
          color: colors.primaryText,
        }}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#FFB6C1",
          borderWidth: 1,
          borderRadius: 20,
          opacity: name === "" ? 0.2 : 1,
        }}
        disabled={name === "" ? true : false}
        onPress={SendRequestWork}
      >
        <Text style={{ textAlign: "center" }}>Илгээх</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompanySendWorkRequest;

const styles = StyleSheet.create({});
