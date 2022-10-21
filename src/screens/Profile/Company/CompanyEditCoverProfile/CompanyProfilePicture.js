import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../../../../Constants";

const CompanyProfilePicture = ({ route }) => {
  const { photo } = route.params;
  const { colors } = useTheme();
  const [profileImage, setProfileImage] = useState("");
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigation = useNavigation();
  const handleUploadComplete = () => {
    setUploadProgress(0);
    setUploadTotal(0);
    // props.navigation.navigate("Detail", { id: bookId });
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };

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
  const uploadProfileImage = async () => {
    const xhr = new XMLHttpRequest();
    const fileExt = profileImage.substring(profileImage.lastIndexOf(".") + 1);
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    formData.append("file", {
      uri: profileImage,
      type: `image/${fileExt}`,
      name: "new__profile",
    });
    xhr.open("PUT", `${api}/api/v1/cvs/profile`);
    xhr.send(formData);
    Alert.alert("Амжиллтай хадгаллаа", "", [
      { text: "ОК", onPress: () => navigation.goBack() },
    ]);
  };

  if (uploadTotal < 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 16,
            color: colors.primaryText,
            fontFamily: "Sf-thin",
          }}
        >
          Түр хүлээнэ үү. Зургийг илгээж байна...
        </Text>
        <ActivityIndicator size={"small"} color={colors.primaryText} />
      </View>
    );
  }
  return (
    <View>
      <Image
        style={{
          width: 350,
          height: 350,
          resizeMode: "contain",
          alignSelf: "center",
          marginTop: 50,
          borderRadius: 200,
        }}
        source={{ uri: profileImage ? profileImage : `${api}/upload/${photo}` }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 40,
        }}
      >
        <AntDesign name="eyeo" size={24} color={colors.secondaryText} />
        <Text
          style={{
            color: colors.secondaryText,
            fontFamily: "Sf-thin",
            fontSize: 12,
          }}
        >
          {" "}
          Бүх хэрэглэгчид үзэгдэх болно
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          style={{
            backgroundColor: !profileImage ? "#FFB6C1" : colors.border,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={openImageProfileLibrary}
        >
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 20,
            }}
          >
            Cонгох
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: profileImage ? "#FFB6C1" : colors.border,
            padding: 10,
            borderRadius: 10,
          }}
          disabled={profileImage ? false : true}
          onPress={uploadProfileImage}
        >
          <Text
            style={{
              fontSize: 20,
              color: !profileImage ? colors.secondaryText : "black",
              paddingHorizontal: 10,
            }}
          >
            Хадгалах
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompanyProfilePicture;

const styles = StyleSheet.create({});
