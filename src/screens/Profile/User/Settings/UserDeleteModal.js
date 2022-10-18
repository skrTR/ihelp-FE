import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ModalHeader from "../../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";
import FormText from "../../../../components/FormText";
import { api } from "../../../../../Constants";
import axios from "axios";

const UserDeleteModal = (props) => {
  const { deleteModal, setDeleteModal, id } = props;
  const [password, setPassword] = useState("");

  const { colors } = useTheme();
  const userDelete = () => {
    console.log(id);
    Alert.alert("Та өөрийн профайл устгахдаа", "итгэлтэй байна уу?", [
      {
        text: "Болих",
        onPress: () => {
          console.log("Cancel Pressed");
        },
        style: "cancel",
      },
      {
        text: "Устгах",
        onPress: () => {
          axios
            .delete(`${api}/api/v1/cvs/${id}/${password}`)
            .then((res) => {
              state.logout();
              console.log(res.data);
            })
            .catch((err) => {
              let message = err.response.data.error.message;
              alert(message);
              console.log(err);
            });
        },
      },
    ]);
  };
  return (
    <Modal
      animationType="slide"
      visible={deleteModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setDeleteModal(!deleteModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Профайл устгах"
          clicked={() => setDeleteModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={[styles.inputHeadText]}>Нууц үг:</Text>
          <FormText value={password} onChangeText={setPassword} />
          <TouchableOpacity
            style={{
              backgroundColor:
                password.length > 1 ? "#FFB6C1" : colors.background,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 15,
              borderWidth: 1,
              borderColor: colors.border,
            }}
            onPress={userDelete}
            disabled={password.length < 1 ? true : false}
          >
            <Text
              style={{
                color: password.length > 1 ? "black" : colors.primaryText,
              }}
            >
              Устгах
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserDeleteModal;

const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 15,
    padding: 10,
  },
  border: {
    borderWidth: 1,
  },
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#765097",
    fontWeight: "600",
  },
});
