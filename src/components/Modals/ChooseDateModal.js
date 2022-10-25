import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { useTheme } from "@react-navigation/native";

const ChooseDateModal = (props) => {
  const { chooseModal, setChooseModal, setChoose, checkChoose } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={chooseModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setChooseModal(!chooseModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Хоног" clicked={() => setChooseModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {["1", "2", "3", "4", "5", "6", "7"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setChoose(l);
                checkChoose(l);
              }}
              key={i}
            >
              <Text style={[styles.text, { color: colors.primaryText }]}>
                {l} xоног
              </Text>
              <View style={[styles.border, { borderColor: colors.border }]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ChooseDateModal;

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
