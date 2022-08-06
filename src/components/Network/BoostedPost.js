import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useContext } from "react";
import { api } from "../../../Constants";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import UserContext from "../../context/UserContext";
const fullWidth = Dimensions.get("screen").width;
const BoostedPost = (props) => {
  const {
    postId,
    createUser,
    body,
    photo,

    likeCount,
    commentCount,
    shareCount,
    isLiked,
    isCompany,
  } = props;
  // Like unlike func
  const [liked, setLiked] = useState(isLiked);
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [counter, setCounter] = useState(likeCount);
  const onLike = () => {
    if (liked) {
      setLiked(false);
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
      setLiked(true);
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
                  ? navigation.navigate("ViewCompanyProfile", {
                      id: createUser._id,
                    })
                  : navigation.navigate("ViewUserProfile", {
                      id: createUser._id,
                    })
              }
            >
              <ImageBackground
                source={{
                  uri: `${api}/upload/${createUser.profile}`,
                }}
                style={{ width: 50, height: 50 }}
                imageStyle={{ borderRadius: 50 }}
              >
                <Image
                  style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                  source={
                    createUser.status === "lookingForJob"
                      ? require("../../../assets/looking.png")
                      : createUser.status === "opentowork"
                      ? require("../../../assets/open.png")
                      : createUser.status === "getEmployee"
                      ? require("../../../assets/hiring.png")
                      : null
                  }
                />
              </ImageBackground>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                  {createUser.lastName} {createUser.firstName}{" "}
                </Text>

                <>
                  <Text
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    {createUser.profession}{" "}
                    {createUser.workingCompany &&
                      `@${createUser.workingCompany}`}
                  </Text>
                  <Text
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    Sponsored
                  </Text>
                </>
              </View>
            </TouchableOpacity>
            {/* Post settings ooriin*/}
            {createUser._id === state.userId ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PostSettings", { id: postId })
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
            {/* unshared Zurag */}
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
            navigation.navigate("NetworkingPostDetailScreen", {
              id: postId,
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
            name={liked ? "heart-multiple" : "heart-multiple-outline"}
            size={24}
            color={liked ? "#FFB6C1" : colors.primaryText}
          />

          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            {liked ? "Таалагдлаа" : "Таалагдлаа"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("NetworkingPostDetailScreen", {
              id: postId,
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
