import {
  StyleSheet,
  Text,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import useUrgentWork from "../../hooks/EmployerHook/useUrgentWork";
import useSpecialWork from "../../hooks/EmployerHook/useSpecialWork";
import useNormalWork from "../../hooks/EmployerHook/useNormalWork";
import useSpecialCompany from "../../hooks/EmployerHook/useSpecialCompany";
import useNormalCompany from "../../hooks/EmployerHook/useNormalCompany";
import Header from "../../components/Header/Header";
import CompanyHeader from "../../components/Header/CompanyHeader";
import SpecialCompany from "../../components/Employer/SpecialCompany";
import NormalCompany from "../../components/Employer/NormalCompany";
import UrgentWork from "../../components/Employer/UrgentWork";
import SpecialWork from "../../components/Employer/SpecialWork";
import NormalWork from "../../components/Employer/NormalWork";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { api } from "../../../Constants";
const EmployerScreen = () => {
  const [urgentWork, urgentError] = useUrgentWork();
  const [specialWork] = useSpecialWork();
  const [normalWork, normalError] = useNormalWork();
  const [specialCompany, specialCompanyError, specialCompanyLoading] =
    useSpecialCompany();
  const [normalCompany] = useNormalCompany();
  const [isEnabled, setIsEnabled] = useState(false);
  const { colors } = useTheme();
  const state = useContext(UserContext);
  useEffect(() => {
    if (state.isCompany) {
      axios.get(`${api}/api/v1/profiles/${state.companyId}`).catch((err) => {
        const message = err.response.data.error.message;
        console.log(err.response.data.error.message);
        if (message === `${state.companyId} ID-тэй компани байхгүй!`) {
          state.logout();
        }
      });
    } else if (!state.isCompany) {
      axios.get(`${api}/api/v1/cvs/${state.userId}`).catch((err) => {
        const message = err.response.data.error.message;
        console.log(err.response.data.error.message);
        if (message === `${state.userId} ID-тэй хэрэглэгч байхгүй!`) {
          state.logout();
        }
      });
    }
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#141414", marginBottom: 115 }}>
      {state.isCompany ? (
        <CompanyHeader isEmployerAddWork={true} isSearch={true} />
      ) : (
        <Header isEmployerSaved={true} />
      )}

      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          paddingTop: 5,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: isEnabled ? colors.background : "white",
          }}
          onPress={() => setIsEnabled(false)}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: 30,
              color: isEnabled ? colors.primaryText : "black",
            }}
          >
            Ажлын зар
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: isEnabled ? "white" : colors.background,
          }}
          onPress={() => setIsEnabled(true)}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: 40,
              color: isEnabled ? colors.background : colors.primaryText,
            }}
          >
            Koмпани
          </Text>
        </TouchableOpacity>
      </View>
      {isEnabled ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {specialCompany.map((data) => {
                return (
                  <View key={data._id}>
                    <SpecialCompany
                      data={data}
                      error={specialCompanyError}
                      loading={specialCompanyLoading}
                      isFollowing={data.isFollowing}
                    />
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
      ) : (
        <>
          {normalError && <Text> aldaa! {urgentError} </Text>}
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
        </>
      )}
    </SafeAreaView>
  );
};

export default EmployerScreen;

const styles = StyleSheet.create({});
