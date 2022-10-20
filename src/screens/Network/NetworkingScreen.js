import {
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContext";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import Posts from "../../components/Network/Posts";
import Header from "../../components/Header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const NetworkingScreen = ({ route }) => {
  const state = useContext(UserContext);
  const [userProfile] = useUserProfile(state.userId);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const insents = useSafeAreaInsets();
  const [maxPage, setMaxPage] = useState();
  useEffect(() => {
    makeRequest();
  }, [page, refreshing]);
  const makeRequest = async () => {
    const apiUrl = `${api}/api/v1/posts/${state.userId}/following?page=${page}&sort=-createdAt&limit=5`;
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        let datas = resJson.data;
        console.log(datas);
        setData(datas.concat(data));
        setLoading(false);
        setRefreshing(false);
        setError(null);
        setMaxPage(resJson.pagination.pageCount);
      })
      .catch((err) => {
        setError(err);
      });
  };
  const handleRefresh = () => {
    setData([]);
    setRefreshing(true);
    setPage(1);
  };
  const listFooterRender = () => {
    loading ? (
      <ActivityIndicator size={"large"} color={colors.primaryText} />
    ) : null;
  };
  const handleMore = () => {
    if (maxPage > page) {
      setPage(page + 1);
    }
    setLoading(true);
  };
  useEffect(() => {
    if (route.params?.indexId) {
      handleRefresh();
    }
  }, [route.params?.indexId]);
  if (!userProfile) {
    return null;
  }
  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
      <Header userSearch={true} />
      <FlatList
        data={data}
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
        renderItem={({ item }) => {
          return (
            <>
              {item && (
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
            </>
          );
        }}
        keyExtractor={(item, index) => index}
        ListFooterComponent={listFooterRender}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleMore}
        initialNumToRender={3}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

export default NetworkingScreen;
