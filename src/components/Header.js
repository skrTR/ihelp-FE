import {
  Image,
  View,
  useColorScheme,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import UserContext from "../context/UserContext";
import axios from "axios";
import { api } from "../../Constants";
import Notfound from "./notfound";
const Header = (props) => {
  const {
    isFollowedCompany,
    isEmployeeSort,
    isEmployeeAddWork,
    isBack,
    isNotification,
    isEmployerSaved,
    employerSort,
  } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [user, setUser] = useState([]);
  const colorScheme = useColorScheme();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const isFocused = useIsFocused();
  const getUsers = () => {
    axios
      .get(
        `${api}/api/v1/cvs/${state.isCompany ? state.companyId : state.userId}`
      )
      .then((res) => {
        setUser(res.data.data);
        setError(null);
        console.log(res.data.data);
      })
      .catch((err) => {
        let message = err.message;
        setErrorMessage(message);
        setError(true);
      });
  };

  useEffect(() => {
    getUsers();
  }, [isFocused]);
  if (error) {
    return <Notfound message={errorMessage} isHeader={true} />;
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* left */}
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
        ) : employerSort ? (
          <SimpleLineIcons
            name="equalizer"
            size={25}
            color={colors.primaryText}
            onPress={() => navigation.navigate("SortWorkModal")}
          />
        ) : null}
      </View>
      {/* left end */}
      {/* Mid */}
      <View style={{ width: "30%" }}>
        <Image
          source={
            colorScheme === "dark"
              ? require("../../assets/ihelp/logo.png")
              : require("../../assets/logo-dark.png")
          }
          style={{
            width: 90,
            height: 50,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
      </View>
      {/* mid end */}
      {/* right  */}
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
              navigation.navigate("EmployeeAddWork");
            }}
          />
        ) : isNotification ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Ionicons
              name="notifications-outline"
              size={30}
              color={colors.primaryText}
            />
            <View
              style={{
                position: colors.primary,
                backgroundColor: "red",
                borderRadius: 20,
                paddingHorizontal: 3.5,
                position: "absolute",
                right: 15,
                top: 0,
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
                {user.notification}
              </Text>
            </View>
          </TouchableOpacity>
        ) : isEmployerSaved ? (
          <>
            {state.isCompany ? (
              <Ionicons
                name="add"
                size={30}
                color={colors.primaryText}
                onPress={() => {
                  navigation.navigate("EmployerAddWork");
                }}
              />
            ) : (
              <SimpleLineIcons
                name="handbag"
                size={25}
                color={colors.primaryText}
                onPress={() => navigation.navigate("UserSavedWork")}
              />
            )}
          </>
        ) : null}
      </View>
      {/* right end */}
    </View>
  );
};

export default Header;
