import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import ModalHeader from "../../../../../components/ModalHeader";

const LanguageModal = (props) => {
  const { languageModal, setLanguageModal, setLangText, checkLangauge } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={languageModal}
      onRequestClose={() => {
        setLanguageModal(!languageModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Цагын төрөл сонгох"
          clicked={() => setLanguageModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {["Анхан түвшин", "Дунд түвшин", "Ахисан түвшин"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setLangText(l);
                checkLangauge(l);
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

export default LanguageModal;

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
