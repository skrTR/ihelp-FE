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
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const NetworkingScreen = () => {
  const state = useContext(UserContext);
  const [userProfile] = useUserProfile(state.userId);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [boostPage, setBoostPage] = useState(1);
  const insents = useSafeAreaInsets();
  useEffect(() => {
    makeRequest();
  }, [page, refreshing]);
  const makeRequest = async () => {
    const apiUrl = `${api}/api/v1/posts/${state.userId}/following?page=${page}&sort=-createdAt&limit=3`;
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        let datas = resJson.data;
        setData(data.concat(datas));
        setLoading(false);
        setRefreshing(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setData([]);
    setPage(1);
  };
  const listFooterRender = () => {
    loading ? <ActivityIndicator /> : null;
  };
  const handleMore = () => {
    setPage(page + 1);
    setLoading(true);
  };
  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
      <Header userSearch={true} />
      <FlatList
        data={data}
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
        onEndReachedThreshold={0}
      />
    </View>
  );
};

export default NetworkingScreen;
