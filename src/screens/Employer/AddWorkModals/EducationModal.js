import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const EducationModal = (props) => {
  const { educationModal, setEducationModal, setEducation, checkEducation } =
    props;
  const { colors } = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={educationModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setEducationModal(!educationModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Боловсрол"
          clicked={() => setEducationModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {["Бүрэн дунд", "Бакалавр", "Магистр", "Доктор"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setEducation(l);
                checkEducation(l);
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

export default EducationModal;

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
