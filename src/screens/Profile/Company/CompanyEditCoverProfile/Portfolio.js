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
import { api } from "../../../../../Constants";
import MyButton from "../../../../components/MyButton";
const fullWidth = Dimensions.get("screen").width;
const Portfolio = (props) => {
  const { image1, image2, image3, image4, image5, image6 } = props;
  const [postImage1, setPostImage1] = useState();
  const [postImage2, setPostImage2] = useState();
  const [postImage3, setPostImage3] = useState();
  const [postImage4, setPostImage4] = useState();
  const [postImage5, setPostImage5] = useState();
  const [postImage6, setPostImage6] = useState();
  const navigation = useNavigation();
  const [backPhoto1, setBackPhoto1] = useState(image1);
  const [backPhoto2, setBackPhoto2] = useState(image2);
  const [backPhoto3, setBackPhoto3] = useState(image3);
  const [backPhoto4, setBackPhoto4] = useState(image4);
  const [backPhoto5, setBackPhoto5] = useState(image5);
  const [backPhoto6, setBackPhoto6] = useState(image6);
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { colors } = useTheme();
  const openImageProfileLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
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
      alert("zurgiin erhiig neene uu");
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
      alert("zurgiin erhiig neene uu");
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
      alert("zurgiin erhiig neene uu");
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
      alert("zurgiin erhiig neene uu");
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
      alert("zurgiin erhiig neene uu");
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
  const deleteBackPhoto = () => {
    setBackPhoto1(undefined);
  };
  const deleteImage1 = () => {
    setPostImage2(undefined);
  };
  const deleteBackPhoto1 = () => {
    setBackPhoto2(undefined);
  };
  const deleteImage2 = () => {
    setPostImage3(undefined);
  };
  const deleteBackPhoto2 = () => {
    setBackPhoto3(undefined);
  };
  const deleteImage3 = () => {
    setPostImage4(undefined);
  };
  const deleteBackPhoto3 = () => {
    setBackPhoto4(undefined);
  };
  const deleteImage4 = () => {
    setPostImage5(undefined);
  };
  const deleteBackPhoto4 = () => {
    setBackPhoto5(undefined);
  };
  const deleteImage5 = () => {
    setPostImage6(undefined);
  };
  const deleteBackPhoto5 = () => {
    setBackPhoto6(undefined);
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
            {postImage1 === undefined && backPhoto1 === undefined ? (
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
            ) : null}
            {/* Зураг  */}
            {postImage1 === undefined &&
            backPhoto1 === undefined ? undefined : (
              <ImageBackground
                source={{
                  uri: postImage1 ? postImage1 : `${api}/upload/${backPhoto1}`,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={postImage1 ? deleteImage : deleteBackPhoto}
                />
              </ImageBackground>
            )}
          </>

          {/* 2dahi zurag */}
          <>
            {postImage2 === undefined && backPhoto2 === undefined ? (
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
            ) : null}
            {/* Зураг  */}
            {postImage2 === undefined &&
            backPhoto2 === undefined ? undefined : (
              <ImageBackground
                source={{
                  uri: postImage2 ? postImage2 : `${api}/upload/${backPhoto2}`,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={postImage1 ? deleteImage1 : deleteBackPhoto1}
                />
              </ImageBackground>
            )}
          </>

          {/* 3dahi zurga */}
          <>
            {postImage3 === undefined && backPhoto3 === undefined ? (
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
            ) : null}
            {/* Зураг  */}
            {postImage3 === undefined &&
            backPhoto3 === undefined ? undefined : (
              <ImageBackground
                source={{
                  uri: postImage3 ? postImage3 : `${api}/upload/${backPhoto3}`,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={postImage3 ? deleteImage2 : deleteBackPhoto2}
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
            {postImage4 === undefined && backPhoto4 === undefined ? (
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
            ) : null}
            {/* Зураг  */}
            {postImage4 === undefined &&
            backPhoto4 === undefined ? undefined : (
              <ImageBackground
                source={{
                  uri: postImage4 ? postImage4 : `${api}/upload/${backPhoto4}`,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={postImage4 ? deleteImage3 : deleteBackPhoto3}
                />
              </ImageBackground>
            )}
          </>

          {/* 5dahi zurag */}
          <>
            {postImage5 === undefined && backPhoto5 === undefined ? (
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
            ) : null}
            {/* Зураг  */}
            {postImage5 === undefined &&
            backPhoto5 === undefined ? undefined : (
              <ImageBackground
                source={{
                  uri: postImage5 ? postImage5 : `${api}/upload/${backPhoto5}`,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={postImage5 ? deleteImage4 : deleteBackPhoto4}
                />
              </ImageBackground>
            )}
          </>

          {/* 6dahi zurag */}
          <>
            {postImage6 === undefined && backPhoto6 === undefined ? (
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
            ) : null}
            {/* Зураг  */}
            {postImage6 === undefined &&
            backPhoto6 === undefined ? undefined : (
              <ImageBackground
                source={{
                  uri: postImage6 ? postImage6 : `${api}/upload/${backPhoto6}`,
                }}
                style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color="white"
                  style={{ alignSelf: "flex-end", margin: 10 }}
                  onPress={postImage6 ? deleteImage5 : deleteBackPhoto5}
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

export default Portfolio;

const styles = StyleSheet.create({});
