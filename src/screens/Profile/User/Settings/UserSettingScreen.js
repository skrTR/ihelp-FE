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
import UserDeleteModal from "./UserDeleteModal";
const UserSettingsScreen = ({ route }) => {
  const { userProfile, cv } = route.params;
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const changePassword = () => {
    setLoading(true);
    Alert.alert(
      "Нууц үг солих",
      `${state.phone} дугаарлуу 6 тэмдэгтэй код очно`,
      [
        {
          text: "Болих",
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
                let message = err.response.data.error.message;
                Alert.alert("Санамж", message, [
                  {
                    text: "Ойлголоо",
                    onPress: () => console.log("OK Pressed"),
                  },
                ]);

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
    <>
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
            size={26}
            color={colors.primaryText}
          />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 16 }}
          >
            Статус
          </Text>
        </TouchableOpacity>
        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
          }}
        />
        {/* Activity */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() => navigation.navigate("UserActivityModal")}
        >
          <Feather name="activity" size={26} color={colors.primaryText} />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 16 }}
          >
            Идэвх
          </Text>
        </TouchableOpacity>
        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
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
            size={26}
            color={colors.primaryText}
          />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 16 }}
          >
            Ирсэн ажлын санал
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
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
            size={20}
            color={colors.primaryText}
          />

          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 16 }}
          >
            Илгээсэн ажлын санал
          </Text>
        </TouchableOpacity>
        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
          }}
        />
        {/* Хадгалсан ажлын байр */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() => navigation.navigate("UserSavedWork")}
        >
          <MaterialIcons name="save-alt" size={26} color={colors.primaryText} />
          <Text
            style={{ color: colors.primaryText, marginLeft: 20, fontSize: 16 }}
          >
            Хадгалсан ажлын байр
          </Text>
        </TouchableOpacity>
        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
          }}
        />
        {/* Нууц үг солих */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={changePassword}
        >
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={26}
            color={colors.primaryText}
          />
          <View>
            <Text
              style={{
                color: colors.primaryText,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Нууц үг солих
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
          }}
        />
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() => setDeleteModal(!deleteModal)}
        >
          <MaterialCommunityIcons
            name="delete-forever"
            size={26}
            color={colors.primaryText}
          />
          <View>
            <Text
              style={{
                color: colors.primaryText,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Өөрийн бүртгэл устгах
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
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
          <Octicons name="verified" size={26} color={colors.primaryText} />
          <View>
            <Text
              style={{
                color: colors.primaryText,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Бүртгэл баталгаажуулах
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
          }}
        />
        {/* Гарах */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() => state.logout()}
        >
          <SimpleLineIcons name="logout" size={22} color={colors.primaryText} />

          <View>
            <Text
              style={{
                color: colors.primaryText,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              {" "}
              Гарах
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 5,
          }}
        />
      </View>
      <UserDeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        id={state.userId}
      />
    </>
  );
};

export default UserSettingsScreen;
