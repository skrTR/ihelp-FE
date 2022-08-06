import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import UserContext from "../../../../context/UserContext";
import { api } from "../../../../../Constants";
import axios from "axios";
const UserSettingsScreen = ({ route }) => {
  const { userProfile, cv } = route.params;
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const changePassword = () => {
    setLoading(true);
    Alert.alert(
      "Нууц үг солих",
      `${state.phone} дугаарлуу 6 тэмдэгтэй код очно`,
      [
        {
          text: "Cancel",
          onPress: () => setLoading(false),
          style: "үгүй",
        },
        {
          text: "Tийм",
          onPress: () => {
            axios
              .post(`${api}/api/v1/cvs/forgot-password`, { phone: state.phone })
              .then((res) => {
                navigation.navigate("ChangePasswordModal");
                setLoading(false);
              })
              .catch((err) => {
                console.log(err, "a");
                setLoading(false);
              });
          },
        },
      ]
    );
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
      {/* Status */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() =>
          navigation.navigate("EditStatusModal", {
            data: userProfile,
            cvData: cv,
          })
        }
      >
        <MaterialCommunityIcons
          name="view-list"
          size={28}
          color={colors.primaryText}
        />
        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Статус
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
      {/* Activity */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => navigation.navigate("UserActivityModal")}
      >
        <Feather name="activity" size={28} color={colors.primaryText} />
        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Идэвхи
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
      {/* Ирсэн ажлын санал */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("UserRecievedJob");
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
      {/* Илгээсэн ажлын санал */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("UserSendWorkHistory");
        }}
      >
        <FontAwesome5
          name="network-wired"
          size={22}
          color={colors.primaryText}
        />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Илгээсэн ажлын санал
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
      {/* Хадгалсан ажлын байр */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => navigation.navigate("UserSavedWork")}
      >
        <MaterialIcons name="save-alt" size={28} color={colors.primaryText} />
        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Хадгалсан ажлын байр
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
      {/* Нууц үг солих */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={changePassword}
      >
        <MaterialCommunityIcons
          name="form-textbox-password"
          size={28}
          color={colors.primaryText}
        />
        <View>
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
          >
            Нууц үг солих
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      {/* Баталгаажуулах */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() =>
          navigation.navigate("UserVerifyScreen", {
            data: userProfile,
            cvData: cv,
          })
        }
      >
        <Octicons name="verified" size={28} color={colors.primaryText} />
        <View>
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
          >
            Профайл баталгаажуулах
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />

      <TouchableOpacity
        style={{
          bottom: 50,
          position: "absolute",
          alignSelf: "center",
          alignItems: "center",
        }}
        onPress={() => state.logout()}
      >
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 20,
            paddingHorizontal: 20,
          }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <SimpleLineIcons name="logout" size={24} color={colors.primaryText} />
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {" "}
            Гарах
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default UserSettingsScreen;
