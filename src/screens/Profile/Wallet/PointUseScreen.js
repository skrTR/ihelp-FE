import { Alert, View, TouchableOpacity, Text } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../../context/UserContext";
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
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("PointTypeScreen")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            {state.isCompany
              ? "Зар болон байгууллага идэвхжүүлэх"
              : "Идэвхжүүлэлт хийх"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
          onPress={() => Alert.alert("Тун удахгүй")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Үнийн санал
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            paddingVertical: 10,
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
            paddingVertical: 10,
            borderRadius: 10,
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
    </View>
  );
};

export default PointUseScreen;
