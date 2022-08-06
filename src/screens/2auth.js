import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/UserContext";

const SplashScreen = () => {
  const state = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((data) => {
        if (data !== null) {
          const user = JSON.parse(data);
          state.setToken(user.token);
          state.setPhone(user.phone);
          state.setPassword(user.password);
          state.setUserId(user.userId);
          state.setIsCompany(user.isCompany);
          state.setIsLoggedIn(true);
        }
        state.setIsLoading(false);
      })
      .catch((err) =>
        console.log("Токенийг утаснаас уншиж чадсангүй. Алдаа : " + err.message)
      );

    AsyncStorage.getItem("company")
      .then((data) => {
        if (data !== null) {
          const company = JSON.parse(data);
          state.setCompanyToken(company.companyToken);
          state.setEmail(company.email);
          state.setCompanyPassword(company.companyPassword);
          state.setIsCompany(company.isCompany);
          state.setCompanyId(company.companyId);
          state.setIsLoggedIn(true);
        }

        state.setIsLoading(false);
      })
      .catch((err) =>
        console.log("Токенийг утаснаас уншиж чадсангүй. Алдаа : " + err.message)
      );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="gray" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          top: 20,
        }}
      >
        Түр хүлээнэ үү...
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
