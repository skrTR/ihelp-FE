import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import NetworkingTextInput from "../../components/NetworkingTextInput";
import FormText from "../../components/FormText";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";

const CommentDetailModal = ({ route }) => {
  const { id, text } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [description, setDescription] = useState(text ? text : "");
  const deleteComment = () => {
    Alert.alert(
      "Анхаар",
      "Та өөрийн бичсэн сэтгэгдлээ устгахдаа итгэлтэй байна уу",
      [
        {
          text: "Үгүй",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            axios
              .delete(`${api}/api/v1/comments/${id}`)
              .then((res) => {
                alert("Таны сэтгэгдэл амжилтай устлаа");
                navigation.goBack();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ]
    );
  };
  const editComment = () => {
    axios
      .put(`${api}/api/v1/comments/${id}`, {
        description: description,
      })
      .then((res) => {
        alert("Таны сэтгэгдэл амжилтай шинэчлэгдлээ");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ margin: 10 }}>
      <FormText
        placeholder="Коммент"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          marginTop: 10,
          backgroundColor: "#FFB6C1",
        }}
        onPress={editComment}
      >
        <Text style={{ color: "black" }}>Өөрчлөх</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          marginTop: 10,
        }}
        onPress={deleteComment}
      >
        <Text style={{ color: colors.primaryText }}>Устгах</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentDetailModal;

const styles = StyleSheet.create({});
