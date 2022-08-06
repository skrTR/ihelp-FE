import { Image, View, TouchableOpacity, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { api } from "../../../Constants";
const CompanyHeader = (props) => {
  const {
    isBack,
    isEmployeeAddWork,
    isEmployerAddWork,
    isSearch,
    isNotification,
    isFollowedCompany,
  } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [companyProfile, setCompanyProfile] = useState(null);
  let isMounted = true;
  const loadCompanyProfile = () => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=notification`)
      .then((res) => {
        if (isMounted) {
          setCompanyProfile(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCompanyProfile();
    return () => {
      isMounted = false;
    };
  }, []);
  if (!companyProfile) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: "#141414",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        bottom: 0,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View>
          {isBack ? (
            <AntDesign
              name="left"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.goBack()}
            />
          ) : isSearch ? (
            <Ionicons
              name="search"
              size={25}
              color={colors.primaryText}
              onPress={() =>
                navigation.navigate("Хайх", {
                  screen: "SearchScreen",
                  initial: false,
                })
              }
            />
          ) : isFollowedCompany ? (
            <MaterialIcons
              name="follow-the-signs"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("FollowedCompany")}
            />
          ) : null}
        </View>
        <View>
          <Image
            source={require("../../../assets/ihelp/logo.png")}
            style={{
              width: 90,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          {isEmployerAddWork ? (
            <Ionicons
              name="add"
              size={30}
              color={colors.primaryText}
              onPress={() => navigation.navigate("EmployerAddWork")}
            />
          ) : isEmployeeAddWork ? (
            <Ionicons
              name="add"
              size={30}
              color={colors.primaryText}
              onPress={() => navigation.navigate("EmployeeAddWork")}
            />
          ) : isNotification ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("NotificationScreen")}
            >
              <Ionicons
                name="md-notifications-outline"
                size={30}
                color={colors.primaryText}
                style={{ marginRight: 10 }}
              />
              {companyProfile.notification ? (
                <View
                  style={{
                    position: colors.primary,
                    backgroundColor: "red",
                    borderRadius: 20,
                    paddingHorizontal: 3.5,
                    position: "absolute",
                    top: 0,
                    right: 20,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: "Sf-bold",
                      padding: 3,
                      fontSize: 10,
                    }}
                  >
                    {companyProfile.notification}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CompanyHeader;
