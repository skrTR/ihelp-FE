import { Image, View, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
const Header = (props) => {
  const {
    isBack,
    isSearch,
    isEmployerSaved,
    isEmployeeSaved,
    userSearch,
    isFollowedCompany,
    companyFilter,
    workSort,
    sortWork,
  } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [userProfile] = useUserProfile(state.userId);
  if (!userProfile) {
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
        }}
      >
        <View>
          {isBack ? (
            <AntDesign
              name="left"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.goBack()}
              style={{ right: 5 }}
            />
          ) : isEmployeeSaved ? (
            <SimpleLineIcons
              name="handbag"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("EmployeeSavedWork")}
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
          ) : userSearch ? (
            <Ionicons
              name="search"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("UserSearch")}
            />
          ) : isFollowedCompany ? (
            <SimpleLineIcons
              name="user-following"
              size={23}
              color={colors.primaryText}
              onPress={() => navigation.navigate("FollowedCompany")}
            />
          ) : sortWork ? (
            <SimpleLineIcons
              name="equalizer"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("SortWorkModal")}
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
          {/* <AntDesign name="search1" size={34} color={colors.primaryText} /> */}
          {state.isCompany ? (
            <SimpleLineIcons
              name="equalizer"
              size={25}
              color={colors.primaryText}
            />
          ) : isEmployerSaved ? (
            <SimpleLineIcons
              name="handbag"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("UserSavedWork")}
            />
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("NotificationScreen")}
            >
              <Ionicons
                name="md-notifications-outline"
                size={30}
                color={colors.primaryText}
                style={{ left: 5 }}
              />
              {userProfile.notification ? (
                <View
                  style={{
                    position: colors.primary,
                    backgroundColor: "red",
                    borderRadius: 20,
                    position: "absolute",
                    top: 0,
                    right: 10,
                    paddingHorizontal: 3.5,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: "Sf-bold",
                      padding: 3,
                      fontSize: 8,
                    }}
                  >
                    {userProfile.notification}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;
