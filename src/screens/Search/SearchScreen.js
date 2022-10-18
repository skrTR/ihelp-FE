import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header";
import { useNavigation, useTheme } from "@react-navigation/native";
import CompanyHeader from "../../components/Header/CompanyHeader";
import axios from "axios";
import { api } from "../../../Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SearchScreen = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [score, setScore] = useState();
  const insents = useSafeAreaInsets();
  const getScore = () => {
    axios
      .get(`${api}/api/v1/questionnaires/${state.userId}?select=score`)
      .then((res) => {
        setScore(res.data.data.score);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getScore();
  }, []);
  return (
    <>
      <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
        {/* {state.isCompany ? (
          <CompanyHeader isNotification={true} isFollowedCompany={true} />
        ) : (
          <Header isFollowedCompany={true} />
        )} */}
        <Header isFollowedCompany={true} isNotification={true} />
        <ScrollView style={{ backgroundColor: colors.background }}>
          <View
            style={{ backgroundColor: colors.background, marginHorizontal: 10 }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                marginTop: 5,
              }}
            >
              Хэрэглэгч
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("UserSearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Хэрэглэгч хайх
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              // onPress={() => navigation.navigate("UserInfluncerSearch")}
              onPress={() => Alert.alert("Тун удахгүй")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Инфлюэнсер
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              // onPress={() => navigation.navigate("UserFreelancerSearch")}
              onPress={() => Alert.alert("Тун удахгүй")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Чөлөөт ажилтан
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                marginTop: 5,
              }}
            >
              Байгууллага
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
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
                borderRadius: 10,
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
                Ажил гүйцэтгэгч байгууллага
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
            {/* <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("CompanySearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Байгууллага хайх
              </Text>
            </TouchableOpacity> */}
            {/* {!state.isCompany && (
              <TouchableOpacity
                style={{
                  padding: 10,

                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.border,
                  marginTop: 10,
                }}
                onPress={() => {
                  if (score > 79) {
                    navigation.navigate("MyJobs");
                  } else {
                    Alert.alert(
                      "Анхаар",
                      "Та өөрийн анкетыг 80%-с дээш бөглөснөөр өөрт тохирох зарыг үзэх боломжтой",
                      [
                        {
                          text: "Үгүй",
                          style: "cancel",
                        },
                        {
                          text: "Анкет янзлах",
                          onPress: () =>
                            navigation.navigate("ProfileStack", {
                              screen: "CreateCvScreen",
                              params: { id: state.userId },
                            }),
                        },
                      ]
                    );
                  }
                }}
              >
                <Text
                  style={{ textAlign: "center", color: colors.primaryText }}
                >
                  {" "}
                  Өөрт тохирох{" "}
                </Text>
              </TouchableOpacity>
            )} */}
            {/* <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("WorkSearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Мэргэжлээр зар хайх{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.border,

                marginTop: 10,
              }}
              onPress={() => navigation.navigate("CategorySearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Салбараар зар хайх{" "}
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
