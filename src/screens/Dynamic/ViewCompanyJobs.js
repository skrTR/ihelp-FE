import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useCompanyJobs from "../../hooks/ProfileDetail/Company/useCompanyJobs";
import CompanyJobs from "../../components/Profile/Company/CompanyJobs";
import useCompanyAnnoucement from "../../hooks/ProfileDetail/Company/useCompanyAnnoucement";
import CompanyAnnoucements from "../../components/Dynamic/Company/CompanyAnnoucements";
import { useTheme } from "@react-navigation/native";

const ViewCompanyJobs = (props) => {
  const { id } = props.route.params;
  const { colors } = useTheme();
  const [companyJobs, loading] = useCompanyJobs(id);
  const [companyAnnoucement] = useCompanyAnnoucement(id);
  const colorScheme = useColorScheme();
  const [isType, setIsType] = useState(true);
  return (
    <ScrollView>
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
            Ажилтан авна
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
            }}
          >
            Ажил авна
          </Text>
        </TouchableOpacity>
      </View>
      {isType ? (
        <>
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
                  order={data.order}
                />
              </View>
            );
          })}
        </>
      ) : (
        <>
          {companyAnnoucement.map((data) => {
            return (
              <View key={data._id}>
                <CompanyAnnoucements
                  id={data._id}
                  createUserName={data.firstName}
                  createUserProfile={data.profile}
                  isEmployer={data.isEmployer}
                  isEmployee={data.isEmployee}
                  occupation={data.occupationName}
                  type={data.do}
                  salary={data.price}
                  order={data.order}
                />
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

export default ViewCompanyJobs;

const styles = StyleSheet.create({});
