import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import DynamicFollowing from "../../components/Dynamic/DynamicFollowing";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import BigList from "react-native-big-list";
const ViewUserFollowings = (props) => {
  const { id } = props.route.params;
  const [followingData, setFollowingData] = useState([]);
  const { colors } = useTheme();
  const getFollowerData = () => {
    axios
      .get(`${api}/api/v1/follows/${id}/cv`)
      .then((res) => {
        setFollowingData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        alert(`${err} aaa`);
      });
  };

  useEffect(() => {
    getFollowerData();
  }, []);
  const renderItem = ({ item, index }) => (
    <View>
      {item.followUser && (
        <DynamicFollowing
          followUser={item.followUserInfo}
          id={item.followUser}
          isFollowing={item.isFollowing}
        />
      )}
    </View>
  );
  const renderFooter = () => <View style={{ marginBottom: 100 }} />;

  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <View style={{ backgroundColor: colors.background }}>
        {followingData.length > 0 ? (
          <BigList
            data={followingData}
            renderItem={renderItem}
            itemHeight={65}
            footerHeight={100}
            renderFooter={renderFooter}
          />
        ) : (
          <Empty text="Таныг хүн дагаагүй байна" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewUserFollowings;

const styles = StyleSheet.create({});
