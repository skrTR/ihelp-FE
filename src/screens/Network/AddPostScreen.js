import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const AddPostScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [userProfile] = useUserProfile(state.userId);
  const [postText, setPostText] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const insents = useSafeAreaInsets();
  const openImageProfileLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };
  const deleteImage = () => {
    setProfileImage(null);
  };
  const sendNetworkingPost = () => {
    axios
      .post(`${api}/api/v1/posts`, { body: postText })
      .then((res) => {
        if (profileImage) {
          const newPost = res.data.article;
          const xhr = new XMLHttpRequest();
          const fileExt = profileImage.substring(
            profileImage.lastIndexOf(".") + 1
          );
          xhr.addEventListener("load", (event) => handleUploadComplete(event));
          xhr.upload.addEventListener("progress", handleUploadProgress);
          const formData = new FormData();
          formData.append("file", {
            uri: profileImage,
            type: `image/${fileExt}`,
            name: "new__profile",
          });
          xhr.open("PUT", `${api}/api/v1/posts/${newPost._id}/photo`);
          xhr.send(formData);
        }
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleUploadComplete = () => {
    setUploadProgress(0);
    setUploadTotal(0);
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };
  if (!userProfile) {
    return null;
  }

  if (uploadTotal > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}>
          Түр хүлээнэ үү. Зургийг илгээж байна...
        </Text>

        <View
          style={{
            height: 50,
            backgroundColor: "red",
            width: 200,
          }}
        >
          <View
            style={{
              height: 50,
              backgroundColor: "green",
              width: uploadProgress * 2,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", flex: 1, marginTop: 15 }}>
              {uploadProgress}%
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "#141414", paddingTop: insents.top }}>
      {/* header */}

      <View
        style={{
          flexDirection: "row",
          paddingBottom: 20,
          justifyContent: "space-between",
          backgroundColor: "#141414",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderColor: colors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 20, top: 15 }}
        >
          <AntDesign name="left" size={28} color={colors.primaryText} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.primaryText,
            fontWeight: "bold",
            marginTop: 20,
            right: 3,
            fontSize: 18,
          }}
        >
          Нийтлэл оруулах
        </Text>
        {postText.length > 0 ? (
          <TouchableOpacity onPress={sendNetworkingPost}>
            <LinearGradient
              colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                borderRadius: 18,
                top: 10,
                right: 14,
                opacity: 1,
                padding: 5,
              }}
            >
              <AntDesign
                name="rightcircleo"
                size={28}
                color={colors.primaryText}
              />
            </LinearGradient>
          </TouchableOpacity>
        ) : profileImage ? (
          <TouchableOpacity onPress={sendNetworkingPost}>
            <LinearGradient
              colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                borderRadius: 18,
                top: 10,
                right: 14,
                opacity: 1,
                padding: 5,
              }}
            >
              <AntDesign
                name="rightcircleo"
                size={28}
                color={colors.primaryText}
              />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              borderRadius: 20,
              top: 10,
              right: 14,
              padding: 5,
            }}
            disabled
          >
            <AntDesign
              name="rightcircleo"
              size={28}
              color={colors.primaryText}
              style={{ opacity: 0.1 }}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={{ backgroundColor: colors.background }}>
        <View style={{ backgroundColor: colors.background }}>
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 20,
              }}
            >
              <ImageBackground
                source={{
                  uri: `${api}/upload/${userProfile.profile}`,
                }}
                style={{ width: 50, height: 50 }}
                imageStyle={{ borderRadius: 50 }}
              >
                <Image
                  style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                  source={
                    userProfile.status === "lookingForJob"
                      ? require("../../../assets/looking.png")
                      : userProfile.status === "opentowork"
                      ? require("../../../assets/open.png")
                      : userProfile.status === "getEmployee"
                      ? require("../../../assets/hiring.png")
                      : null
                  }
                />
              </ImageBackground>

              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                  {userProfile.lastName} {userProfile.firstName}
                </Text>
                <Text style={{ color: colors.primaryText }}>
                  {userProfile.profession}{" "}
                  {userProfile.workingCompany &&
                    `@${userProfile.workingCompany}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                marginHorizontal: 20,
                padding: 10,
                borderRadius: 10,
                borderColor: colors.border,
              }}
            >
              <TextInput
                placeholder="Та энд бичнэ үү"
                multiline={true}
                onChangeText={setPostText}
                value={postText}
                placeholderTextColor={colors.secondaryText}
                style={{
                  color: colors.primaryText,
                  paddingBottom: 200,
                }}
              />
            </View>
          </>

          {profileImage ? (
            <View>
              <View
                style={{
                  alignSelf: "flex-end",
                  marginRight: 15,
                  top: 40,
                  zIndex: 1000,
                  backgroundColor: colors.border,
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{}}
                  onPress={deleteImage}
                />
              </View>

              <Image
                source={{ uri: profileImage }}
                style={{ width: "100%", height: 350 }}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginHorizontal: 30,
                marginTop: 30,
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={openImageProfileLibrary}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  marginRight: 10,
                  fontFamily: "Sf-thin",
                }}
              >
                Зураг оруулах
              </Text>
              <Entypo name="image" size={34} color={colors.primaryText} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({});
