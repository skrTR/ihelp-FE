import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FollowButton from "../FollowButton";
const DynamicFollowing = (props) => {
  const { followUser, isFollowing, id } = props;

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [follow, setFollow] = useState(isFollowing);
  const state = useContext(UserContext);
  console.log(followUser);
  const onFollow = () => {
    if (follow) {
      setFollow(false);
      axios
        .post(
          `${api}/api/v1/follows/${id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          let message = err.message;

          if (message === "Request failed with status code 404")
            message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
          else if (message === "Network Error")
            message =
              "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
          else {
            message === err.response.data.error.message;
          }
          Alert.alert(message);
        });
    } else {
      setFollow(true);
      axios
        .post(
          `${api}/api/v1/follows/${id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          let message = err.message;

          if (message === "Request failed with status code 404")
            message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
          else if (message === "Network Error")
            message =
              "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
          else {
            message === err.response.data.error.message;
          }
          Alert.alert(message);
        });
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 7,
          justifyContent: "space-between",
        }}
      >
        {followUser.organization ? (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("ViewCompanyProfile", {
                  id: id,
                })
              }
            >
              <ImageBackground
                source={{
                  uri: `${api}/upload/${followUser.profile}`,
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                }}
                imageStyle={{ borderRadius: 30 }}
              >
                {followUser.isEmployer && (
                  <View
                    style={{
                      backgroundColor: "#ff914d",
                      borderRadius: 20,
                      alignItems: "center",
                      position: "absolute",
                      alignSelf: "flex-end",
                      bottom: 0,
                      padding: 4,
                    }}
                  >
                    <Ionicons name={"briefcase"} size={8} color={"white"} />
                  </View>
                )}
                {followUser.isEmployee && (
                  <View
                    style={{
                      backgroundColor: "#3da4e3",
                      borderRadius: 20,
                      alignItems: "center",
                      position: "absolute",
                      alignSelf: "flex-end",
                      bottom: 0,
                      padding: 4,
                      right: followUser.isEmployer ? 14 : 0,
                    }}
                  >
                    <Ionicons name={"business"} size={8} color={"white"} />
                  </View>
                )}
              </ImageBackground>
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: "bold",
                    color: colors.primaryText,
                    marginLeft: 10,
                  }}
                >
                  {followUser.firstName}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    width: "70%",
                  }}
                >
                  {followUser.category}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("ViewUserProfile", {
                id: id,
              })
            }
          >
            <ImageBackground
              source={{
                uri: `${api}/upload/${followUser.profile}`,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
              imageStyle={{ borderRadius: 30 }}
            ></ImageBackground>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  color: colors.primaryText,
                  marginLeft: 10,
                }}
              >
                {followUser.firstName}
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  marginLeft: 10,
                  color: colors.primaryText,
                  fontFamily: "Sf-thin",
                }}
              >
                {followUser.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <FollowButton
          onPress={onFollow}
          follow={follow}
          style={{
            backgroundColor: follow ? null : colors.button,
            marginHorizontal: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            alignContent: "center",
            padding: 10,
            width: 100,
            position: "absolute",
            right: 0,
          }}
        />
      </View>
    </>
  );
};

export default DynamicFollowing;

const styles = StyleSheet.create({});
