import { View, TouchableOpacity, Text, Image } from "react-native";
import React, { useContext } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import Header from "../../components/Header/Header";
const CompanySearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const insents = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
      {state.isCompany ? (
        <CompanyHeader isBack={true} />
      ) : (
        <Header isBack={true} />
      )}
      <View
        style={{
          backgroundColor: colors.background,
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: colors.border,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("EmployerSearch")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Ажил олгогч байгууллага
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            borderColor: colors.border,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("EmployeeSearch")}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.primaryText,
            }}
          >
            Ажил хайгч байгууллага
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.border,
          }}
          onPress={() => navigation.navigate("AllCompanySearch")}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.primaryText,
            }}
          >
            Бүгд
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompanySearch;
