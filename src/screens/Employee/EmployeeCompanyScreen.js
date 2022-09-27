import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import useSpecialCompany from "../../hooks/EmployeeHook/useSpecialCompany";
import useNormalCompany from "../../hooks/EmployeeHook/useNormalCompany";
import SpecialCompany from "../../components/Employee/SpecialCompany";
import NormalCompany from "../../components/Employee/NormalCompany";

const EmployeeCompanyScreen = () => {
  const [specialCompany] = useSpecialCompany();
  const [normalCompany] = useNormalCompany();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {specialCompany.map((data) => {
            return (
              <View>
                <SpecialCompany data={data} isFollowing={data.isFollowing} />
              </View>
            );
          })}
        </>
      }
      data={normalCompany}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        return <NormalCompany data={item} isFollowing={item.isFollowing} />;
      }}
    />
  );
};

export default EmployeeCompanyScreen;

const styles = StyleSheet.create({});
