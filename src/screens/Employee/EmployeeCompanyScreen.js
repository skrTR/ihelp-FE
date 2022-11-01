import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import useNormalWork from "../../hooks/EmployeeHook/useNormalWork";
import useSpecialWork from "../../hooks/EmployeeHook/useSpecialWork";
import SpecialWork from "../../components/Employee/SpecialWork";
import NormalWork from "../../components/Employee/NormalWork";
import axios from "axios";
import { api } from "../../../Constants";

const EmployeeCompanyScreen = () => {
  const [specialWork, refreshing, setRefreshing] =
    useSpecialWork("Ажил захиалагч");
  const [normalWork] = useNormalWork("Ажил захиалагч");

  const handleRefresh = () => {
    setRefreshing(true);
  };
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {specialWork.map((data) => {
              return (
                <View key={data._id}>
                  <SpecialWork
                    id={data._id}
                    createUserId={data.createUser}
                    createUserName={data.firstName}
                    createUserProfile={data.profile}
                    isEmployer={data.isEmployer}
                    isEmployee={data.isEmployee}
                    occupation={data.occupationName}
                    salary={data.price}
                    job={data.do}
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
            <NormalWork
              id={item._id}
              createUserName={item.firstName}
              createUserProfile={item.profile}
              isEmployer={item.isEmployer}
              isEmployee={item.isEmployee}
              occupation={item.occupationName}
              price={item.price}
              job={item.do}
              createUserId={item.createUser}
              order={item.order}
            />
          );
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0}
      />
    </>
  );
};

export default EmployeeCompanyScreen;

const styles = StyleSheet.create({});
