import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
import FollowButton from "../../FollowButton";
import Verify from "../../Verify";

const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;
const UserProfileTop = ({ userProfile, isFollowing, status }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [following, setFollowing] = useState(isFollowing);
  const state = useContext(UserContext);
  const onFollow = () => {
    if (following) {
      setFollowing(false);
      axios
        .post(
          `${api}/api/v1/follows/${userProfile._id}/${
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
          `${api}/api/v1/follows/${userProfile._id}/${
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
        source={{ uri: `${api}/upload/${userProfile.cover}` }}
        style={{ width: fullWidth, height: fullHeight / 4 }}
      />
      {/* Photo name  */}
      <View
        style={{
          flexDirection: "row",
          bottom: 50,
          marginHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <ImageBackground
            style={{ width: 90, height: 90 }}
            source={{ uri: `${api}/upload/${userProfile.profile}` }}
            imageStyle={{ borderRadius: 50 }}
          >
            <Image
              source={
                userProfile.status === "opentowork"
                  ? require("../../../../assets/open.png")
                  : userProfile.status === "lookingForJob"
                  ? require("../../../../assets/looking.png")
                  : userProfile.status === "getEmployee"
                  ? require("../../../../assets/hiring.png")
                  : null
              }
              style={{ width: 96, height: 96, right: 3, bottom: 3 }}
            />
          </ImageBackground>
          <View style={{}}>
            <Text
              style={{
                bottom: 12,
                position: "absolute",
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 16,
              }}
            >
              {userProfile.lastName} {userProfile.firstName}{" "}
              {userProfile.isApproved && <Verify size={12} />}
            </Text>
            <Text
              style={{
                bottom: status.length > 30 ? -20 : -3,
                position: "absolute",
                fontFamily: "Sf-thin",
                color: colors.secondaryText,
                width: status.length > 30 ? fullWidth / 1.5 : fullWidth,
              }}
            >
              {userProfile.profession}{" "}
              {userProfile.workingCompany && `@${userProfile.workingCompany}`}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 5,
          justifyContent: "space-between",
          bottom: 25,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.button,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
          }}
          onPress={() =>
            navigation.navigate("UserSendWorkRequest", { id: userProfile._id })
          }
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
                padding: 10,
              }}
            >
              Ажлын санал илгээх
            </Text>
          </View>
        </TouchableOpacity>
        <FollowButton
          onPress={onFollow}
          follow={following}
          style={{
            backgroundColor: following ? null : colors.button,
            borderRadius: 10,
            borderWidth: following ? 1 : null,
            borderColor: colors.border,
            width: "28%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 14,
          marginRight: 6,
          bottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("ViewUserPosts", { id: userProfile.id })
          }
        >
          <Text style={{ color: colors.primaryText }}>
            {userProfile.postNumber}
          </Text>
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-thin",
              marginTop: 5,
            }}
          >
            Нийтлэл
          </Text>
        </TouchableOpacity>
        <View style={{ padding: 0.2, backgroundColor: colors.secondaryText }} />
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("ViewUserFollower", { id: userProfile._id })
          }
        >
          <Text style={{ color: colors.primaryText }}>
            {userProfile.follower}
          </Text>
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
        <View style={{ padding: 0.2, backgroundColor: colors.secondaryText }} />
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("ViewUserFollowings", { id: userProfile._id })
          }
        >
          <Text style={{ color: colors.primaryText }}>
            {userProfile.following}
          </Text>
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
    </>
  );
};

export default UserProfileTop;

const styles = StyleSheet.create({});
