import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import ModalHeader from "../../../../../components/ModalHeader";

const ExperienceTypeModal = (props) => {
  const { typeModal, setTypeModal, setType, checkType } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={typeModal}
      onRequestClose={() => {
        setTypeModal(!typeModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Цагийн төрөл сонгох"
          clicked={() => setTypeModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "Сонгох",
            "Үндсэн ажил",
            "Цагийн ажил",
            "Чөлөөт ажилтан",
            "Гэрээгээр",
            "Дадлага",
            "Улирлын чанартай",
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

export default ExperienceTypeModal;

const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 15,
    padding: 10,
    fontFamily: "Sf-bold",
  },
  border: {
    borderWidth: 1,
  },
});
