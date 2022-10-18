import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { useTheme } from "@react-navigation/native";

const PriceModal = (props) => {
  const { priceModal, setPriceModal, setPrice, checkPrice } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={priceModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setPriceModal(!priceModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Үнийн санал" clicked={() => setPriceModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "1,000,000 хүртэлх",
            "1,000,000 - 2,000,000",
            "3,000,000 - 5,000,000",
            "5,000,000 - 10,000,000",
            "10,000,000 - 20,000,000",
            "20,000,000 - 40,000,000",
            "40,000,000 - 65,000,000",
            "65,000,000 - 100,000,000",
            "100,000,000 -с дээш",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setPrice(l);
                checkPrice(l);
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

export default PriceModal;

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
