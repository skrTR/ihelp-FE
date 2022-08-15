import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import UserContext from "../../../context/UserContext";
import useCompanyProfile from "../../../hooks/ProfileDetail/Company/useCompanyProfile";
import useCompanyJobs from "../../../hooks/ProfileDetail/Company/useCompanyJobs";
import ProfileHeader from "../../../components/Header/ProfileHeader";
import CompanyTop from "../../../components/Profile/Company/CompanyTop";
import Border from "../../../components/Border";
import CompanyAbout from "../../../components/Profile/Company/CompanyAbout";
import CompanyPortf from "../../../components/Profile/Company/CompanyPortf";
import Spinner from "../../../components/Spinner";
import CompanyJobs from "../../../components/Profile/Company/CompanyJobs";
import EmptyData from "../../../components/Profile/User/Empty/EmptyData";
const CompanyProfileScreen = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [companyProfile] = useCompanyProfile(state.companyId);
  const [companyJobs, loading] = useCompanyJobs(state.companyId);
  if (!companyProfile) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <ProfileHeader
        notificationCount={companyProfile.notification}
        firstName={companyProfile.firstName}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CompanyTop
          cover={companyProfile.cover}
          profile={companyProfile.profile}
          point={companyProfile.point}
          name={companyProfile.firstName}
          category={companyProfile.categoryName}
          jobCount={companyProfile.jobNumber}
          followerCount={companyProfile.follower}
          followingCount={companyProfile.following}
          isFollow={companyProfile.isFollowing}
          data={companyProfile}
        />
        <View style={{ bottom: 30 }}>
          <Border />
          <CompanyAbout
            about={companyProfile.about}
            web={companyProfile.web}
            phone={companyProfile.phone}
            workerNumber={companyProfile.employerNumber}
            createYear={companyProfile.createYear}
            location={companyProfile.location}
            data={companyProfile}
          />
          <Border />
          {companyProfile.portfolio ? (
            <CompanyPortf
              image1={companyProfile.portfolio.image1}
              image2={companyProfile.portfolio.image2}
              image3={companyProfile.portfolio.image3}
              image4={companyProfile.portfolio.image4}
              image5={companyProfile.portfolio.image5}
              image6={companyProfile.portfolio.image6}
            />
          ) : (
            <EmptyData
              title={"Портфолио"}
              inTitle={"Портфолио?"}
              description={"Та өөрийн хийсэн ажлын зургийг оруулах боломжтой"}
              icon={"school-outline"}
              id={companyProfile._id}
              screenDetail={"AddPortfolio"}
            />
          )}

          <Border />
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-bold",
                  fontSize: 20,
                  marginHorizontal: 20,
                  marginVertical: 15,
                }}
              >
                Ажлын зарууд
              </Text>
              {companyJobs.map((data) => {
                return (
                  <View key={data._id}>
                    <CompanyJobs
                      id={data._id}
                      createUser={data.createUser}
                      firstName={data.firstName}
                      profile={data.profile}
                      occupation={data.occupationName}
                      type={data.type}
                      salary={data.salary}
                      count={data.count}
                      categoryName={data.comCategoryName}
                    />
                  </View>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyProfileScreen;

const styles = StyleSheet.create({});
