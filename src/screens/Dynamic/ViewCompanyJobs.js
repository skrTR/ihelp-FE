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
import CompanyJobs from "../../components/Dynamic/Company/CompanyJobs";
import useCompanyAnnoucement from "../../hooks/ProfileDetail/Company/useCompanyAnnoucement";
import CompanyAnnoucements from "../../components/Dynamic/Company/CompanyAnnoucements";
import { useTheme } from "@react-navigation/native";
import Empty from "../../components/Empty";

const ViewCompanyJobs = (props) => {
  const { id } = props.route.params;
  const { colors } = useTheme();
  const [companyJobs, loading] = useCompanyJobs(id);
  const [companyAnnoucement] = useCompanyAnnoucement(id);
  const colorScheme = useColorScheme();
  const [isType, setIsType] = useState(true);
  const sorted2 =
    companyJobs && companyJobs.sort((a, b) => b.isSpecial - a.isSpecial);
  const sortedData = sorted2
    ? sorted2.sort((a, b) => b.isUrgent - a.isUrgent)
    : [];
  var sorted_meetings = companyAnnoucement
    .sort((a, b) => {
      return new Date(a.special).getTime() - new Date(b.special).getTime();
    })
    .reverse();
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
              justifyContent: "center",
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
            }}
          >
            Ажил захиалга
          </Text>
        </TouchableOpacity>
      </View>
      {isType ? (
        <>
          {sortedData.map((data) => {
            return (
              <View key={data._id}>
                <CompanyJobs data={data} id={data._id} />
              </View>
            );
          })}
        </>
      ) : (
        <>
          {sorted_meetings.map((data) => {
            return (
              <View key={data._id}>
                <CompanyAnnoucements data={data} id={data._id} />
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
