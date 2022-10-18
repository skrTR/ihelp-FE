import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import Posts from "../../../../components/Network/Posts";

const NetworkingBoost = () => {
  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
    getActivityData();
  }, []);
  const getActivityData = () => {
    axios
      .get(`${api}/api/v1/posts/cv`)
      .then((res) => {
        setActivityData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView>
      {activityData.map((item) => {
        return (
          <View key={item._id} style={{}}>
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
              sharedUserFirstName={item.shareInfo && item.shareInfo.firstName}
              sharedUserLastName={item.shareInfo && item.shareInfo.lastName}
              sharedUserProfile={item.shareInfo && item.shareInfo.profile}
              sharedId={item.shareInfo && item.shareInfo.createUser}
              sharedCreatedAt={item.shareInfo && item.shareInfo.createdAt}
              sharedBody={item.shareInfo && item.shareInfo.body}
              sharedPhoto={item.shareInfo && item.shareInfo.photo}
              sharedUserProfession={item.shareInfo && item.shareInfo.profession}
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
          </View>
        );
      })}
    </ScrollView>
  );
};

export default NetworkingBoost;

const styles = StyleSheet.create({});
