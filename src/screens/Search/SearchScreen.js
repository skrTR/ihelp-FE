import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SearchScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insents = useSafeAreaInsets();

  return (
    <>
      <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
        <Header isFollowedCompany={true} isNotification={true} />
        <ScrollView style={{ backgroundColor: colors.background }}>
          <View
            style={{ backgroundColor: colors.background, marginHorizontal: 10 }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                marginTop: 5,
              }}
            >
              Хэрэглэгч
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("UserSearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Хэрэглэгч хайх
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("UserInfluncerSearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Инфлүүнсер
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("UserFreelancerSearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                {" "}
                Чөлөөт ажилтан
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                marginTop: 5,
              }}
            >
              Байгууллага
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.border,
                marginTop: 10,
              }}
              onPress={() => navigation.navigate("EmployerSearch")}
            >
              <Text style={{ textAlign: "center", color: colors.primaryText }}>
                Ажил олгогч байгууллага
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.border,
                marginVertical: 10,
              }}
              onPress={() => navigation.navigate("EmployeeSearch")}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colors.primaryText,
                }}
              >
                Ажил гүйцэтгэгч байгууллага
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.border,
              }}
              onPress={() => navigation.navigate("AllCompanySearch")}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colors.primaryText,
                }}
              >
                Бүгд
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
