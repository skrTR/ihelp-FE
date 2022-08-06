import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
const CategoryModal = ({
  categoryModal,
  setCategoryModal,
  category,
  setCategoryId,
  setCategoryName,
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={categoryModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setCategoryModal(!categoryModal);
      }}
    >
      <ScrollView
        style={[styles.centeredView1, { backgroundColor: colors.background }]}
      >
        <View
          style={[styles.modalView1, { backgroundColor: colors.background }]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginVertical: 20,
                color: colors.primaryText,
              }}
            >
              Категори сонголт
            </Text>
            {category.map((e) => {
              return (
                <View key={e._id} style={{ marginVertical: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setCategoryId(e._id);
                      setCategoryName(e.name);
                      setCategoryModal(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginLeft: 20,
                        color: colors.primaryText,
                      }}
                    >
                      {e.name}
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: colors.border,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => setCategoryModal(!categoryModal)}
            style={{ position: "absolute", margin: 20, left: 0 }}
          >
            <AntDesign name="left" size={24} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  centeredView1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalView1: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
