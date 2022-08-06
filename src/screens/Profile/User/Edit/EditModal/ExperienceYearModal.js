import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import ModalHeader from "../../../../../components/ModalHeader";

const ExperienceYearModal = (props) => {
  const { expModal, setExpModal, setExpText, checkExperienceYear } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={expModal}
      onRequestClose={() => {
        setExpModal(!expModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Цагын төрөл сонгох"
          clicked={() => setExpModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "Байхгүй",
            "1",
            "2-3",
            "4-5",
            "6-8",
            "9-11",
            "11-13",
            "13-15",
            "16+",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setExpText(l);
                checkExperienceYear(l);
              }}
              key={i}
            >
              <Text style={[styles.text, { color: colors.primaryText }]}>
                {l === "Байхгүй" ? l : `${l} жил`}
              </Text>
              <View style={[styles.border, { borderColor: colors.border }]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ExperienceYearModal;

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
