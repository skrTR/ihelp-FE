import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../ModalHeader";
import { useTheme } from "@react-navigation/native";

const OrganizationModal = (props) => {
  const {
    organizationModal,
    setOrganizationModal,
    setOrganization,
    checkOrganization,
  } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={organizationModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setOrganizationModal(!organizationModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Зарцуулах хугацаа"
          clicked={() => setOrganizationModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {["Байгууллага", "Хувь хүн", "Бүгд"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setOrganization(l);
                checkOrganization(l);
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

export default OrganizationModal;

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
