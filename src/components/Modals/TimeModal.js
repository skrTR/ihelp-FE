import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { useTheme } from "@react-navigation/native";

const TimeModal = (props) => {
  const { timeModal, setTimeModal, setTime, checkTime } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={timeModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setTimeModal(!timeModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Зарцуулах хугацаа"
          clicked={() => setTimeModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "1 - 7 хоног",
            "7 - 14 хоног",
            "14 - 21 хоног",
            "21 - 30 хоног",
            "1 - 2 сар",
            "2 - 3 сар",
            "3 - 4 сар",
            "4 - 6 сар",
            "6 - 8 сар",
            "8 - 12 сар",
            "1 - 2 жил",
            "2 - 3 жил",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setTime(l);
                checkTime(l);
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

export default TimeModal;

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
