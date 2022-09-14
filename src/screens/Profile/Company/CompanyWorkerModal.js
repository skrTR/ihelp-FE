import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const CompanymembersModal = (props) => {
  const { setMembersText, membersModal, setMembersModal, checkMembers } = props;

  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={membersModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setMembersModal(!membersModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Ажилтны тоо"
          clicked={() => setMembersModal(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {[
            "1-10",
            "11-20",
            "21-50",
            "51-100",
            "101-500",
            "501-1000",
            "1000+",
          ].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setMembersText(l);
                checkMembers(l);
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

export default CompanymembersModal;

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
