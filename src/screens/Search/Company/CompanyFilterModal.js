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
    <View>
      {/* Salbar */}
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 20,
          marginTop: 10,
          borderColor: colors.border,
        }}
        onPress={() => setOccupationModal(true)}
      >
        <Text style={{ textAlign: "center", color: colors.primaryText }}>
          {occupationName ? `${occupationName}` : "Салбар"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 20,
          marginTop: 10,
          borderColor: colors.border,
        }}
        onPress={() => setTypeModal(true)}
      >
        <Text style={{ textAlign: "center", color: colors.primaryText }}>
          {typeName ? `${typeName}` : "Чиглэл"}
        </Text>
      </TouchableOpacity>

      {/* Хайх */}
      {!occupationId.length > 0 ? (
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
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
        >
          <LinearGradient
            colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
            start={[0.0, 0.5]}
            end={[1.0, 0.5]}
            style={{
              borderRadius: 18,
              padding: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              Хайх
            </Text>
          </LinearGradient>
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
