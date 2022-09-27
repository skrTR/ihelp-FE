import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import useCompanyProfile from "../../hooks/ProfileDetail/Company/useCompanyProfile";
import useCompanyJobs from "../../hooks/ProfileDetail/Company/useCompanyJobs";
import CompanyTop from "../../components/Dynamic/Company/CompanyTop";
import Border from "../../components/Border";
import CompanyAbout from "../../components/Dynamic/Company/CompanyAbout";
import CompanyPortf from "../../components/Dynamic/Company/CompanyPortf";
import Spinner from "../../components/Spinner";
import CompanyJobs from "../../components/Dynamic/Company/CompanyJobs";
import Header from "../../components/Header/Header";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
const ViewCompanyProfile = (props) => {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [companyProfile] = useCompanyProfile(id);
  const [companyJobs, loading] = useCompanyJobs(id);
  const state = useContext(UserContext);
  if (!companyProfile) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {state.isCompany ? (
          <CompanyHeader isBack={true} />
        ) : (
          <Header isBack={true} />
        )}
        {console.log(companyProfile)}
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
          id={companyProfile._id}
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
          />
          <Border />
          {companyProfile.portfolio && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewPortfolio", {
                  image1: companyProfile.portfolio.image1,
                  image2: companyProfile.portfolio.image2,
                  image3: companyProfile.portfolio.image3,
                  image4: companyProfile.portfolio.image4,
                  image5: companyProfile.portfolio.image5,
                  image6: companyProfile.portfolio.image6,
                })
              }
            >
              <>
                <CompanyPortf
                  image1={companyProfile.portfolio.image1}
                  image2={companyProfile.portfolio.image2}
                  image3={companyProfile.portfolio.image3}
                  image4={companyProfile.portfolio.image4}
                  image5={companyProfile.portfolio.image5}
                  image6={companyProfile.portfolio.image6}
                />
                <Border />
              </>
            </TouchableOpacity>
          )}

          {loading ? (
            <Spinner />
          ) : (
            companyJobs.length > 0 && (
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
                        createUserName={data.firstName}
                        createUserProfile={data.profile}
                        isEmployer={data.isEmployer}
                        isEmployee={data.isEmployee}
                        occupation={data.occupationName}
                        type={data.type}
                        salary={data.salary}
                        count={data.count}
                      />
                    </View>
                  );
                })}
              </>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewCompanyProfile;

const styles = StyleSheet.create({});
