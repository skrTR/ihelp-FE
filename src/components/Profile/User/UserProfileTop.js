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
              {cv.profession}
              {cv.workingCompany && `@${cv.workingCompany}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginRight: 10,
            top: 40,
          }}
          onPress={() =>
            navigation.navigate("WalletScreen", {
              point: userProfile.point,
            })
          }
        >
          <LinearGradient
            colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
            style={{ padding: 4, paddingHorizontal: 20, borderRadius: 10 }}
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
            marginHorizontal: 5,
            paddingVertical: 2,
            alignItems: "center",
            borderRadius: 10,
            flex: 0.66,
          }}
          onPress={() =>
            navigation.navigate("CreateCvScreen", { id: userProfile._id })
          }
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Entypo
              name="documents"
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
          onPress={() =>
            navigation.navigate("UserSettingsScreen", {
              userProfile: userProfile,
              cv: cv,
            })
          }
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <AntDesign name="setting" size={24} color={colors.border} />
            <Text style={{ textAlign: "center", top: 3, color: colors.border }}>
              {" "}
              Тохиргоо
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
            Дагсан
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UserProfileTop;

const styles = StyleSheet.create({});
