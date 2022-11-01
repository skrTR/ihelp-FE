import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { api } from "../../../../Constants";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import Verify from "../../Verify";
import FollowButton from "../../FollowButton";
const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;
const CompanyTop = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const {
    cover,
    profile,
    name,
    category,
    jobCount,
    followerCount,
    followingCount,
    isFollow,
    data,
    id,
  } = props;
  const [following, setFollowing] = useState(isFollow);
  const state = useContext(UserContext);

  // const [isCvSent, setIsCvSent] = useState(false);
  // const [checkCvId, setCheckCvId] = useState([]);
  const onFollow = () => {
    if (following) {
      setFollowing(false);
      axios
        .post(
          `${api}/api/v1/follows/${id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          // Alert.alert("Амжилттай дагахаа болилоо");
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
      setFollowing(true);
      axios
        .post(
          `${api}/api/v1/follows/${id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          // Alert.alert("Амжилттай дагалаа");
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
      {/* Cover */}
      <Image
        source={{ uri: `${api}/upload/${cover}` }}
        style={{ width: fullWidth, height: fullHeight / 4 }}
      />
      {/* Profile pic, and wallet */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          bottom: 65,
          alignItems: "center",
        }}
      >
        {/* Pro pic and Name category */}

        <View
          style={{
            flexDirection: "row",
            padding: 20,
            alignItems: "center",
            right: 10,
          }}
        >
          {/* Propic */}
          <Image
            source={{ uri: `${api}/upload/${profile}` }}
            style={{
              width: 90,
              height: 90,
              top: 0,
              borderRadius: 50,
            }}
          />
          <View style={{ marginLeft: 1, top: 28 }}>
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 18,
                width: name.length > 10 ? "70%" : "100%",
              }}
            >
              {name}{" "}
              {data.isApproved && (
                <View
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 50,
                    alignItems: "center",
                    padding: 2,
                    alignContent: "center",
                  }}
                >
                  <AntDesign
                    name="check"
                    size={12}
                    color={colors.primaryText}
                  />
                </View>
              )}
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 11,
                width: "70%",
              }}
            >
              {category}
            </Text>
          </View>
        </View>
        {/* Employer employee status */}
        <View style={{ position: "absolute", right: 5 }}>
          {data.isEmployer && (
            <View
              style={{
                backgroundColor: "#3da4e3",
                flexDirection: "row",
                marginTop: 5,
                borderColor: colors.border,
                borderRadius: 10,
                alignItems: "center",
                padding: 2,
                paddingEnd: 15,
              }}
            >
              <Text> </Text>
              <Ionicons
                name={"business"}
                size={18}
                color={colors.primaryText}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Sf-medium",
                  color: colors.primaryText,
                  left: 5,
                }}
              >
                {" "}
                Ажил олгогч
              </Text>
            </View>
          )}

          {data.isEmployee && (
            <View
              style={{
                backgroundColor: "#ff914d",
                flexDirection: "row",
                marginTop: 5,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                alignItems: "center",
                padding: 2,
                paddingHorizontal: 5,
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <Ionicons
                name={"briefcase"}
                size={18}
                color={colors.primaryText}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Sf-medium",
                  color: colors.primaryText,
                }}
              >
                {" "}
                Ажил гүйцэтгэгч
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={{ bottom: 50 }}>
        {/* Profile Edit and setting */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginHorizontal: 10,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.button,
              paddingVertical: 2,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              flex: 0.66,
            }}
            onPress={() => {
              navigation.navigate("EmployerSendWorkModal", {
                id: id,
                isSentCv: data.isSentCv,
              });
            }}
          >
            {/* Профайл янзлах */}
            <Text
              style={{
                color: "black",
                fontSize: 12,
              }}
            >
              Анкет илгээх
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.button,
              marginHorizontal: 5,
              paddingVertical: 2,
              alignItems: "center",
              borderRadius: 10,
              flex: 0.66,
              justifyContent: "center",
            }}
            onPress={() =>
              navigation.navigate("CompanySendWorkRequest", { id: id })
            }
          >
            {/* Профайл янзлах */}

            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 12,
              }}
            >
              Ажлын санал тавих
            </Text>
          </TouchableOpacity>
          {/* Тохиргоо */}
          <FollowButton
            onPress={onFollow}
            follow={following}
            style={{
              backgroundColor: following ? null : colors.button,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              width: 120,
              alignContent: "center",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              flex: 0.34,
            }}
            fontStyle={{ fontSize: 12 }}
          />
        </View>
        {/* Follower Following Jobs */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 14,
            marginRight: 6,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("ViewCompanyJobs", { id: data._id })
            }
          >
            <Text style={{ color: colors.primaryText }}>{jobCount}</Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                marginTop: 5,
              }}
            >
              Ажлын зар
            </Text>
          </TouchableOpacity>
          <View
            style={{ padding: 0.2, backgroundColor: colors.secondaryText }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("ViewUserFollower", { id: id })}
          >
            <Text style={{ color: colors.primaryText }}>{followerCount}</Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                marginTop: 5,
              }}
            >
              Дагагч
            </Text>
          </TouchableOpacity>
          <View
            style={{ padding: 0.2, backgroundColor: colors.secondaryText }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("ViewUserFollowings", { id: id })
            }
          >
            <Text style={{ color: colors.primaryText }}>{followingCount}</Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                marginTop: 5,
              }}
            >
              Дагaсан
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CompanyTop;

const styles = StyleSheet.create({});
