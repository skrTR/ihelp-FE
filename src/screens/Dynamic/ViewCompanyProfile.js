import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import useCompanyProfile from "../../hooks/ProfileDetail/Company/useCompanyProfile";
import useCompanyJobs from "../../hooks/ProfileDetail/Company/useCompanyJobs";
import CompanyTop from "../../components/Dynamic/Company/CompanyTop";
import Border from "../../components/Border";
import CompanyAbout from "../../components/Dynamic/Company/CompanyAbout";
import CompanyJobs from "../../components/Dynamic/Company/CompanyJobs";
import Header from "../../components/Header/Header";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useCompanyAnnoucement from "../../hooks/ProfileDetail/Company/useCompanyAnnoucement";
import CompanyAnnoucements from "../../components/Dynamic/Company/CompanyAnnoucements";
import Empty from "../../components/Empty";
import Portfolio from "../../components/Profile/Portfolio";
const ViewCompanyProfile = (props) => {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isType, setIsType] = useState(true);
  const [companyProfile] = useCompanyProfile(id);
  const [companyJobs, loading] = useCompanyJobs(id);
  const [companyAnnoucement] = useCompanyAnnoucement(id);
  const colorScheme = useColorScheme();
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);
  const sorted2 =
    companyJobs && companyJobs.sort((a, b) => b.isSpecial - a.isSpecial);
  const sortedData = sorted2
    ? sorted2.sort((a, b) => b.isUrgent - a.isUrgent)
    : [];
  if (!companyProfile) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: colors.header,
        paddingTop: insents.top,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {state.isCompany ? (
          <CompanyHeader isBack={true} />
        ) : (
          <Header isBack={true} />
        )}
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
            <>
              <Portfolio
                image1={companyProfile.portfolio.image1}
                image2={companyProfile.portfolio.image2}
                image3={companyProfile.portfolio.image3}
                image4={companyProfile.portfolio.image4}
                image5={companyProfile.portfolio.image5}
                image6={companyProfile.portfolio.image6}
              />
              <Border />
            </>
            // </TouchableOpacity>
          )}
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
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              accessibilityRole="button"
              style={{
                flex: 1,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor:
                  colorScheme === "dark"
                    ? !isType
                      ? colors.background
                      : "white"
                    : colorScheme === "light" && isType
                    ? colors.background
                    : "#FFB6C1",
                justifyContent: "center",
              }}
              onPress={() => setIsType(true)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 30,
                  color:
                    colorScheme === "dark"
                      ? isType
                        ? colors.background
                        : colors.primaryText
                      : colorScheme === "light" && !isType
                      ? "black"
                      : colors.primaryText,

                  textAlign: "center",
                }}
              >
                Ажлын байр
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setIsType(false)}
              style={{
                flex: 1,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor:
                  colorScheme === "dark"
                    ? isType
                      ? colors.background
                      : "white"
                    : colorScheme === "light" && !isType
                    ? colors.background
                    : "#FFB6C1",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 30,
                  color:
                    colorScheme === "dark"
                      ? !isType
                        ? colors.background
                        : colors.primaryText
                      : colorScheme === "light" && isType
                      ? "black"
                      : colors.primaryText,

                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Ажил захиалга
              </Text>
            </TouchableOpacity>
          </View>
          {isType ? (
            <>
              {companyJobs.length > 0 && (
                <>
                  {sortedData.map((data) => {
                    return (
                      <View key={data._id}>
                        <CompanyJobs data={data} id={data._id} />
                      </View>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            // <>
            //   {companyAnnoucement.map((data) => {
            //     return (
            //       <View key={data._id}>
            //         <CompanyAnnoucements
            //           id={data._id}
            //           createUserName={data.firstName}
            //           createUserProfile={data.profile}
            //           isEmployer={data.isEmployer}
            //           isEmployee={data.isEmployee}
            //           occupation={data.occupationName}
            //           type={data.do}
            //           salary={data.price}
            //           order={data.order}
            //         />
            //       </View>
            //     );
            //   })}
            // </>
            <Empty text={"Тун удахгүй"} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewCompanyProfile;

const styles = StyleSheet.create({});
