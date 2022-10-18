import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { api } from "../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CircularProgress from "react-native-circular-progress-indicator";

const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;
const UserProfileTop = ({ userProfile, cv }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + " мянга"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + " cая"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  return (
    <>
      {/* Cover */}
      <ImageBackground
        source={{ uri: `${api}/upload/${userProfile.cover}` }}
        style={{ width: fullWidth, height: fullHeight / 4 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            right: 10,
            padding: 5,
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 100,
          }}
          onPress={() =>
            navigation.navigate("EditCoverModal", { cover: userProfile.cover })
          }
        >
          <Feather name="camera" size={20} color={colors.border} />
        </TouchableOpacity>
      </ImageBackground>
      {/* Photo name wallet */}
      <View
        style={{
          flexDirection: "row",
          bottom: 50,
          marginHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditStatusModal", {
                data: userProfile,
                cvData: cv,
              })
            }
          >
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
              <View
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  left: 60,
                  borderRadius: 50,
                  padding: 5,
                  bottom: -3,
                  backgroundColor: "#FFB6C1",
                }}
              >
                <Feather name="plus" size={14} color={colors.border} />
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
              {cv.lastName.slice(0, 1)}. {cv.firstName}{" "}
              {userProfile.isApproved && (
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
                bottom: cv.profession && cv.profession.length < 15 ? 0 : -15,
                position: "absolute",
                fontFamily: "Sf-thin",
                color: colors.secondaryText,
                width: 150,
              }}
              numberOfLines={2}
            >
              {cv.profession} {cv.workingCompany && `@${cv.workingCompany}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            top: 40,
            position: "absolute",
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("WalletScreen", {
              point: userProfile.point,
              userName: userProfile.firstName,
            })
          }
        >
          <LinearGradient
            colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
            style={{
              padding: 4,
              paddingHorizontal: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            start={[0.0, 0.5]}
            end={[1.0, 0.5]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="wallet-outline"
                size={24}
                color={colors.primaryText}
              />

              <Text style={{ color: "white" }}>
                {numFormatter(userProfile.point)}
              </Text>
            </View>
            <Text style={{ color: colors.primaryText, fontFamily: "Sf-thin" }}>
              Хэтэвч
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginHorizontal: 5,
          justifyContent: "space-around",
          bottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB6C1",
            paddingVertical: 2,
            alignItems: "center",
            borderRadius: 10,
            flex: 0.66,
            marginRight: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("CreateCvScreen", { id: userProfile._id })
          }
        >
          <Text
            style={{
              color: colors.border,
            }}
          >
            {" "}
            Анкет янзлах{"   "}
          </Text>
          <CircularProgress
            value={cv.score}
            activeStrokeColor={"#3A1C71"}
            activeStrokeSecondaryColor={"#D76D77"}
            inActiveStrokeOpacity={0.5}
            progressValueColor={colors.border}
            valueSuffix={"%"}
            delay={1000}
            radius={18}
            activeStrokeWidth={5}
            inActiveStrokeWidth={5}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB6C1",
            borderRadius: 10,
            flex: 0.34,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("UserSettingsScreen", {
              userProfile: userProfile,
              cv: cv,
            })
          }
        >
          <Text style={{ textAlign: "center", color: colors.border }}>
            {" "}
            Тохиргоо
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 14,
          marginRight: 6,
          bottom: 10,
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
