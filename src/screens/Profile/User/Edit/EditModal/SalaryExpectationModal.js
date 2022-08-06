import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import ModalHeader from "../../../../../components/ModalHeader";

const SalaryExpectationModal = (props) => {
  const { salModal, setSalModal, setSalText, checkSalaryExpectation } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={salModal}
      onRequestClose={() => {
        setSalModal(!salModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Цагын төрөл сонгох"
          clicked={() => setSalModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "Хамаагүй",
            "1,000,000₮ хүртэлх",
            "1,000,000₮-1,500,000₮",
            "2,000,000₮-2,500,000₮",
            "3,000,000₮-3,500,000₮",
            "4,000,000₮-4,500,000₮",
            "5,000,000₮-5,500,000₮",
            "6,000,000₮-аас дээш",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setSalText(l);
                checkSalaryExpectation(l);
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

export default SalaryExpectationModal;

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
