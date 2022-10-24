import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { useTheme } from "@react-navigation/native";

const WorkTypeModal = (props) => {
  const { workTypeModal, setWorkTypeModal, setWorkType, checkWorkType } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={workTypeModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setWorkTypeModal(!workTypeModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Ажлын төрөл"
          clicked={() => setWorkTypeModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {["Ажил гүйцэтгэгч", "Ажил захиалагч"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setWorkType(l);
                checkWorkType(l);
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

export default WorkTypeModal;

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
