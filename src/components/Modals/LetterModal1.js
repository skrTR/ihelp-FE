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

const LetterModal1 = (props) => {
  const { letterModal, setLetterModal, setLetter, checkLetter } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={letterModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setLetterModal(!letterModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Цагаан толгой"
          clicked={() => setLetterModal(false)}
        />
        <ScrollView
          style={{ marginHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {[
            "А",
            "Б",
            "В",
            "Г",
            "Д",
            "Е",
            "Ё",
            "Ж",
            "З",
            "И",
            "Й",
            "К",
            "Л",
            "М",
            "Н",
            "О",
            "Ө",
            "П",
            "Р",
            "С",
            "Т",
            "У",
            "Ү",
            "Ф",
            "Х",
            "Ц",
            "Ч",
            "Ш",
            "Ъ",
            "Ь",
            "Э",
            "Ю",
            "Я",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setLetter(l);
                checkLetter(l);
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

export default LetterModal1;

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
