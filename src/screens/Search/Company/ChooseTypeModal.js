import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import ModalHeader from "../../../components/ModalHeader";

const ChooseTypeModal = (props) => {
  const { typeModal, setTypeModal, setTypeName } = props;
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
        <ModalHeader text="Сонгох" clicked={() => setTypeModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {["Ажил хийе", "Ажил өгье", "Хамаагүй"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setTypeName(l);
                setTypeModal(!typeModal);
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

export default ChooseTypeModal;

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
