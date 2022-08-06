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
          Alert.alert("Амжилттай дагахаа болилоо");
        })
        .catch((err) => {
          console.log(err);
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
          Alert.alert("Амжилттай дагалаа");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // const getCheckCv = () => {
  //   {
  //     !state.isCompany &&
  //       axios
  //         .get(`${api}/api/v1/applies/${state.userId}/apply`)
  //         .then((res) => {
  //           setCheckCvId(res.data.data);
  //           console.log(res.data.data);
  //         })
  //         .catch((err) => {
  //           alert(err);
  //           console.log(err);
  //         });
  //   }
  // };
  // useEffect(() => {
  //   getCheckCv();
  // }, []);
  // let cvCheck = checkCvId.map((e) => `${e.job}`);
  // useEffect(() => {
  //   setIsCvSent(cvCheck.includes(`${id}`));
  // }, [checkCvId]);
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
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                textAlign: "justify",
              }}
            >
              {category}
            </Text>
          </View>
        </View>
        {/* Employer employee status */}
        <View style={{ marginTop: 25, marginRight: 10 }}>
          {data.isEmployer && (
            <View
              style={{
                backgroundColor: "#3da4e3",
                flexDirection: "row",
                marginTop: 5,
                borderColor: colors.border,
                borderRadius: 20,
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
                borderRadius: 20,
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
            marginHorizontal: 5,
            justifyContent: "space-around",
          }}
        >
          {!state.isCompany && (
            <>
              {data.isEmployer && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFB6C1",
                    marginHorizontal: 5,
                    paddingVertical: 2,
                    alignItems: "center",
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
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <MaterialCommunityIcons
                      name="cube-send"
                      size={24}
                      color={colors.border}
                      style={{ top: 7 }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        top: 10,
                        color: colors.border,
                        right: 5,
                      }}
                    >
                      {" "}
                      Анкет илгээх{"   "}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}

          {data.isEmployee && (
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
                navigation.navigate("UserSendWorkRequest", { id: id })
              }
            >
              {/* Профайл янзлах */}
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <MaterialCommunityIcons
                  name="cube-send"
                  size={24}
                  color={colors.border}
                  style={{ top: 7 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    top: 10,
                    color: colors.border,
                    right: 5,
                  }}
                >
                  {" "}
                  Ажлын санал тавих{"   "}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Тохиргоо */}
          <TouchableOpacity
            style={{
              backgroundColor: !following ? "#FFB6C1" : null,
              marginHorizontal: 5,
              paddingVertical: 8,
              borderRadius: 10,
              flex: 0.34,
              borderWidth: 1,
              borderColor: colors.border,
            }}
            onPress={onFollow}
          >
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <AntDesign
                name={following ? "deleteuser" : "adduser"}
                size={24}
                color={!following ? colors.border : colors.primaryText}
              />
              <Text
                style={{
                  textAlign: "center",
                  top: 3,
                  color: !following ? colors.border : colors.primaryText,
                }}
              >
                {" "}
                {following ? "Дагадаг" : "Дагах"}
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
              Дагсан
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CompanyTop;

const styles = StyleSheet.create({});
