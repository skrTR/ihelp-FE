import { StyleSheet, ScrollView, View } from "react-native";
import React, { useContext } from "react";
import useCompanyJobs from "../../../../hooks/ProfileDetail/Company/useCompanyJobs";
import UserContext from "../../../../context/UserContext";
import CompanyJobs from "../../../../components/Profile/Company/CompanyJobs";

const CompanyCreatedWork = () => {
  const state = useContext(UserContext);
  const [companyJobs, errorMessage, loading] = useCompanyJobs(state.companyId);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {companyJobs.map((data) => {
        return (
          <View key={data._id}>
            <CompanyJobs
              id={data._id}
              createUser={data.createUser}
              categoryName={data.comCategoryName}
              profile={data.profile}
              firstName={data.firstName}
              occupation={data.occupationName}
              type={data.type}
              salary={data.salary}
              count={data.count}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CompanyCreatedWork;

const styles = StyleSheet.create({});
