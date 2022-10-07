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
import MyButton from "../../components/MyButton";

const UserSendWorkRequest = ({ route }) => {
  const { id } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState();
  const [occupation, setOccupation] = useState("");
  const SendRequestWork = () => {
    axios
      .post(`${api}/api/v1/invitations/${id}`, {
        description: description,
        salary: salary,
        occupation: occupation,
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
        placeholder="Гарчиг"
        value={occupation}
        onChangeText={setOccupation}
        style={{
          marginTop: 10,
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
          borderColor: colors.border,
          color: colors.primaryText,
        }}
        placeholderTextColor={"#cccccccc"}
      />
      <TextInput
        placeholder="Ажлын хөлс"
        value={salary}
        onChangeText={setSalary}
        style={{
          marginTop: 10,
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
          borderColor: colors.border,
          color: colors.primaryText,
        }}
        placeholderTextColor={"#cccccccc"}
        keyboardType={"numeric"}
      />
      <TextInput
        placeholder="Тайлбар"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={"#cccccccc"}
        style={{
          marginVertical: 10,
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
          borderColor: colors.border,
          color: colors.primaryText,
        }}
      />
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: "#FFB6C1",
          borderWidth: 1,
          borderRadius: 10,
          opacity: occupation === "" ? 0.2 : 1,
        }}
        disabled={occupation === "" ? true : false}
        onPress={SendRequestWork}
      >
        <Text style={{ textAlign: "center" }}>Илгээх</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSendWorkRequest;

const styles = StyleSheet.create({});
