import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useTheme } from "@react-navigation/native";
import moment from "moment";

const PostLikeUser = (props) => {
  const { postId } = props.route.params;
  const [likeUsers, setLikeUsers] = useState([]);
  const { colors } = useTheme();
  const getLikeUsers = () => {
    axios
      .get(
        `${api}/api/v1/likes/${postId}/post?limit=1000&select=createdAt firstName lastName profile`
      )
      .then((res) => {
        setLikeUsers(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getLikeUsers();
  }, []);
  return (
    <View>
      <FlatList
        data={likeUsers}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={{ uri: `${api}/upload/${item.profile}` }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <Text style={{ color: colors.primaryText, marginLeft: 10 }}>
                    {item.lastName} {item.firstName}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: "200",
                    color: colors.secondaryText,
                    marginRight: 5,
                  }}
                >
                  {moment(item.createdAt).fromNow()}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginTop: 10,
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default PostLikeUser;

const styles = StyleSheet.create({});
