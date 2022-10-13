import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";
const ChangeAccountModal = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  if (state.token !== null) {
    var decoded = jwt_decode(state.token);
  }
  if (state.companyToken !== null) {
    var companyDecoded = jwt_decode(state.companyToken);
  }
  const companySignUp = async () => {
    await state.companyLogin(state.email, state.companyPassword);
    navigation.goBack();
  };
  const changeUser = async () => {
    await state.login(state.phone, state.password);
    navigation.goBack();
  };
  const logout = () => {
    state.logout();
  };
  return (
    <View>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          alignSelf: "center",
          borderColor: colors.border,
          marginVertical: 10,
          paddingHorizontal: 20,
        }}
      />
      <>
        {decoded ? (
          <>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                marginLeft: 20,
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              Хэрэглэгчийн хаяг{" "}
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
              onPress={changeUser}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: `${api}/upload/${decoded.profile}` }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <Text
                  style={{
                    color: colors.primaryText,
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  {" "}
                  {decoded.firstName} {decoded.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : companyDecoded ? (
          <>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                marginLeft: 20,
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              Байгууллагын хаяг{" "}
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={companySignUp}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: `${api}/upload/${companyDecoded.profile}` }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <Text
                  style={{
                    color: colors.primaryText,
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  {" "}
                  {companyDecoded.name}
                </Text>
              </View>
              {/* <MaterialCommunityIcons
                name={
                  state.isCompany
                    ? "checkbox-blank-circle"
                    : "checkbox-blank-circle-outline"
                }
                size={24}
                color={colors.primaryText}
              /> */}
            </TouchableOpacity>
          </>
        ) : null}
      </>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          marginHorizontal: 10,
          padding: 5,
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
        onPress={logout}
      >
        <Text style={{ color: colors.primaryText, fontSize: 15 }}>Гарах</Text>
      </TouchableOpacity>
      {/* {companyDecoded ? (
        <View style={{}}>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <FontAwesome5
              name="file-contract"
              size={30}
              color={colors.primaryText}
              style={{ marginBottom: 20 }}
            />
            <Text
              style={{
                textAlign: "center",
                color: colors.secondaryText,
                marginHorizontal: 20,
              }}
            >
              Хэрэглэгч бүртгүүлэх
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <TouchableOpacity>
              <LinearGradient
                colors={["#ED4264", "#FFEDBC", "#ED4264"]}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                style={{
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 20,
                  marginVertical: 15,
                }}
              >
                <Text style={{ color: "black" }}>Хэрэглэгч бүртүүлэх</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("PersonLoginModal")}
            >
              <LinearGradient
                colors={["#ED4264", "#FFEDBC", "#ED4264"]}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                style={{
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "black" }}>Хэрэглэгч нэвтрэх</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : decoded ? (
        <View style={{}}>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <FontAwesome5
              name="file-contract"
              size={30}
              color={colors.primaryText}
              style={{ marginBottom: 20 }}
            />
            <Text
              style={{
                textAlign: "center",
                color: colors.secondaryText,
                marginHorizontal: 20,
              }}
            >
              Та компани бүртгүүлэх бол ihelp тэй хуулийн этгээдийн гэрээ
              байгуулах ёстойг анхаарна уу!
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <TouchableOpacity>
              <LinearGradient
                colors={["#00B4DB", "#0083B0", "#00B4DB"]}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                style={{
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 20,
                  marginVertical: 15,
                }}
              >
                <Text style={{ color: colors.primaryText }}>
                  Компани бүртүүлэх
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("CompanyLoginScreen")}
            >
              <LinearGradient
                colors={["#00B4DB", "#0083B0", "#00B4DB"]}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                style={{
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: colors.primaryText }}>
                  Компани нэвтрэх
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : null} */}
    </View>
  );
};

export default ChangeAccountModal;

const styles = StyleSheet.create({});
