import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Entypo, MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";
import { api } from "../../../../../Constants";
const UserActivityModal = () => {
  const [activityData, setActivityData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getNetworkActivity = () => {
    axios
      .get(`${api}/api/v1/cvs/activity?sort=-createdAt`)
      .then((res) => {
        setActivityData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getNetworkActivity();
  }, []);
  return (
    <View>
      <FlatList
        data={activityData}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={<View style={{ marginBottom: 20 }} />}
        renderItem={({ item }) => {
          return (
            <View>
              {item.type === "Comment" && (
                <>
                  {item.postId && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("NetworkingPostDetailScreen", {
                          id: item.postId._id,
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                          flex: 1,
                          marginHorizontal: 10,
                          alignItems: "center",
                        }}
                      >
                        <ImageBackground
                          source={{
                            uri: `${api}/upload/${
                              item.postId.createUser &&
                              item.postId.createUser.profile
                            }`,
                          }}
                          style={{ width: 65, height: 65, flex: 0.9 }}
                          imageStyle={{ borderRadius: 50 }}
                        >
                          <View
                            style={{
                              backgroundColor: "#56953e",
                              borderRadius: 30,
                              padding: 5,
                              position: "absolute",
                              bottom: 0,
                              right: 20,
                            }}
                          >
                            <MaterialCommunityIcons
                              name="comment-text-multiple-outline"
                              size={15}
                              color={colors.primaryText}
                            />
                          </View>
                        </ImageBackground>
                        <View style={{ flex: 3, marginHorizontal: 5 }}>
                          <Text style={{ color: colors.primaryText }}>
                            Та{" "}
                            {item.postId.createUser &&
                              `${item.postId.createUser.lastName} ${item.postId.createUser.firstName}`}{" "}
                            нийтлэл нь дээр коммэнт бичсэн байна.{" "}
                          </Text>
                          <Text
                            style={{
                              color: colors.secondaryText,
                              fontSize: 12,
                            }}
                          >
                            {moment(item.createdAt).fromNow()}{" "}
                          </Text>
                          <Text
                            style={{
                              color: colors.secondaryText,
                              fontSize: 12,
                            }}
                          >
                            {item.commentBody}
                          </Text>
                        </View>
                        <Entypo
                          name="dots-three-horizontal"
                          size={24}
                          color={colors.primaryText}
                          style={{ flex: 0.6 }}
                        />
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: colors.border,
                          marginVertical: 12,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </>
              )}
              {item.type === "Share" && (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("NetworkingPostDetailScreen", {
                        id: item.postId._id,
                        isLiked: item.postId.isLiked,
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        flex: 1,
                        marginHorizontal: 10,
                        alignItems: "center",
                      }}
                    >
                      <ImageBackground
                        source={{
                          uri: `${api}/upload/${
                            item.postId.createUser &&
                            item.postId.createUser.profile
                          }`,
                        }}
                        style={{ width: 65, height: 65, flex: 0.9 }}
                        imageStyle={{ borderRadius: 50 }}
                      >
                        <View
                          style={{
                            backgroundColor: "#717253",
                            borderRadius: 30,
                            padding: 5,
                            position: "absolute",
                            bottom: 0,
                            right: 20,
                          }}
                        >
                          <MaterialCommunityIcons
                            name="share-all-outline"
                            size={15}
                            color={colors.primaryText}
                          />
                        </View>
                      </ImageBackground>
                      <View style={{ flex: 3, marginHorizontal: 5 }}>
                        <Text style={{ color: colors.primaryText }}>
                          Та{" "}
                          {item.postId.createUser &&
                            `${item.postId.createUser.lastName} ${item.postId.createUser.firstName}`}{" "}
                          нийтлэлийг хуваалцсан байна.{" "}
                        </Text>
                        <Text
                          style={{
                            color: colors.secondaryText,
                            fontSize: 12,
                          }}
                        >
                          {moment(item.createdAt).fromNow()}{" "}
                        </Text>
                      </View>
                      <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color={colors.primaryText}
                        style={{ flex: 0.6 }}
                      />
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: colors.border,
                        marginVertical: 12,
                      }}
                    />
                  </TouchableOpacity>
                </>
              )}
              {item.type === "Like" && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("NetworkingPostDetailScreen", {
                      id: item.postId && item.postId._id,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      flex: 1,
                      marginHorizontal: 10,
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      source={{
                        uri: `${api}/upload/${
                          item.postId.createUser &&
                          item.postId.createUser.profile
                        }`,
                      }}
                      style={{ width: 65, height: 65, flex: 0.9 }}
                      imageStyle={{ borderRadius: 50 }}
                    >
                      <View
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: 30,
                          padding: 5,
                          position: "absolute",
                          bottom: 0,
                          right: 20,
                        }}
                      >
                        <MaterialCommunityIcons
                          name={"heart-multiple"}
                          size={12}
                          color={"#FFB6C1"}
                        />
                      </View>
                    </ImageBackground>
                    <View style={{ flex: 3, marginHorizontal: 5 }}>
                      <Text style={{ color: colors.primaryText }}>
                        Танд{" "}
                        {item.postId.createUser &&
                          `${item.postId.createUser.lastName} ${item.postId.createUser.firstName}`}{" "}
                        нийтлэл таалагдсан байна.{" "}
                      </Text>
                      <Text
                        style={{ color: colors.secondaryText, fontSize: 12 }}
                      >
                        {moment(item.createdAt).fromNow()}{" "}
                      </Text>
                    </View>
                    <Entypo
                      name="dots-three-horizontal"
                      size={24}
                      color={colors.primaryText}
                      style={{ flex: 0.6 }}
                    />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      marginVertical: 12,
                    }}
                  />
                </TouchableOpacity>
              )}
              {item.type === "JobSave" && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UserWorkDetail", {
                      id: item.jobId._id,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      flex: 1,
                      marginHorizontal: 10,
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      source={{
                        uri: `${api}/upload/${
                          item.jobId.createUser && item.jobId.createUser.profile
                        }`,
                      }}
                      style={{ width: 65, height: 65, flex: 0.9 }}
                      imageStyle={{ borderRadius: 50 }}
                    >
                      <View
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: 30,
                          padding: 5,
                          position: "absolute",
                          bottom: 0,
                          right: 20,
                        }}
                      >
                        <Foundation
                          name="shopping-bag"
                          size={12}
                          color={"#FFB6C1"}
                        />
                      </View>
                    </ImageBackground>
                    <View style={{ flex: 3, marginHorizontal: 5 }}>
                      <Text style={{ color: colors.primaryText }}>
                        Та {item.jobId && item.jobId.firstName} танд ажлын санал
                        илгээсэн байна.{" "}
                      </Text>
                      <Text
                        style={{ color: colors.secondaryText, fontSize: 12 }}
                      >
                        {moment(item.createdAt).fromNow()}{" "}
                      </Text>
                      <Text
                        style={{ color: colors.secondaryText, fontSize: 12 }}
                      >
                        Мэргэжил:{" "}
                        {item.jobId.occupation && item.jobId.occupation.name}{" "}
                        {`- ${item.jobId.type}`}
                      </Text>
                    </View>
                    <Entypo
                      name="dots-three-horizontal"
                      size={24}
                      color={colors.primaryText}
                      style={{ flex: 0.6 }}
                    />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      marginVertical: 12,
                    }}
                  />
                </TouchableOpacity>
              )}
              {item.type === "Post" && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("NetworkingPostDetailScreen", {
                      id: item.postId._id,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      flex: 1,
                      marginHorizontal: 10,
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      source={{
                        uri: `${api}/upload/${
                          item.postId.createUser &&
                          item.postId.createUser.profile
                        }`,
                      }}
                      style={{ width: 65, height: 65, flex: 0.9 }}
                      imageStyle={{ borderRadius: 50 }}
                    >
                      <View
                        style={{
                          backgroundColor: "#2ab7ca",
                          borderRadius: 30,
                          padding: 5,
                          position: "absolute",
                          bottom: 0,
                          right: 20,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="folder-key-network-outline"
                          size={12}
                          color={"white"}
                        />
                      </View>
                    </ImageBackground>
                    <View style={{ flex: 3, marginHorizontal: 5 }}>
                      <Text style={{ color: colors.primaryText }}>
                        Та олон нийтийн сүлжээнд шинэ нийтлэл орууллаа.
                      </Text>
                      <Text
                        style={{ color: colors.secondaryText, fontSize: 12 }}
                      >
                        {moment(item.createdAt).fromNow()}{" "}
                      </Text>
                    </View>
                    <Entypo
                      name="dots-three-horizontal"
                      size={24}
                      color={colors.primaryText}
                      style={{ flex: 0.6 }}
                    />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      marginVertical: 12,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default UserActivityModal;

const styles = StyleSheet.create({});
