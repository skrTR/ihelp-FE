import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const ExperienceModal = (props) => {
  const {
    experienceModal,
    setExperienceModal,
    setExperience,
    checkExperience,
  } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={experienceModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setExperienceModal(!experienceModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Ажлын туршлага"
          clicked={() => setExperienceModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {["0-1", "1-3", "3-5", "5-10", "10-аас дээш", "Xамаагүй"].map(
            (l, i) => (
              <TouchableOpacity
                onPress={() => {
                  setExperience(l);
                  checkExperience(l);
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

export default ExperienceModal;

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
