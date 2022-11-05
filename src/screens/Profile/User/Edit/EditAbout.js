import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
const EditAbout = ({ route }) => {
  const { about } = route.params;
  const { colors } = useTheme();
  const [postText, setPostText] = useState(
    about === "me" ? "Tа өөрийгөө танилцуулна уу" : about
  );
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const sendPersonalDetail = () => {
    axios
      .put(`${api}/api/v1/cvs/${state.userId}`, { about: postText })
      .then((res) => {
        navigation.goBack();
        Alert.alert("Амжилттай хадгаллаа");
      })
      .catch((err) => alert(err));
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      keyboardDismissMode={"on-drag"}
    >
      <Text
        style={{
          color: colors.primaryText,
          fontFamily: "Sf-bold",
          fontSize: 20,
          margin: 20,
        }}
      >
        Өөрийн тухай
      </Text>
      <View
        style={{
          borderWidth: 1,
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 10,
          borderColor: colors.border,
        }}
      >
        <TextInput
          placeholder="Та өөрийгөө танилцуулна уу"
          multiline={true}
          onChangeText={setPostText}
          value={postText}
          placeholderTextColor={colors.secondaryText}
          style={{
            color: colors.primaryText,
            paddingBottom: 100,
          }}
        />
      </View>
      <Text
        style={{ margin: 20, color: colors.primaryText, textAlign: "right" }}
      >
        {postText ? postText.length : "0"}/255
      </Text>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          backgroundColor: "#FFB6C1",
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
        onPress={sendPersonalDetail}
      >
        <Text style={{ color: "black" }}>Хадгалах</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditAbout;

const styles = StyleSheet.create({});
