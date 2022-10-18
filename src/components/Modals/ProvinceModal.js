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

const ProvinceModal = (props) => {
  const { provinceModal, setProvinceModal, setProvince, checkProvince } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={provinceModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setProvinceModal(!provinceModal);
      }}
    >
      <ScrollView
        style={{ backgroundColor: colors.background, height: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <ModalHeader
          text="Хаяг сонгох"
          clicked={() => setProvinceModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "Улаанбаатар",
            "Эрдэнэт",
            "Дархан",
            "Архангай",
            "Баян-Өлгий",
            "Баянхонгор",
            "Булган",
            "Говь-Алтай",
            "Говьсүмбэр",
            "Дорноговь",
            "Дорнод",
            "Дундговь",
            "Завхан",
            "Өвөрхангай",
            "Өмнөговь",
            "Сүхбаатар",
            "Сэлэнгэ",
            "Төв аймаг",
            "Увс",
            "Ховд",
            "Хөвсгөл",
            "Хэнтий",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setProvince(l);
                checkProvince(l);
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
      </ScrollView>
    </Modal>
  );
};

export default ProvinceModal;

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
