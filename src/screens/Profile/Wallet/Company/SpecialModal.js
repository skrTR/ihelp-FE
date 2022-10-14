import { Text, View, Modal, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import ModalHeader from "../../../../components/ModalHeader";
import { useNavigation, useTheme } from "@react-navigation/native";

const SpecialModal = (props) => {
  const { specialModal, setSpecialModal, data, occupationName } = props;
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      visible={specialModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setSpecialModal(!specialModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Зар оруулах"
          clicked={() => setSpecialModal(false)}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              setSpecialModal(false);
              navigation.navigate("BoostEmployerWork", {
                data: data,
                type: "1",
                occupationName: occupationName,
              });
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              backgroundColor: "#FFB6C1",
            }}
          >
            <Text>Энгийн зар</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSpecialModal(false);
              navigation.navigate("AddWorkTypeModal", {
                data: data,
                type: "2",
                occupationName: occupationName,
              });
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              marginTop: 10,
              backgroundColor: "#FFB6C1",
            }}
          >
            <Text>Онцгой зар</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSpecialModal(false);
              navigation.navigate("AddWorkTypeModal", {
                data: data,
                type: "3",
                occupationName: occupationName,
              });
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              marginTop: 10,
              backgroundColor: "#FFB6C1",
            }}
          >
            <Text>Яааралтай зар</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SpecialModal;
