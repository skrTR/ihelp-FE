import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { api } from "../../../Constants";
import moment from "moment";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo, AntDesign } from "@expo/vector-icons";
import UserContext from "../../context/UserContext";
const fullWidth = Dimensions.get("screen").width;
const BoostedPost = (props) => {
  const {
    postId,
    firstName,
    lastName,
    body,
    photo,
    profession,
    workingCompany,
    createUserProfile,
    createUserId,
    createUserStatus,
    likeCount,
    commentCount,
    shareCount,
    isCompany,
    isApproved,
  } = props;
  // Like unlike func
  const [isLike, setIsLike] = useState(false);
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [counter, setCounter] = useState(likeCount);
  const [checkLikeId, setCheckLikeId] = useState([]);

  const onLike = () => {
    if (isLike) {
      setIsLike(false);
      axios
        .delete(`${api}/api/v1/likes/${postId}`)
        .then((res) => {
          // alert("Unlike hiilee");
          setCounter(counter - 1);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    } else {
      setIsLike(true);
      axios
        .post(`${api}/api/v1/likes/${postId}`)
        .then((res) => {
          // alert("Like darlaa");
          setCounter(counter + 1);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const getCheckLike = () => {
    {
      !state.isCompany &&
        axios
          .get(`${api}/api/v1/likes/${state.userId}/posts`)
          .then((res) => {
            setCheckLikeId(res.data.data);
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
    }
  };
  useEffect(() => {
    getCheckLike();
  }, []);
  let sonin1 = checkLikeId.map((e) => `${e.post}`);
  useEffect(() => {
    setIsLike(sonin1.includes(`${postId}`));
  }, [checkLikeId]);
  return (
    <>
      {/* User Post */}
      <View style={{ marginTop: 10 }}>
        {/* User detail and body and photos */}
        <View
          style={{
            marginHorizontal: 0,
            borderWidth: 0,
            borderColor: colors.border,
          }}
        >
          {/* End hereglegchiin medeelel */}
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() =>
                isCompany
                  ? navigation.navigate("ViewUserProfile", {
                      id: createUserId,
                    })
                  : navigation.navigate("ViewCompanyProfile", {
                      id: createUserId,
                    })
              }
            >
              <ImageBackground
                source={{
                  uri: `${api}/upload/${createUserProfile}`,
                }}
                style={{ width: 50, height: 50 }}
                imageStyle={{ borderRadius: 50 }}
              >
                <Image
                  style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                  source={
                    createUserStatus === "lookingForJob"
                      ? require("../../../assets/looking.png")
                      : createUserStatus === "opentowork"
                      ? require("../../../assets/open.png")
                      : createUserStatus === "getEmployee"
                      ? require("../../../assets/hiring.png")
                      : null
                  }
                />
              </ImageBackground>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                  {lastName}
                  {firstName}
                  {isApproved && (
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        borderRadius: 50,
                        alignItems: "center",
                        alignContent: "center",
                      }}
                    >
                      <AntDesign
                        name="check"
                        size={13}
                        color={colors.primaryText}
                      />
                    </View>
                  )}
                </Text>

                {profession && (
                  <Text
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    {profession} {workingCompany && `@${workingCompany}`}
                  </Text>
                )}
                <Text
                  style={{
                    color: colors.secondaryText,
                  }}
                >
                  Sponsored
                </Text>
              </View>
            </TouchableOpacity>
            {/* Post settings ooriin*/}
            {createUserId === state.userId ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PostSettings", {
                    id: postId,
                  })
                }
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={24}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NetworkingPostDetailScreen", {
                id: postId,
                isLike: isLike,
              })
            }
          >
            {/* Body text */}
            {body ? (
              <Text style={{ margin: 10, color: colors.primaryText }}>
                {" "}
                {body}{" "}
              </Text>
            ) : (
              <View style={{ margin: 10 }} />
            )}
            {/* boosted Zurag */}
            {photo && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${photo}`,
                  }}
                  style={{ width: fullWidth, height: 350 }}
                />
                <View
                  style={{
                    margin: 10,
                    borderColor: colors.border,
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Like counts share counts comment counts */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 0,
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: "Sf-thin",
            fontSize: 12,
          }}
          onPress={() =>
            navigation.navigate("PostLikeUser", {
              postId: postId,
            })
          }
        >
          {counter + " Таалагдсан"}
        </Text>
        <Text
          style={{
            marginHorizontal: 20,
            color: colors.primaryText,
            fontFamily: "Sf-thin",
            fontSize: 12,
          }}
          onPress={() =>
            navigation.navigate("NetworkingPostDetailScreen", {
              id: postId,
              isLike: isLike,
            })
          }
        >
          {commentCount + " Сэтгэгдэл"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-thin",
              fontSize: 12,
            }}
            onPress={() =>
              navigation.navigate("NetworkingPostDetailScreen", {
                id: postId,
                isLike: isLike,
              })
            }
          >
            {shareCount + " Хуваалцсан"}
          </Text>
        </View>
      </View>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      />
      {/* Like share comment do it */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onLike}
        >
          <MaterialCommunityIcons
            name={isLike ? "heart-multiple" : "heart-multiple-outline"}
            size={24}
            color={isLike ? "#FFB6C1" : colors.primaryText}
          />

          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            {isLike ? "Таалагдлаа" : "Таалагдлаа"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("NetworkingPostDetailScreen", {
              id: postId,
              isLike: isLike,
            })
          }
        >
          <MaterialCommunityIcons
            name="comment-text-multiple-outline"
            size={24}
            color={colors.primaryText}
          />
          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            Сэтгэгдэл
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SharePostModal", { id: postId })}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="share-all-outline"
            size={24}
            color={colors.primaryText}
          />
          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            Хуваалцах
          </Text>
        </TouchableOpacity>
      </View>
      {/* Line */}
      <View
        style={{
          marginTop: 10,
          borderColor: colors.border,
          marginHorizontal: 10,
        }}
      />
      {/* Zuraas  */}
      <View style={{ backgroundColor: colors.border, paddingVertical: 2 }} />
    </>
  );
};

export default BoostedPost;

const styles = StyleSheet.create({});
