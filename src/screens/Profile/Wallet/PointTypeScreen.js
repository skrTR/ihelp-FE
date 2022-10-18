import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../../context/UserContext";
import Header from "../../../components/Header/Header";
import CompanyHeader from "../../../components/Header/CompanyHeader";
import MyButton from "../../../components/MyButton";
import axios from "axios";
import { api } from "../../../../Constants";

const PointTypeScreen = () => {
  const insents = useSafeAreaInsets();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${api}/api/v1/profiles/${state.companyId}?select=isEmployer isEmployee`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={{ paddingTop: insents.top, backgroundColor: colors.header }}>
      {state.isCompany ? (
        <CompanyHeader isBack={true} />
      ) : (
        <Header isBack={true} />
      )}

      <View style={{ backgroundColor: colors.background }}>
        <View
          style={{
            backgroundColor: colors.background,
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          {state.isCompany ? (
            <>
              <MyButton
                text="Ажил захиалга дээр зар идэвхжүүлэх"
                onPress={() => {
                  Alert.alert("Тун удахгүй");
                }}
              />
              <View style={{ marginTop: 10 }} />
              <MyButton
                text="Ажлын байр дээр зар идэвхжүүлэх"
                onPress={() => {
                  navigation.navigate("ProductUsePoint", {
                    type: "EmployerBoost",
                  });
                }}
              />
              <View style={{ marginTop: 10 }} />
              <MyButton
                text="Ажлын байр дээр онцлох байгууллага"
                onPress={() => {
                  navigation.navigate("BoostSpecialCompany");
                }}
              />
            </>
          ) : (
            <MyButton
              text="Нийтлэл идэвхжүүлэх"
              onPress={() => {
                navigation.navigate("NetworkingBoost", {
                  type: "SpecialCompanyEmployee",
                });
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PointTypeScreen;

const styles = StyleSheet.create({});
