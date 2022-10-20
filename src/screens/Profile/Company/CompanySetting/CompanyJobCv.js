import { StyleSheet, ScrollView, View } from "react-native";
import React, { useContext } from "react";
import useCompanyJobs from "../../../../hooks/ProfileDetail/Company/useCompanyJobs";
import UserContext from "../../../../context/UserContext";
import CompanyJobs from "../../../../components/Profile/Company/CompanyJobs";

const CompanyJobCv = () => {
  const state = useContext(UserContext);
  const [companyJobs, loading] = useCompanyJobs(state.companyId);
  const sorted2 =
    companyJobs && companyJobs.sort((a, b) => b.isSpecial - a.isSpecial);
  const sortedData = sorted2
    ? sorted2.sort((a, b) => b.isUrgent - a.isUrgent)
    : [];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {sortedData.map((data) => {
        return (
          <View key={data._id}>
            <CompanyJobs data={data} needApply={true} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CompanyJobCv;

const styles = StyleSheet.create({});
