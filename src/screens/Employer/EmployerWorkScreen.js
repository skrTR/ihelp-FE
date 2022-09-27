import { FlatList, View } from "react-native";
import React from "react";
import useUrgentWork from "../../hooks/EmployerHook/useUrgentWork";
import useSpecialCompany from "../../hooks/EmployerHook/useSpecialCompany";
import useNormalCompany from "../../hooks/EmployerHook/useNormalCompany";
import UrgentWork from "../../components/Employer/UrgentWork";
import SpecialWork from "../../components/Employer/SpecialWork";
import NormalWork from "../../components/Employer/NormalWork";

const EmployerWorkScreen = () => {
  const [urgentWork, urgentError] = useUrgentWork();
  const [specialWork] = useSpecialCompany();
  const [normalWork, normalError] = useNormalCompany();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {urgentWork.map((data) => {
            return (
              <View key={data._id}>
                <UrgentWork
                  id={data._id}
                  createUserName={data.firstName}
                  createUserProfile={data.profile}
                  isEmployer={data.isEmployer}
                  isEmployee={data.isEmployee}
                  occupation={data.occupationName}
                  type={data.type}
                  urgent={data.urgent}
                  salary={data.salary}
                  isSentCv={data.isSentCv}
                />
              </View>
            );
          })}
          {specialWork.map((data) => {
            return (
              <View key={data._id}>
                <SpecialWork
                  id={data._id}
                  createUserName={data.firstName}
                  createUserProfile={data.profile}
                  isEmployer={data.isEmployer}
                  isEmployee={data.isEmployee}
                  occupation={data.occupationName}
                  type={data.type}
                  salary={data.salary}
                />
              </View>
            );
          })}
        </>
      }
      data={normalWork}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        return (
          <>
            <NormalWork
              id={item._id}
              createUserName={item.firstName}
              createUserProfile={item.profile}
              isEmployer={item.isEmployer}
              isEmployee={item.isEmployee}
              occupation={item.occupationName}
              type={item.type}
              salary={item.salary}
            />
          </>
        );
      }}
    />
  );
};

export default EmployerWorkScreen;
