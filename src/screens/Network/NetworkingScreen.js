import {
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContext";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import Posts from "../../components/Network/Posts";
import Header from "../../components/Header/Header";
import useNetworkingPost from "../../hooks/NetworkingHook/useNetworkingPost";
import useNetworkingBoost from "../../hooks/NetworkingHook/useNetworkingBoost";
import BoostedPost from "../../components/Network/BoostedPost";
const NetworkingScreen = () => {
  const state = useContext(UserContext);
  const [userProfile] = useUserProfile(state.userId);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, followData, maxPage, currentPage, setCurrentPage] =
    useNetworkingPost(state.userId);
  const [boostLoading, boostData, boostPage, setBoostPage, boostMaxPage] =
    useNetworkingBoost();
  const renderLoader = () => {
    return loading ? (
      <ActivityIndicator size={"large"} color={colors.primaryText} />
    ) : null;
  };

  const loadMoreItem = () => {
    if (maxPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!userProfile) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.header, flex: 1 }}>
      <Header userSearch={true} />
      <FlatList
        data={followData}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        ListHeaderComponent={
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddPostScreen")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
                padding: 10,
                paddingBottom: 20,
                justifyContent: "space-between",
                marginTop: 10,
                backgroundColor: colors.background,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ImageBackground
                  source={{ uri: `${api}/upload/${userProfile.profile}` }}
                  style={{ width: 50, height: 50 }}
                  imageStyle={{ borderRadius: 50 }}
                >
                  <Image
                    style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                    source={
                      userProfile.status === "lookingForJob"
                        ? require("../../../assets/looking.png")
                        : userProfile.status === "opentowork"
                        ? require("../../../assets/open.png")
                        : userProfile.status === "getEmployee"
                        ? require("../../../assets/hiring.png")
                        : null
                    }
                  />
                </ImageBackground>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: colors.secondaryText }}>
                    Та хэлэх зүйлээ бичнэ үү?
                  </Text>
                </View>
              </View>
              <FontAwesome5
                name="images"
                size={24}
                color="#FFB6C1"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                marginTop: 10,
              }}
            />
          </>
        }
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <View style={{ backgroundColor: colors.background }}>
              {item.createUser && (
                <Posts
                  postId={item._id}
                  createUserId={item.createUser}
                  createUserProfile={item.profile}
                  createUserStatus={item.status}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  profession={item.profession}
                  workingCompany={item.workingCompany}
                  createdAt={item.createdAt}
                  body={item.body}
                  photo={item.photo}
                  isShared={item.isShare}
                  sharedUserFirstName={
                    item.shareInfo && item.shareInfo.firstName
                  }
                  sharedUserLastName={item.shareInfo && item.shareInfo.lastName}
                  sharedUserProfile={item.shareInfo && item.shareInfo.profile}
                  sharedId={item.shareInfo && item.shareInfo.createUser}
                  sharedCreatedAt={item.shareInfo && item.shareInfo.createdAt}
                  sharedBody={item.shareInfo && item.shareInfo.body}
                  sharedPhoto={item.shareInfo && item.shareInfo.photo}
                  sharedUserProfession={
                    item.shareInfo && item.shareInfo.profession
                  }
                  sharedUserWorkingCompany={
                    item.shareInfo && item.shareInfo.workingCompany
                  }
                  likeCount={item.like}
                  commentCount={item.comment}
                  shareCount={item.share}
                  isLiked={item.isLiked}
                  isCompany={item.organization}
                  isBoost={item.isBoost}
                  isApproved={item.isApproved}
                />
              )}
            </View>
          );
        }}
      />
      <FlatList
        data={boostData}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <View style={{ backgroundColor: colors.background }}>
              {item.createUser && (
                <BoostedPost
                  postId={item._id}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  body={item.body}
                  photo={item.photo}
                  profession={item.profession}
                  workingCompany={item.workingCompany}
                  createUserId={item.createUser}
                  createUserProfile={item.profile}
                  createUserStatus={item.status}
                  likeCount={item.like}
                  commentCount={item.comment}
                  shareCount={item.share}
                  isCompany={item.organization}
                  isApproved={item.isApproved}
                />
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NetworkingScreen;
