import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useTheme } from "@react-navigation/native";

const PostLikeUser = (props) => {
  const { postId } = props.route.params;
  const [likeUsers, setLikeUsers] = useState([]);
  const { colors } = useTheme();
  const getLikeUsers = () => {
    axios
      .get(`${api}/api/v1/likes/${postId}/post?select=createUser&limit=1000`)
      .then((res) => {
        setLikeUsers(res.data.data);
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
          console.log(item);
          return (
            <>
              {item.createUser && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={{ uri: `${api}/upload/${item.createUser.profile}` }}
                    style={{ width: 50, height: 50, borderRadius: 20 }}
                  />
                  <Text style={{ color: colors.primaryText, marginLeft: 10 }}>
                    {item.createUser.lastName} {item.createUser.firstName}
                  </Text>
                </View>
              )}
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
      <Text>PostLikeUser</Text>
    </View>
  );
};

export default PostLikeUser;

const styles = StyleSheet.create({});
