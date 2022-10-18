import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { useTheme } from "@react-navigation/native";

const FamilyModal = (props) => {
  const { familyModal, setFamilyModal, setFamilyName, checkFamily } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={familyModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setFamilyModal(!familyModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Таны хэн болох"
          clicked={() => setFamilyModal(false)}
        />
        <ScrollView
          style={{ marginHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {[
            "Эмээ",
            "Өвөө",
            "Ээж",
            "Аав",
            "Эгч",
            "Ах",
            "Дүү",
            "Нагац дүү",
            "Нагац ах",
            "Нагац эгч",
            "Авга дүү",
            "Авга ах",
            "Авга эгч",
            "Эхнэр",
            "Нөхөр",
            "Хадам ах",
            "Хадам эгч",
            "Хадам дүү",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setFamilyName(l);
                checkFamily(l);
              }}
              key={i}
            >
              <Text style={[styles.text, { color: colors.primaryText }]}>
                {l}
              </Text>
              <View style={[styles.border, { borderColor: colors.border }]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FamilyModal;

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
