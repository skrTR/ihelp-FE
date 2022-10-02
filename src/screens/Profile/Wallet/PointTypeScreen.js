import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../../context/UserContext";
import Header from "../../../components/Header/Header";
import CompanyHeader from "../../../components/Header/CompanyHeader";
import MyButton from "../../../components/MyButton";

const PointTypeScreen = () => {
  const insents = useSafeAreaInsets();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <View style={{ paddingTop: insents.top, backgroundColor: colors.header }}>
      {state.isCompany ? (
        <CompanyHeader isSearch={true} />
      ) : (
        <Header userSearch={true} />
      )}

      <View style={{ backgroundColor: colors.background }}>
        <View
          style={{
            backgroundColor: colors.background,
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          <MyButton
            text="Ажил өгье дээр зар идэвхжүүлэх"
            onPress={() => {
              navigation.navigate("ProductUsePoint", { type: "EmployeeBoost" });
            }}
          />
          <View style={{ marginTop: 10 }} />
          <MyButton
            text="Ажил хийе дээр зар идэвхжүүлэх"
            onPress={() => {
              navigation.navigate("ProductUsePoint", { type: "EmployerBoost" });
            }}
          />
          <View style={{ marginTop: 10 }} />
          <MyButton
            text="Онцгой компани"
            onPress={() => {
              navigation.navigate("ProductUsePoint", {
                type: "SpecialCompany",
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PointTypeScreen;

const styles = StyleSheet.create({});
