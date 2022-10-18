import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import MyButton from "../../components/MyButton";
import Loading from "../../components/Loading";

const fullWidth = Dimensions.get("screen").width;
const AddPortfolio = (props) => {
  const [postImage1, setPostImage1] = useState();
  const [postImage2, setPostImage2] = useState();
  const [postImage3, setPostImage3] = useState();
  const [postImage4, setPostImage4] = useState();
  const [postImage5, setPostImage5] = useState();
  const [postImage6, setPostImage6] = useState();
  const navigation = useNavigation();

  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { colors } = useTheme();
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
        setPostImage1(response.uri);
      }
    }
  };
  const openImageProfileLibrary1 = async () => {
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
        setPostImage2(response.uri);
      }
    }
  };
  const openImageProfileLibrary2 = async () => {
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
        setPostImage3(response.uri);
      }
    }
  };
  const openImageProfileLibrary3 = async () => {
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
        setPostImage4(response.uri);
      }
    }
  };
  const openImageProfileLibrary4 = async () => {
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
        setPostImage5(response.uri);
      }
    }
  };
  const openImageProfileLibrary5 = async () => {
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
        setPostImage6(response.uri);
      }
    }
  };
  const deleteImage = () => {
    setPostImage1(undefined);
  };

  const deleteImage1 = () => {
    setPostImage2(undefined);
  };

  const deleteImage2 = () => {
    setPostImage3(undefined);
  };

  const deleteImage3 = () => {
    setPostImage4(undefined);
  };

  const deleteImage4 = () => {
    setPostImage5(undefined);
  };

  const deleteImage5 = () => {
    setPostImage6(undefined);
  };

  const sendNetworkingPost = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    if (postImage1) {
      const fileExt =
        postImage1 && postImage1.substring(postImage1.lastIndexOf(".") + 1);
      formData.append("file1", {
        uri: postImage1,
        type: `image/${fileExt}`,
        name: "portf__1",
      });
    }
    if (postImage2) {
      const fileExt =
        postImage2 && postImage2.substring(postImage2.lastIndexOf(".") + 1);
      formData.append("file2", {
        uri: postImage2,
        type: `image/${fileExt}`,
        name: "portf__2",
      });
    }
    if (postImage3) {
      const fileExt =
        postImage3 && postImage3.substring(postImage3.lastIndexOf(".") + 1);
      formData.append("file3", {
        uri: postImage3,
        type: `image/${fileExt}`,
        name: "portf__3",
      });
    }
    if (postImage4) {
      const fileExt =
        postImage4 && postImage4.substring(postImage4.lastIndexOf(".") + 1);
      formData.append("file4", {
        uri: postImage4,
        type: `image/${fileExt}`,
        name: "portf__4",
      });
    }
    if (postImage5) {
      const fileExt =
        postImage5 && postImage5.substring(postImage5.lastIndexOf(".") + 1);
      formData.append("file5", {
        uri: postImage5,
        type: `image/${fileExt}`,
        name: "portf__5",
      });
    }
    if (postImage6) {
      const fileExt =
        postImage6 && postImage6.substring(postImage6.lastIndexOf(".") + 1);
      formData.append("file6", {
        uri: postImage6,
        type: `image/${fileExt}`,
        name: "portf__6",
      });
    }

    xhr.open("PUT", `${api}/api/v1/cvs/portfolio`);
    xhr.send(formData);
    xhr.onload = function (e) {
      console.log("Request Status", xhr.status);
    };
  };
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
  if (uploadTotal > 0) {
    return <Loading />;
  }
  return (
    <View>
      <>
        {/* Portfolia 1-3*/}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* 1deh zurag */}
          <>
            {!postImage1 ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: fullWidth / 3.4,
                  height: 130,
                  flex: 0.33,
                  alignContent: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={openImageProfileLibrary}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    marginTop: 30,
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            ) : (
              <ImageBackground
                source={{
                  uri: postImage1,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={deleteImage}
                />
              </ImageBackground>
            )}
          </>

          {/* 2dahi zurag */}
          <>
            {!postImage2 ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: fullWidth / 3.4,
                  height: 130,
                  flex: 0.33,
                  alignContent: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={openImageProfileLibrary1}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    marginTop: 30,
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            ) : (
              <ImageBackground
                source={{
                  uri: postImage2,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={deleteImage1}
                />
              </ImageBackground>
            )}
          </>

          {/* 3dahi zurga */}
          <>
            {!postImage3 ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: fullWidth / 3.4,
                  height: 130,
                  flex: 0.33,
                  alignContent: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={openImageProfileLibrary2}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    marginTop: 30,
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            ) : (
              <ImageBackground
                source={{
                  uri: postImage3,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={deleteImage2}
                />
              </ImageBackground>
            )}
          </>
        </View>
        {/* Portfolia 3-6*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
            marginTop: 5,
          }}
        >
          {/* 4dehi zurag */}
          <>
            {!postImage4 ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: fullWidth / 3.4,
                  height: 130,
                  flex: 0.33,
                  alignContent: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={openImageProfileLibrary3}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    marginTop: 30,
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            ) : (
              <ImageBackground
                source={{
                  uri: postImage4,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={deleteImage3}
                />
              </ImageBackground>
            )}
          </>

          {/* 5dahi zurag */}
          <>
            {!postImage5 ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: fullWidth / 3.4,
                  height: 130,
                  flex: 0.33,
                  alignContent: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={openImageProfileLibrary4}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    marginTop: 30,
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            ) : (
              <ImageBackground
                source={{
                  uri: postImage5,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={deleteImage4}
                />
              </ImageBackground>
            )}
          </>

          {/* 6dahi zurag */}
          <>
            {!postImage6 ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: fullWidth / 3.4,
                  height: 130,
                  flex: 0.33,
                  alignContent: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={openImageProfileLibrary5}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    marginTop: 30,
                  }}
                >
                  Зураг оруулах
                </Text>
                <Entypo name="image" size={34} color={colors.primaryText} />
              </TouchableOpacity>
            ) : (
              <ImageBackground
                source={{
                  uri: postImage6,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={deleteImage5}
                />
              </ImageBackground>
            )}
          </>
        </View>
      </>
      <MyButton text={"Оруулах"} onPress={sendNetworkingPost} />
    </View>
  );
};

export default AddPortfolio;

const styles = StyleSheet.create({});
