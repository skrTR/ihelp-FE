import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import axios from "axios";
import { api } from "../../../Constants";
const SharePostModal = (props) => {
  const { id } = props.route.params;
  const state = useContext(UserContext);
  const [userProfile] = useUserProfile(state.userId);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [shareText, setShareText] = useState("");
  const onShare = () => {
    axios
      .post(`${api}/api/v1/shares/${id}`, { body: shareText })
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!userProfile) {
    return null;
  }
  return (
    <View style={{ backgroundColor: colors.background, marginHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Image
          source={{ uri: `${api}/upload/${userProfile.profile}` }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
            {userProfile.lastName} {userProfile.firstName}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            {userProfile.profession}{" "}
            {userProfile.workingCompany && `@${userProfile.workingCompany}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 10,
          borderColor: "#b0b3b8",
        }}
      >
        <TextInput
          placeholder="Та хэлэх зүйлээ бичнэ үү?"
          multiline={true}
          numberOfLines={10}
          onChangeText={setShareText}
          value={shareText}
          placeholderTextColor={colors.primaryText}
          style={{
            color: colors.primaryText,

            paddingVertical: 200,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={onShare}
        style={{
          alignSelf: "flex-end",
          padding: 10,
          margin: 20,
          backgroundColor: "#FFB6C1",
          borderRadius: 20,
        }}
      >
        <Text style={{ color: colors.border }}> Хуваалцах </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SharePostModal;
