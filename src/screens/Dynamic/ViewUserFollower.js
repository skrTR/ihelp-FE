import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import Header from "../../components/Header/Header";
import DynamicFollower from "../../components/Dynamic/DynamicFollower";
import CompanyHeader from "../../components/Header/CompanyHeader";
import UserContext from "../../context/UserContext";
const ViewUserFollower = (props) => {
  const { id } = props.route.params;
  const [followerData, setFollowerData] = useState([]);
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const getFollowerData = () => {
    axios
      .get(`${api}/api/v1/follows/${id}/followers`)
      .then((res) => {
        setFollowerData(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getFollowerData();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <View style={{ backgroundColor: colors.background }}>
        {followerData.length > 0 ? (
          <FlatList
            data={followerData}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <View>
                  {item.followUser && (
                    <DynamicFollower
                      followUser={item.followUserInfo}
                      isFollowing={item.isFollowing}
                      id={item.followUser}
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

export default ViewUserFollower;

const styles = StyleSheet.create({});
