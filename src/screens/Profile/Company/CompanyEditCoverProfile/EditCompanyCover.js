import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../../../../Constants";
const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;
const EditCompanyCover = ({ route }) => {
  const { cover } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [coverImage, setCoverImage] = useState("");
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleUploadComplete = () => {
    setUploadProgress(0);
    setUploadTotal(0);
    navigation.goBack();
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };
  const openImageCoverLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Зургийн эрхийг нээнэ үү");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2.35, 1],
      });
      if (!response.cancelled) {
        setCoverImage(response.uri);
      }
    }
  };
  const uploadCoverImage = async () => {
    const xhr = new XMLHttpRequest();
    const fileExt = coverImage.substring(coverImage.lastIndexOf(".") + 1);
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    formData.append("file", {
      uri: coverImage,
      type: `image/${fileExt}`,
      name: "new__cover",
    });
    xhr.open("PUT", `${api}/api/v1/cvs/cover`);
    xhr.send(formData);
    console.log(formData);
    Alert.alert("Амжиллтай хадгаллаа", "", [
      { text: "ОК", onPress: () => console.log("a") },
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
          width: fullWidth,
          height: fullHeight / 4,
          alignSelf: "center",
          marginTop: 50,
        }}
        source={{ uri: coverImage ? coverImage : `${api}/upload/${cover}` }}
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
            backgroundColor: !coverImage ? "#FFB6C1" : colors.border,
            padding: 10,
            borderRadius: 20,
          }}
          onPress={openImageCoverLibrary}
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
            backgroundColor: coverImage ? "#FFB6C1" : colors.border,
            padding: 10,
            borderRadius: 20,
          }}
          disabled={coverImage ? false : true}
          onPress={uploadCoverImage}
        >
          <Text
            style={{
              fontSize: 20,
              color: !coverImage ? colors.secondaryText : "black",
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

export default EditCompanyCover;

const styles = StyleSheet.create({});
