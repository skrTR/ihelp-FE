import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import useSpecialCompany from "../../hooks/EmployerHook/useSpecialCompany";
import useNormalCompany from "../../hooks/EmployerHook/useNormalCompany";
import SpecialCompany from "../../components/Employer/SpecialCompany";
import NormalCompany from "../../components/Employer/NormalCompany";

const EmployerCompanyScreen = () => {
  const [specialCompany] = useSpecialCompany();
  const [normalCompany] = useNormalCompany();
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {specialCompany.map((data) => {
              return (
                <View key={data._id}>
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
        ListFooterComponent={<View style={{ marginBottom: 200 }} />}
      />
    </>
  );
};

export default EmployerCompanyScreen;

const styles = StyleSheet.create({});
