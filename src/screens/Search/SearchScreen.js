import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header/Header";
import { useNavigation, useTheme } from "@react-navigation/native";
import CompanyHeader from "../../components/Header/CompanyHeader";

const SearchScreen = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.header }}>
        {state.isCompany ? (
          <CompanyHeader isNotification={true} isFollowedCompany={true} />
        ) : (
          <Header isFollowedCompany={true} />
        )}
        <ScrollView style={{ backgroundColor: colors.background }}>
          <TouchableOpacity
            style={{
              padding: 10,

              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.border,
            }}
            onPress={() => navigation.navigate("UserSearch")}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {" "}
              Хэрэглэгч хайх{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,

              borderWidth: 1,
              borderRadius: 20,
              marginVertical: 10,
              borderColor: colors.border,
            }}
            onPress={() => navigation.navigate("CompanySearch")}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {" "}
              Компани хайх{" "}
            </Text>
          </TouchableOpacity>
          {!state.isCompany && (
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 20,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("MyJobs")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Өөрт тохирох{" "}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 20,
              marginVertical: !state.isCompany && 10,
              borderColor: colors.border,
            }}
            onPress={() => navigation.navigate("WorkSearch")}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {" "}
              Мэргэжлээр зар хайх{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,

              borderWidth: 1,
              borderRadius: 20,
              borderColor: colors.border,
              marginTop: state.isCompany && 10,
            }}
            onPress={() => navigation.navigate("CategorySearch")}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {" "}
              Салбараар зар хайх{" "}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {/* <Text
        style={{ fontSize: 500, color: "white" }}
        onPress={() => state.logout()}
      >
        Garah
      </Text> */}
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
