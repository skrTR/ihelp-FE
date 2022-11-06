import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";

const PostReport = () => {
  const [report, setReport] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();
  const sendReport = () => {
    Alert.alert(
      "Таны гомдол амжилтай илгээгдлээ бид шалгаад таны гомдолыг тун удахгүй шийдвэрлэх болно"
    );
    navigation.navigate("NetworkingScreen");
  };
  return (
    <View>
      <TextInput
        placeholder="Гомдол мэдүүлэх"
        value={report}
        onChangeText={setReport}
        style={{
          margin: 10,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 10,
          borderRadius: 10,
          color: colors.primaryText,
        }}
      />
      <TouchableOpacity
        onPress={sendReport}
        style={{
          marginTop: 10,
          borderRadius: 10,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: "#FFB6C1",
        }}
      >
        <Text style={{ color: "black", textAlign: "center" }}> Хадгалах </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostReport;

const styles = StyleSheet.create({});
