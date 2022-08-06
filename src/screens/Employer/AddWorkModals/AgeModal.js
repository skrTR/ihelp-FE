import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const AgeModal = (props) => {
  const { ageModal, setAgeModal, setAge, checkAge } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={ageModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setAgeModal(!ageModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Нас" clicked={() => setAgeModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {["18-25", "26-30", "31-36", "37-45", "45-аас дээш", "Хамаагүй"].map(
            (l, i) => (
              <TouchableOpacity
                onPress={() => {
                  setAge(l);
                  checkAge(l);
                }}
                key={i}
              >
                <Text style={[styles.text, { color: colors.primaryText }]}>
                  {l}
                </Text>
                <View style={[styles.border, { borderColor: colors.border }]} />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AgeModal;

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
