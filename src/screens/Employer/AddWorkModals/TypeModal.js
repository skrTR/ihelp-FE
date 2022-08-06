import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const TypeModal = (props) => {
  const { typeModal, setTypeModal, setType, checkType } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={typeModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setTypeModal(!typeModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Цагийн төрөл" clicked={() => setTypeModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "Бүтэн цаг",
            "Хагас цаг",
            "freelancer",
            "self-employed",
            "contract",
            "intern",
            "apprentice",
            "seasonal",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setType(l);
                checkType(l);
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

export default TypeModal;

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
