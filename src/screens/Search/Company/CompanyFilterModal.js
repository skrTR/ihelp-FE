import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import CategoryModal from "./CategoryModal";
import { LinearGradient } from "expo-linear-gradient";
import ChooseTypeModal from "./ChooseTypeModal";
const CompanyFilterModal = (props) => {
  const navigation = useNavigation();
  // Salbar сонгох
  const [occupationModal, setOccupationModal] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  const [occupationId, setOccupationId] = useState("");
  // Type
  const [typeModal, setTypeModal] = useState(false);
  const [typeName, setTypeName] = useState("");
  const { colors } = useTheme();

  return (
    <View style={{ marginHorizontal: 10 }}>
      {/* Salbar */}
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 10,
          borderColor: colors.border,
          backgroundColor: occupationName ? colors.border : colors.background,
        }}
        onPress={() => setOccupationModal(true)}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.primaryText,
          }}
        >
          {occupationName ? `${occupationName}` : "Салбар"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 10,
          borderColor: colors.border,
          backgroundColor: typeName ? colors.border : colors.background,
        }}
        onPress={() => setTypeModal(true)}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.primaryText,
          }}
        >
          {typeName ? `${typeName}` : "Чиглэл"}
        </Text>
      </TouchableOpacity>

      {/* Хайх */}
      {!occupationId.length > 0 ? (
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            borderColor: colors.border,
          }}
          disabled
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Хайх
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ResultedCompanyModal", {
              occupationId: occupationId,
              typeName: typeName,
            })
          }
          style={{
            backgroundColor: "#FFB6C1",
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "black" }}>Хайх</Text>
        </TouchableOpacity>
      )}

      {/* Salbar */}
      <CategoryModal
        setOccupationModal={setOccupationModal}
        occupationModal={occupationModal}
        setOccupationName={setOccupationName}
        setOccupationId={setOccupationId}
      />
      {/* Salbar */}
      <ChooseTypeModal
        setTypeModal={setTypeModal}
        typeModal={typeModal}
        setTypeName={setTypeName}
      />
    </View>
  );
};

export default CompanyFilterModal;

const styles = StyleSheet.create({});
