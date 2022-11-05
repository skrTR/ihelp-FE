import { ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import UserContext from "../../../context/UserContext";
import useUserProfile from "../../../hooks/ProfileDetail/User/useUserProfile";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import useCv from "../../../hooks/ProfileDetail/User/useCv";
import ProfileHeader from "../../../components/Header/ProfileHeader";
import UserProfileTop from "../../../components/Profile/User/UserProfileTop";
import UserProfileAbout from "../../../components/Profile/User/UserProfileAbout";
import UserProfileExperience from "../../../components/Profile/User/UserProfileExperience";
import UserProfileCourse from "../../../components/Profile/User/UserProfileCourse";
import Border from "../../../components/Border";
import EmptyStatus from "../../../components/Profile/User/Empty/EmptyStatus";
import EmptyData from "../../../components/Profile/User/Empty/EmptyData";
import { api } from "../../../../Constants";
import Posts from "../../../components/Network/Posts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Portfolio from "../../../components/Profile/Portfolio";
const UserProfileScreen = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [userProfile] = useUserProfile(state.userId);
  const [cv] = useCv(state.userId);
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const insents = useSafeAreaInsets();
  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
    getActivityData();
  }, [isFocused]);
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
  if (!cv || !userProfile) {
    return null;
  }
  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
      {/* Header */}
      <ProfileHeader
        notificationCount={userProfile.notification}
        firstName={userProfile.firstName}
        lastName={userProfile.lastName}
      />
      {/* ProfileDetails */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover && Profile && Wallet && FirstName && Anket && setting && follower counts */}
        {/* {profileLoading && <Spinner />} */}
        <UserProfileTop userProfile={userProfile} cv={cv} />
        <View style={{ bottom: 10 }}>
          {!userProfile.profession && (
            <EmptyStatus
              onPress={() =>
                navigation.navigate("EditStatusModal", {
                  data: userProfile,
                  cvData: cv,
                })
              }
            />
          )}
          {userProfile.about && <UserProfileAbout about={userProfile.about} />}
          <Border />
          {cv.experience.length === 0 ? (
            <EmptyData
              title={"Tуршлага"}
              inTitle={"Ажлын туршлага?"}
              description={
                "Та ажлын туршлагаа оруулснаар ажил олгогч нарт өөрийгөө үнэлүүлэх боломжтой"
              }
              icon={"bar-chart-outline"}
              id={userProfile._id}
              screenDetail={"CreateCvScreen"}
            />
          ) : (
            <UserProfileExperience data={cv.experience} />
          )}
          {cv.course.length === 0 ? (
            <>
              <Border />
              <EmptyData
                title={"Боловсрол"}
                inTitle={"Боловсрол?"}
                description={
                  "Та өөрийн боловсролын талаар мэдээлэл оруулснаар суурь чадвараа таниулах боломжтой"
                }
                icon={"school-outline"}
                id={userProfile._id}
                screenDetail={"CreateCvScreen"}
              />
            </>
          ) : (
            <UserProfileCourse data={cv.course} />
          )}
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              marginVertical: 10,
            }}
          />
          {userProfile.portfolio && userProfile.portfolio.image1 !== "1" ? (
            <Portfolio
              image1={userProfile.portfolio.image1}
              image2={userProfile.portfolio.image2}
              image3={userProfile.portfolio.image3}
              image4={userProfile.portfolio.image4}
              image5={userProfile.portfolio.image5}
              image6={userProfile.portfolio.image6}
              isUser={true}
            />
          ) : (
            <EmptyData
              title={"Зурган танилцуулга"}
              inTitle={"Зураг?"}
              description={"Та өөрийн хийсэн ажлын зургийг оруулах боломжтой"}
              icon={"camera-reverse-outline"}
              id={userProfile._id}
              screenDetail={"PortfolioDetail"}
            />
          )}
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 10,
            }}
          />
          {activityData.length > 0 ? (
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
          ) : null}
        </View>
        <View style={{ marginBottom: 200 }} />
      </ScrollView>
      <LinearGradient
        colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        style={{
          position: "absolute",
          bottom: 60,
          alignSelf: "flex-end",
          right: 10,
          padding: 1,
          borderRadius: 34,
          opacity: 0.8,
        }}
      >
        <Feather
          name="plus"
          size={64}
          color="white"
          onPress={() => navigation.navigate("AddPostScreen")}
        />
      </LinearGradient>
    </View>
  );
};

export default UserProfileScreen;
