import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContext";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import Posts from "../../components/Network/Posts";
import Header from "../../components/Header/Header";
const NetworkingScreen = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [followData, setFollowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pagination, setPagination] = useState();
  const [noMore, setNoMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [userProfile] = useUserProfile(state.userId);
  let isMounted = true;
  const getFollowData = () => {
    axios
      .get(
        `${api}/api/v1/posts/${state.userId}/following?limit=4&sort=-createdAt&page=${pageCurrent}`
      )
      // .get(
      //   `${api}/api/v1/posts/${state.userId}/following?limit=4&sort=-createdAt&page=${pageCurrent}`
      // )
      .then((res) => {
        if (isMounted) {
          setFollowData([...followData, ...res.data.data]);
          setPagination(res.data.pagination);
        }
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    setIsLoading(false);
    setIsFetching(false);
    getFollowData();
    return () => {
      isMounted = false;
    };
  }, [pageCurrent, isFetching, isFocused]);

  const onRefresh = () => {
    setIsFetching(true);
  };
  const renderFooter = () => {
    return isLoading ? (
      <View style={{ marginBottom: 100 }}>
        <ActivityIndicator />
      </View>
    ) : null;
  };
  const handleMore = () => {
    if (pageCurrent >= pagination.pageCount) {
      setNoMore(true);
    } else {
      setPageCurrent(pageCurrent + 1);
      setIsLoading(true);
    }
  };
  if (!userProfile) {
    return null;
  }
  const NoMoreData = () => {
    return noMore ? (
      <View style={{ marginBottom: 50, marginTop: 30 }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: colors.primaryText,
          }}
        >
          {" "}
          Мэдээлэл дууссан{" "}
        </Text>
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.header, flex: 1 }}>
      <Header userSearch={true} />

      <FlatList
        data={followData}
        onRefresh={onRefresh}
        refreshing={isFetching}
        ListFooterComponent={noMore ? NoMoreData : renderFooter}
        showsVerticalScrollIndicator={false}
        onEndReached={handleMore}
        initialNumToRender={5}
        onEndReachedThreshold={0}
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
