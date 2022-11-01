import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Alert,
  useColorScheme,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import * as Linking from "expo-linking";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";

const CompanyHeader = (props) => {
  const {
    isBack,
    isEmployeeAddWork,
    isEmployerAddWork,
    isSearch,
    isNotification,
    isFollowedCompany,
    workSort,
    userSort,
  } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [companyProfile, setCompanyProfile] = useState(null);
  let isMounted = true;
  const colorScheme = useColorScheme();
  const loadCompanyProfile = () => {
    axios
      .get(
        `${api}/api/v1/profiles/${state.companyId}?select=notification isApproved`
      )
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
        backgroundColor: colors.header,
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
          width: "100%",
        }}
      >
        <View style={{ width: "30%" }}>
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
                navigation.navigate("SearchStack", {
                  screen: "SearchScreen",
                  initial: false,
                })
              }
            />
          ) : isFollowedCompany ? (
            <SimpleLineIcons
              name="user-following"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("FollowedCompany")}
            />
          ) : userSort ? (
            <SimpleLineIcons
              name="equalizer"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("UserSortModal")}
            />
          ) : null}
        </View>
        <View style={{ width: "30%" }}>
          {colorScheme === "dark" ? (
            <Image
              source={require("../../../assets/ihelp/logo.png")}
              style={{
                width: 90,
                height: 50,
                resizeMode: "contain",
              }}
            />
          ) : (
            <Image
              source={require("../../../assets/logo-dark.png")}
              style={{
                width: 90,
                height: 50,
                resizeMode: "contain",
              }}
            />
          )}
        </View>
        <View
          style={{
            width: "30%",
            right: 35,
          }}
        >
          {isEmployerAddWork ? (
            <Ionicons
              name="add"
              size={30}
              color={colors.primaryText}
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                navigation.navigate("EmployerAddWork");
              }}
            />
          ) : isEmployeeAddWork ? (
            <Ionicons
              name="add"
              size={30}
              color={colors.primaryText}
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                companyProfile.isApproved
                  ? navigation.navigate("EmployeeAddWork")
                  : Alert.alert(
                      "",
                      "Та эхлээд манай компанитай гэрээ байгуулснаар ажлын зар оруулах эрх үүсэхийг анхаарна уу",
                      [
                        {
                          text: "Буцах",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Холбоо барих",
                          onPress: () => Linking.openURL("tel:+976 77555255"),
                        },
                      ]
                    );
              }}
            />
          ) : isNotification ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("NotificationScreen")}
            >
              <Ionicons
                name="md-notifications-outline"
                size={30}
                color={colors.primaryText}
                style={{ marginRight: 5, alignSelf: "flex-end" }}
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
          ) : workSort ? (
            <SimpleLineIcons
              name="equalizer"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("CustomSearchModal")}
              style={{ alignSelf: "flex-end" }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CompanyHeader;
