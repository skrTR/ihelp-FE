import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import useCv from "../../hooks/ProfileDetail/User/useCv";
import UserProfileTop from "../../components/Dynamic/User/UserProfileTop";
import UserProfileAbout from "../../components/Dynamic/User/UserProfileAbout";
import UserProfileExperience from "../../components/Dynamic/User/UserProfileExperience";
import UserProfileCourse from "../../components/Dynamic/User/UserProfileCourse";
import Header from "../../components/Header/Header";
import Border from "../../components/Border";
import axios from "axios";
import { api } from "../../../Constants";
import Posts from "../../components/Network/Posts";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Portfolio from "../../components/Profile/Portfolio";
const ViewUserProfile = (props) => {
  const { id } = props.route.params;
  const [userProfile, profileLoading] = useUserProfile(id);
  const [cv, cvLoading] = useCv(id);
  const { colors } = useTheme();
  const [activityData, setActivityData] = useState([]);
  const state = useContext(UserContext);
  const insents = useSafeAreaInsets();
  const getActivityData = () => {
    axios
      .get(`${api}/api/v1/posts/${id}/user`)
      .then((res) => {
        setActivityData(res.data.data);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };

  useEffect(() => {
    getActivityData();
  }, []);
  if (!cv || !userProfile) {
    return null;
  }
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.header, paddingTop: insents.top }}
    >
      {/* Header */}
      {state.isCompany ? (
        <CompanyHeader isBack={true} />
      ) : (
        <Header isBack={true} />
      )}

      {/* ProfileDetails */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover && Profile && Wallet && FirstName && Anket && setting && follower counts */}
        <UserProfileTop
          userProfile={userProfile}
          isFollowing={userProfile.isFollowing}
          status={`${userProfile.profession} ${userProfile.workingCompany}`}
        />
        <View style={{ bottom: 10 }}>
          {userProfile.about && <UserProfileAbout about={userProfile.about} />}
          <Border />
          {cv.experience.length > 0 && (
            <UserProfileExperience data={cv.experience} />
          )}
          {cv.course.length > 0 && <UserProfileCourse data={cv.course} />}
          {userProfile.portfolio && userProfile.portfolio.image1 !== "1" ? (
            <Portfolio
              image1={userProfile.portfolio.image1}
              image2={userProfile.portfolio.image2}
              image3={userProfile.portfolio.image3}
              image4={userProfile.portfolio.image4}
              image5={userProfile.portfolio.image5}
              image6={userProfile.portfolio.image6}
            />
          ) : null}

          {activityData.length > 0 && (
            <>
              <Text
                style={{
                  color: colors.primaryText,
                  marginHorizontal: 10,
                  fontFamily: "Sf-bold",
                  fontSize: 20,
                }}
              >
                Оруулсан нийтлэл
              </Text>
              {activityData.map((item) => {
                return (
                  <View key={item._id} style={{}}>
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
                        sharedUserLastName={
                          item.shareInfo && item.shareInfo.lastName
                        }
                        sharedUserProfile={
                          item.shareInfo && item.shareInfo.profile
                        }
                        sharedId={item.shareInfo && item.shareInfo.createUser}
                        sharedCreatedAt={
                          item.shareInfo && item.shareInfo.createdAt
                        }
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
              })}
            </>
          )}
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewUserProfile;
