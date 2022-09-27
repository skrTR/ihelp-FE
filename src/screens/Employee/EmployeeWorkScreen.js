import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import useUrgentWork from "../../hooks/EmployeeHook/useUrgentWork";
import useNormalWork from "../../hooks/EmployeeHook/useNormalWork";
import useSpecialWork from "../../hooks/EmployeeHook/useSpecialWork";
import UrgentWork from "../../components/Employee/UrgentWork";
import SpecialWork from "../../components/Employee/SpecialWork";
import NormalWork from "../../components/Employee/NormalWork";

const EmployeeWorkScreen = () => {
  const [urgentWork] = useUrgentWork();
  const [specialWork] = useSpecialWork();
  const [normalWork] = useNormalWork();
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
                  urgent={data.urgent}
                  salary={data.price}
                  job={data.do}
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
                  salary={data.price}
                  job={data.do}
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
          <NormalWork
            id={item._id}
            createUserName={item.firstName}
            createUserProfile={item.profile}
            isEmployer={item.isEmployer}
            isEmployee={item.isEmployee}
            occupation={item.occupationName}
            price={item.price}
            job={item.do}
          />
        );
      }}
    />
  );
};

export default EmployeeWorkScreen;

const styles = StyleSheet.create({});
