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
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign, Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { api } from "../../../../Constants";
import Verify from "../../Verify";

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
    point,
    data,
    isApproved,
  } = props;

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "Мянга"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + "Сая"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  return (
    <>
      {/* Cover */}
      <ImageBackground
        source={{ uri: `${api}/upload/${cover}` }}
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
            navigation.navigate("EditCompanyCover", { cover: cover })
          }
        >
          <Feather name="camera" size={20} color={colors.border} />
        </TouchableOpacity>
      </ImageBackground>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditCompanyStatus", {
                profile: profile,
                name: name,
                category: category,
              })
            }
          >
            {/* Camera */}
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
              <Feather name="plus" size={14} color={"black"} />
            </View>
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
          </TouchableOpacity>
          <View style={{ marginLeft: 1, top: 28 }}>
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 18,
                width: name.length > 10 ? "70%" : "100%",
              }}
            >
              {name} {isApproved && <Verify size={13} />}
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                width: category && category.length > 12 ? "70%" : "100%",
              }}
            >
              {category}
            </Text>
          </View>
        </View>
        {/* Settings */}
        <TouchableOpacity
          style={{
            top: 60,
            position: "absolute",
            right: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("WalletScreen", {
              point: point,
              userName: name,
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
              <Ionicons name="wallet-outline" size={24} color={"white"} />

              <Text style={{ color: "white" }}>{numFormatter(point)}</Text>
            </View>
            <Text style={{ color: "white", fontFamily: "Sf-thin" }}>
              Хэтэвч
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{ bottom: 50 }}>
        {/* Profile Edit and setting */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginHorizontal: 5,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              marginHorizontal: 5,
              paddingVertical: 2,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              flex: 0.66,
            }}
            onPress={() =>
              navigation.navigate("CompanyProfileEdit", { data: data })
            }
          >
            {/* Профайл янзлах */}
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: "black",
                }}
              >
                Профайл янзлах
              </Text>
            </View>
          </TouchableOpacity>
          {/* Тохиргоо */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              marginHorizontal: 5,
              paddingVertical: 8,
              borderRadius: 10,
              flex: 0.34,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("CompanySettingModal")}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ textAlign: "center", color: "black" }}>
                Тохиргоо
              </Text>
            </View>
          </TouchableOpacity>
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
            onPress={() =>
              navigation.navigate("ViewUserFollower", { id: data._id })
            }
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
              navigation.navigate("ViewUserFollowings", { id: data._id })
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
