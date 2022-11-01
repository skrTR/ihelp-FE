import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import UserContext from "../../../../context/UserContext";
import axios from "axios";
import { api } from "../../../../../Constants";
const CompanySettingModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const companyExit = () => {
    state.logout();
  };
  const companyDelete = () => {
    Alert.alert("Та өөрийн профайл устгахдаа ", "итгэлтэй байна уу?", [
      {
        text: "Болих",
        onPress: () => {
          console.log("Cancel Pressed");
        },
        style: "cancel",
      },
      {
        text: "Устгах",
        onPress: () => {
          axios
            .delete(`${api}/api/v1/cvs/${state.companyId}`)
            .then((res) => {
              state.logout();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ]);
  };
  const changePassword = () => {
    setLoading(true);
    Alert.alert("Нууц үг солих", `${state.email} рүү 6 тэмдэгтэй код очно`, [
      {
        text: "Cancel",
        onPress: () => setLoading(false),
        style: "үгүй",
      },
      {
        text: "Tийм",
        onPress: () => {
          axios
            .post(`${api}/api/v1/cvs/forgot-password-email`, {
              email: state.email,
            })
            .then((res) => {
              navigation.navigate("ChangeCompanyPassword");
              setLoading(false);
            })
            .catch((err) => {
              console.log(err, "a");
              setLoading(false);
            });
        },
      },
    ]);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
        <ActivityIndicator size={30} color={"#FFB6C1"} />
      </View>
    );
  }

  return (
    <View style={{ marginHorizontal: 20, flex: 1 }}>
      {/* Oruulsan ajliin zar  */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("CompanyCreateWork");
        }}
      >
        <MaterialIcons
          name="work-outline"
          size={28}
          color={colors.primaryText}
        />
        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Оруулсан ажлын зар
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      {/* Ashiglasan uilchilgeenuud */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("CompanyUsedProduct");
        }}
      >
        <MaterialIcons
          name="app-settings-alt"
          size={28}
          color={colors.primaryText}
        />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Ашиглаж буй үйлчилгээ
        </Text>
      </TouchableOpacity>
      {/* Irsen cv nuud */}
      <>
        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("CompanyRecievedCv");
          }}
        >
          <MaterialIcons name="archive" size={28} color={colors.primaryText} />

          <Text
            style={{
              color: colors.primaryText,
              marginLeft: 20,
              fontSize: 18,
            }}
          >
            Ирсэн анкет
          </Text>
        </TouchableOpacity>
      </>
      {/* zar der Irsen cv nuud */}
      <>
        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("CompanyJobCv");
          }}
        >
          <MaterialIcons
            name="account-tree"
            size={28}
            color={colors.primaryText}
          />

          <Text
            style={{
              color: colors.primaryText,
              marginLeft: 20,
              fontSize: 18,
            }}
          >
            Ажлын зар дээр ирсэн анкет
          </Text>
        </TouchableOpacity>
      </>
      {/* Irsen ajliin sanal */}
      <>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("CompanyWorkRequest");
          }}
        >
          <MaterialIcons
            name="add-to-home-screen"
            size={28}
            color={colors.primaryText}
          />

          <Text
            style={{
              color: colors.primaryText,
              marginLeft: 20,
              fontSize: 18,
            }}
          >
            Ирсэн ажлын санал
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
          }}
        />
      </>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate("CompanySendWork");
        }}
      >
        <MaterialIcons
          name="assistant-photo"
          size={28}
          color={colors.primaryText}
        />

        <Text
          style={{
            color: colors.primaryText,
            marginLeft: 20,
            fontSize: 18,
          }}
        >
          Илгээсэн ажлын санал
        </Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      {/* Change password */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={changePassword}
      >
        <MaterialIcons name="security" size={28} color={colors.primaryText} />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Нууц үг солих
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={companyDelete}
      >
        <MaterialIcons
          name="delete-forever"
          size={28}
          color={colors.primaryText}
        />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Аккоунт устгах
        </Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={companyExit}
      >
        <MaterialIcons name="logout" size={28} color={colors.primaryText} />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Аккоунт гаргах
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default CompanySettingModal;

const styles = StyleSheet.create({});
