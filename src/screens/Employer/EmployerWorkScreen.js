import { FlatList, View } from "react-native";
import React from "react";
import useUrgentWork from "../../hooks/EmployerHook/useUrgentWork";
import useNormalWork from "../../hooks/EmployerHook/useNormalWork";
import useSpecialWork from "../../hooks/EmployerHook/useSpecialWork";
import UrgentWork from "../../components/Employer/UrgentWork";
import SpecialWork from "../../components/Employer/SpecialWork";
import NormalWork from "../../components/Employer/NormalWork";

const EmployerWorkScreen = () => {
  const [urgentWork, urgentError] = useUrgentWork();
  const [specialWork] = useSpecialWork();
  const [normalWork, normalError] = useNormalWork();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ height: "100%" }}
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
                  createUserId={data.createUser}
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
                  createUserId={data.createUser}
                  special={data.special}
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
              createUserId={item.createUser}
              order={item.order}
            />
          </>
        );
      }}
    />
  );
};

export default EmployerWorkScreen;
