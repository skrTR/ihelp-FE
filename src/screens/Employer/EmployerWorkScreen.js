import { View } from "react-native";
import React from "react";
import useUrgentWork from "../../hooks/EmployerHook/useUrgentWork";
import useNormalWork from "../../hooks/EmployerHook/useNormalWork";
import useSpecialWork from "../../hooks/EmployerHook/useSpecialWork";
import UrgentWork from "../../components/Employer/UrgentWork";
import SpecialWork from "../../components/Employer/SpecialWork";
import NormalWork from "../../components/Employer/NormalWork";
import { FlashList } from "@shopify/flash-list";

const EmployerWorkScreen = () => {
  const [urgentWork, refreshing, setRefreshing] = useUrgentWork();
  const [specialWork] = useSpecialWork();
  const [normalWork] = useNormalWork();

  const handleRefresh = () => {
    setRefreshing(true);
  };
  return (
    <FlashList
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
                  createUserId={data.createUser}
                  title={data.title}
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
                  title={data.title}
                />
              </View>
            );
          })}
        </>
      }
      data={normalWork}
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
              title={item.title}
            />
          </>
        );
      }}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReachedThreshold={0}
      ListFooterComponent={<View style={{ marginBottom: 200 }} />}
      estimatedItemSize={590}
    />
  );
};

export default EmployerWorkScreen;
