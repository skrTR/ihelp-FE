import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";

import { useTheme } from "@react-navigation/native";

const GenderModal = (props) => {
  const { genderModal, setGenderModal, checkGender, setGender } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={genderModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setGenderModal(!genderModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Хүйс" clicked={() => setGenderModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {["Эр", "Эм", "Хамаагүй"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                checkGender(l);
                setGender(l);
              }}
              key={i}
            >
              <Text style={[styles.text, { color: colors.primaryText }]}>
                {l}
              </Text>
              <View style={[styles.border, { borderColor: colors.border }]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default GenderModal;

const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 15,
    padding: 10,
  },
  border: {
    borderWidth: 1,
  },
});
