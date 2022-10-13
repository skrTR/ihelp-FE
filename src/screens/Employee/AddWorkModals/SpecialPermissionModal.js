import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ModalHeader from "../../../components/ModalHeader";
import { useTheme } from "@react-navigation/native";

const SpecialPermissionModal = (props) => {
  const {
    specialPermission,
    setSpecialPermission,
    setPermission,
    checkSpecialPermission,
  } = props;
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={specialPermission}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setSpecialPermission(!specialPermission);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Тусгай зөвшөөрөл"
          clicked={() => setSpecialPermission(false)}
        />
        <View style={{ marginHorizontal: 10 }}>
          {["Сонгох", "Байгаа", "Байхгүй", "Шаардлагагүй"].map((l, i) => (
            <TouchableOpacity
              onPress={() => {
                setPermission(l);
                checkSpecialPermission(l);
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

export default SpecialPermissionModal;

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
