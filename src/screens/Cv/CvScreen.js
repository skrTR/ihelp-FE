import { StyleSheet, View, SafeAreaView, FlatList, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import CompanyHeader from "../../components/Header/CompanyHeader";
import { api } from "../../../Constants";
import Cvs from "../../components/Cv/Cvs";
import UserContext from "../../context/UserContext";
const CvScreen = () => {
  const [cvData, setCvData] = useState([]);
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [point, setPoint] = useState([]);
  let isMounted = true;
  const getPermision = () => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=point`)
      .then((res) => {
        if (isMounted) {
          setPoint(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCvs = () => {
    axios
      .get(
        `${api}/api/v1/questionnaires?select=workingCompany working profession firstName lastName profile score experienceCount familyCount courseCount achievementCount birth createUser salaryExpectation experiences&limit=1000`
      )
      .then((res) => {
        if (isMounted) {
          setCvData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCvs();
    getPermision();
    return () => {
      isMounted = false;
    };
  }, []);
  if (!point) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.header, flex: 1 }}>
      <CompanyHeader isSearch={true} isNotification={true} />
      {point.point > 1000 ? (
        <View style={{ backgroundColor: colors.background }}>
          <FlatList
            data={cvData.sort((a, b) => b.score - a.score)}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return <Cvs item={item} />;
            }}
            ListFooterComponent={<View style={{ marginBottom: 100 }} />}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
            opacity: 0.3,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: "#c4c4c4",
              padding: 20,
              width: "100%",

              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo name="lock" size={20} color="black" />
            <Text style={{ textAlign: "center" }}>
              Санамж: Таны хэтэвчинд 1,000+ ipoint байршсан байгаа нөхцөлд
              тодорхой хугацаа заахгүйгээр анкет санг тогтмол ашиглаж байх
              боломжтой.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CvScreen;

const styles = StyleSheet.create({});
