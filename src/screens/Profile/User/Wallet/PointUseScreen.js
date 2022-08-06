import {
  Alert,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserContext from "../../../../context/UserContext";
import MyButton from "../../../../components/MyButton";
const PointUseScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const state = useContext(UserContext);
  const { colors } = useTheme();
  return (
    <View style={{ opacity: modalVisible ? 0.2 : 1 }}>
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Пост бүүстлэх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("PointPriceDetail")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Үнийн санал
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
          onPress={() => Alert.alert("Тун удахгүй")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Пойнт илгээх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
          onPress={() => Alert.alert("Тун удахгүй")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Худалдан авалт хийх
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[styles.centeredView1, { backgroundColor: colors.background }]}
        >
          <View style={[styles.modalView1, { backgroundColor: colors.header }]}>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginVertical: 20,
                  color: colors.primaryText,
                }}
              >
                Пойнт ашиглах төрөл
              </Text>
              {state.isCompany ? (
                <>
                  <MyButton
                    text="Зар бүүстлэх"
                    onPress={() => {
                      navigation.navigate("ProductUsePoint", { type: "work" });
                      setModalVisible(false);
                    }}
                  />

                  <View style={{ marginVertical: 5 }} />
                  <MyButton
                    text="Онцгой компани"
                    onPress={() => {
                      navigation.navigate("ProductUsePoint", {
                        type: "company",
                      });
                      setModalVisible(false);
                    }}
                  />
                </>
              ) : (
                <MyButton
                  text="Пост бүүстлэх"
                  onPress={() => {
                    navigation.navigate("ProductUsePoint", { type: "post" });
                    setModalVisible(false);
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ position: "absolute", padding: 20, right: 0 }}
            >
              <Ionicons
                name="backspace-outline"
                size={24}
                color={colors.primaryText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PointUseScreen;

const styles = StyleSheet.create({
  centeredView1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "60%",
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
