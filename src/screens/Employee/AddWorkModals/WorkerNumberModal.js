import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const WorketNumberModal = (props) => {
  const {
    workerNumberModal,
    setWorkerNumberModal,
    setWorkerNumber,
    checkWorkerNumber,
  } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={workerNumberModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setWorkerNumberModal(!workerNumberModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Нас сонгох"
          clicked={() => setWorkerNumberModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {["1 - 5", "5-10"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setWorkerNumber(l);
                checkWorkerNumber(l);
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

export default WorketNumberModal;

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
