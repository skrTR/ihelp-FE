import { Image, View, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import axios from "axios";
import { api } from "../../Constants";
import * as Linking from "expo-linking";
const Header = (props) => {
  const {
    isFollowedCompany,
    isEmployeeSort,
    isEmployeeAddWork,
    isBack,
    isNotification,
  } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [user, setUser] = useState([]);
  const getUsers = () => {
    axios
      .get(`${api}/api/v1/cvs/${state.companyId}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCvs = () => {
    axios
      .get(`${api}/api/v1/questionnaires/${state.userId}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (isEmployeeAddWork && state.isCompany) {
      getUsers();
    } else if (isEmployeeAddWork === true && state.isCompany === false) {
      getCvs();
    }
  }, []);
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "30%",
          alignItems: "flex-start",
          left: 20,
        }}
      >
        {isFollowedCompany ? (
          <SimpleLineIcons
            name="user-following"
            size={25}
            color={colors.primaryText}
            onPress={() => navigation.navigate("FollowedCompany")}
          />
        ) : isEmployeeSort ? (
          <SimpleLineIcons
            name="equalizer"
            size={25}
            color={colors.primaryText}
            onPress={() => navigation.navigate("EmployeeSort")}
          />
        ) : isBack ? (
          <AntDesign
            name="left"
            size={25}
            color={colors.primaryText}
            onPress={() => navigation.goBack()}
          />
        ) : null}
      </View>
      <View style={{ width: "30%" }}>
        <Image
          source={require("../../assets/ihelp/logo.png")}
          style={{
            width: 90,
            height: 50,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
      </View>
      <View
        style={{
          width: "30%",
          alignItems: "flex-end",
          right: 20,
        }}
      >
        {isEmployeeAddWork ? (
          <Ionicons
            name="add"
            size={30}
            color={colors.primaryText}
            onPress={() => {
              if (state.isCompany) {
                if (user && user.isApproved) {
                  navigation.navigate("EmployeeAddWork");
                } else {
                  Alert.alert(
                    "",
                    "Та эхлээд манай компанитай гэрээ байгуулснаар ажлын зар оруулах эрх үүсэхийг анхаарна уу",
                    [
                      {
                        text: "Буцах",
                        style: "cancel",
                      },
                      {
                        text: "Холбоо барих",
                        onPress: () => Linking.openURL("tel:+976 77555255"),
                      },
                    ]
                  );
                }
              } else if (!state.isCompany) {
                if (user && user.score > 80) {
                  navigation.navigate("EmployeeAddWork");
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
              }
            }}
          />
        ) : isNotification ? (
          <Ionicons
            name="md-notifications-outline"
            size={30}
            color={colors.primaryText}
            onPress={() => navigation.navigate("NotificationScreen")}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Header;
