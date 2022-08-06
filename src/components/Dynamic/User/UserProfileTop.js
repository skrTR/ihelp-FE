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

const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;
const UserProfileTop = ({ userProfile, isFollowing }) => {
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
          Alert.alert("Амжилттай дагахаа болилоо");
        })
        .catch((err) => {
          console.log(err);
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
          Alert.alert("Амжилттай дагалаа");
        })
        .catch((err) => {
          console.log(err);
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
                bottom: 15,
                position: "absolute",
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 16,
              }}
            >
              {userProfile.lastName} {userProfile.firstName}{" "}
            </Text>
            <Text
              style={{
                bottom: 0,
                position: "absolute",
                fontFamily: "Sf-thin",
                color: colors.secondaryText,
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
          flex: 1,
          marginHorizontal: 5,
          justifyContent: "space-around",
          bottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB6C1",
            marginHorizontal: 5,
            paddingVertical: 2,
            alignItems: "center",
            borderRadius: 10,
            flex: 0.66,
          }}
          onPress={() =>
            navigation.navigate("UserSendWorkRequest", { id: userProfile._id })
          }
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <MaterialCommunityIcons
              name="cube-send"
              size={24}
              color={colors.border}
              style={{ top: 5 }}
            />
            <Text
              style={{
                textAlign: "center",
                top: 8,
                color: colors.border,
                right: 5,
              }}
            >
              {" "}
              Ажлын санал илгээх{"   "}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB6C1",
            marginHorizontal: 5,
            paddingVertical: 8,
            borderRadius: 10,
            flex: 0.34,
          }}
          onPress={onFollow}
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <AntDesign
              name={following ? "deleteuser" : "adduser"}
              size={24}
              color={colors.border}
            />
            <Text style={{ textAlign: "center", top: 3, color: colors.border }}>
              {" "}
              {following ? "Дагадаг" : "Дагах"}
            </Text>
          </View>
        </TouchableOpacity>
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
            Дагсан
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UserProfileTop;

const styles = StyleSheet.create({});
