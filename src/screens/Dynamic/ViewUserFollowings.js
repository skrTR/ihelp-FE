import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import DynamicFollowing from "../../components/Dynamic/DynamicFollowing";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import UserContext from "../../context/UserContext";
const ViewUserFollowings = (props) => {
  const { id } = props.route.params;
  const state = useContext(UserContext);
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
  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <View style={{ backgroundColor: colors.background }}>
        {followingData.length > 0 ? (
          <FlatList
            data={followingData}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
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
            }}
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
