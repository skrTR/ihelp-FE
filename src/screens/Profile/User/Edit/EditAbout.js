import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
const EditAbout = ({ route }) => {
  const { about } = route.params;
  const { colors } = useTheme();
  const [postText, setPostText] = useState(about);
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
    <View>
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
          placeholder="Та өөрийгөө танилцуулна уу?"
          multiline={true}
          numberOfLines={10}
          onChangeText={setPostText}
          value={postText}
          placeholderTextColor={colors.secondaryText}
          style={{
            color: colors.primaryText,
            paddingVertical: 200,
          }}
        />
      </View>
      <Text
        style={{ margin: 20, color: colors.primaryText, textAlign: "right" }}
      >
        {postText.length}/255
      </Text>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={sendPersonalDetail}
      >
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{ padding: 10, paddingHorizontal: 20, borderRadius: 10 }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <Text style={{ color: colors.primaryText, fontFamily: "Sf-bold" }}>
            Хадгалах
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default EditAbout;

const styles = StyleSheet.create({});
