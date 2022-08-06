import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
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
        <ModalHeader text="Нас сонгох" clicked={() => setPriceModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {["400,000 - 600,000", "1"].map((l, i) => (
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
    fontFamily: "Sf-bold",
  },
  border: {
    borderWidth: 1,
  },
});
