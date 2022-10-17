import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import ModalHeader from "../../../../../components/ModalHeader";
const ApproveModal = (props) => {
  const { approveModal, setApproveModal, setApprove } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={approveModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setApproveModal(!approveModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader text="Статус" clicked={() => setApproveModal(false)} />
        <View style={{ marginHorizontal: 10 }}>
          {["Зөвшөөрсөн", "Зөвшөөрөөгүй"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setApprove(l);
                setApproveModal(!approveModal);
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

export default ApproveModal;

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
