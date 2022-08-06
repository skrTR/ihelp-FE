import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const LevelModal = (props) => {
  const { levelModal, setLevelModal, setLevel, checkLevel } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={levelModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setLevelModal(!levelModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Албан тушаал" clicked={() => setLevelModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "Мэргэжилтэн",
            "Дадлага",
            "Мэргэжил хамаарахгүй",
            "Дунд шатны удирдлага",
            "Дээд шатны удирдлага",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setLevel(l);
                checkLevel(l);
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

export default LevelModal;

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
