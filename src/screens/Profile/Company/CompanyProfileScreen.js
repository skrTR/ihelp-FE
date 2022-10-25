import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import UserContext from "../../../context/UserContext";
import useCompanyProfile from "../../../hooks/ProfileDetail/Company/useCompanyProfile";
import useCompanyJobs from "../../../hooks/ProfileDetail/Company/useCompanyJobs";
import ProfileHeader from "../../../components/Header/ProfileHeader";
import CompanyTop from "../../../components/Profile/Company/CompanyTop";
import Border from "../../../components/Border";
import CompanyAbout from "../../../components/Profile/Company/CompanyAbout";
import Spinner from "../../../components/Spinner";
import CompanyJobs from "../../../components/Profile/Company/CompanyJobs";
import EmptyData from "../../../components/Profile/User/Empty/EmptyData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Portfolio from "../../../components/Profile/Portfolio";
import Loading from "../../../components/Loading";
const CompanyProfileScreen = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [companyProfile] = useCompanyProfile(state.companyId);
  const [companyJobs, loading] = useCompanyJobs(state.companyId);
  const insents = useSafeAreaInsets();
  const sorted2 =
    companyJobs && companyJobs.sort((a, b) => b.isSpecial - a.isSpecial);
  const sortedData = sorted2
    ? sorted2.sort((a, b) => b.isUrgent - a.isUrgent)
    : [];
  if (!companyProfile) {
    return null;
  }

  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
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
          jobCount={
            companyProfile.jobNumber + companyProfile.announcementNumber
          }
          followerCount={companyProfile.follower}
          followingCount={companyProfile.following}
          isFollow={companyProfile.isFollowing}
          data={companyProfile}
          isApproved={companyProfile.isApproved}
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
          {companyProfile.portfolio &&
          companyProfile.portfolio.image1 !== "1" ? (
            <Portfolio
              image1={companyProfile.portfolio.image1}
              image2={companyProfile.portfolio.image2}
              image3={companyProfile.portfolio.image3}
              image4={companyProfile.portfolio.image4}
              image5={companyProfile.portfolio.image5}
              image6={companyProfile.portfolio.image6}
              isCompany={true}
            />
          ) : (
            <EmptyData
              title={"Зураг"}
              inTitle={"Зурагт танилцуулга?"}
              description={"Та өөрийн хийсэн ажлын зургийг оруулах боломжтой"}
              icon={"school-outline"}
              id={companyProfile._id}
              screenDetail={"PortfolioDetail"}
            />
          )}

          <Border />
          {loading ? (
            <Loading />
          ) : (
            <>
              {companyJobs.length > 0 && (
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
              )}

              {sortedData.map((data) => {
                return (
                  <View key={data._id}>
                    <CompanyJobs data={data} />
                  </View>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CompanyProfileScreen;

const styles = StyleSheet.create({});
