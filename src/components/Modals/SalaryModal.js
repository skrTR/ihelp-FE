import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { useTheme } from "@react-navigation/native";

const SalaryModal = (props) => {
  const { modalVisible, setModalVisible, checkSalary, setSalary } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Цалин" clicked={() => setModalVisible(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "Байхгүй",
            "400,000 - 600,000",
            "600,000 - 800,000",
            "800,000 - 1,000,000",
            "1,000,000 - 1,200,000",
            "1,200,000 - 1,500,000",
            "1,500,000 - 1,800,000",
            "1,800,000 - 2,100,000",
            "2,100,000 - 2,500,000",
            "2,500,000 - 3,000,000",
            "3,000,000 - 4,000,000",
            "4,000,000 - 5,000,000",
            "5,000,000 -с дээш",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                checkSalary(l);
                setSalary(l);
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

export default SalaryModal;

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
