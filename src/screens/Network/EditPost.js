import {
  StyleSheet,
  Image,
  View,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
const fullWidth = Dimensions.get("screen").width;
const EditPost = ({ route }) => {
  const { id, postData } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [postImage, setPostImage] = useState();
  const [backPhoto, setBackPhoto] = useState(postData.photo);
  const [postBody, setPostBody] = useState(postData.body);
  const [sharedPost, setSharedPost] = useState(postData.sharePost);
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
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
        setPostImage(response.uri);
      }
    }
  };
  const deleteImage = () => {
    setPostImage(undefined);
  };
  const deleteBackPhoto = () => {
    setBackPhoto(undefined);
  };
  const deleteSharedData = () => {
    setSharedPost(null);
  };
  const sendNetworkingPost = () => {
    axios
      .put(`${api}/api/v1/posts/${id}`, {
        body: postBody,
        sharePost: sharedPost === null && null,
        isShare: sharedPost === null && false,
      })
      .then((res) => {
        if (postImage) {
          const xhr = new XMLHttpRequest();
          const fileExt = postImage.substring(postImage.lastIndexOf(".") + 1);
          xhr.addEventListener("load", (event) => handleUploadComplete(event));
          xhr.upload.addEventListener("progress", handleUploadProgress);
          const formData = new FormData();
          formData.append("file", {
            uri: postImage,
            type: `image/${fileExt}`,
            name: "new__profile",
          });
          xhr.open("PUT", `${api}/api/v1/posts/${id}/photo`);
          xhr.send(formData);
        } else {
          navigation.goBack();
        }
      })
      .catch((err) => alert(err));
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
    <ScrollView>
      {/* input */}
      <View
        style={{
          borderWidth: 1,
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 10,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      >
        <TextInput
          placeholder="Та хэлэх зүйлээ бичнэ үү?"
          multiline={true}
          numberOfLines={10}
          onChangeText={setPostBody}
          value={postBody}
          placeholderTextColor={colors.secondaryText}
          style={{
            color: colors.primaryText,
            paddingVertical: 30,
          }}
        />
      </View>
      {sharedPost ? (
        <View
          style={{
            marginHorizontal: 20,
            borderWidth: 0.3,
            borderColor: colors.border,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              {sharedPost.createUser && (
                <>
                  <ImageBackground
                    source={{
                      uri: `${api}/upload/${sharedPost.createUser.profile}`,
                    }}
                    style={{ width: 50, height: 50 }}
                    imageStyle={{ borderRadius: 50 }}
                  >
                    <Image
                      style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                      source={
                        sharedPost.createUser.status === "lookingForJob"
                          ? require("../../../assets/looking.png")
                          : sharedPost.createUser.status === "opentowork"
                          ? require("../../../assets/open.png")
                          : sharedPost.createUser.status === "getEmployee"
                          ? require("../../../assets/hiring.png")
                          : null
                      }
                    />
                  </ImageBackground>
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{ fontWeight: "bold", color: colors.primaryText }}
                    >
                      {sharedPost.createUser.lastName}{" "}
                      {sharedPost.createUser.firstName}{" "}
                    </Text>
                    {postData.isBoost ? (
                      <>
                        <Text
                          style={{
                            color: colors.secondaryText,
                          }}
                        >
                          Sponsored
                        </Text>
                        <Text> {sharedPost.createUser.profession} </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          style={{
                            color: colors.secondaryText,
                          }}
                        >
                          <Text>
                            {sharedPost.createUser.profession} @
                            {sharedPost.createUser.workingCompany}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: colors.secondaryText,
                            fontFamily: "Sf-thin",
                          }}
                        >
                          {moment(sharedPost.createdAt).fromNow()}
                        </Text>
                      </>
                    )}
                  </View>
                </>
              )}
            </View>
            <AntDesign
              name="delete"
              size={24}
              color="white"
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={deleteSharedData}
            />
          </View>
          <View>
            {/* Body text */}
            {sharedPost.body ? (
              <Text style={{ margin: 10, color: colors.primaryText }}>
                {sharedPost.body}{" "}
              </Text>
            ) : (
              <View style={{ margin: 10 }} />
            )}

            {/* shared photo */}
            {sharedPost.photo && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${sharedPost.photo}`,
                  }}
                  style={{
                    width: fullWidth,
                    height: 350,
                    alignSelf: "center",
                  }}
                />
                <View
                  style={{
                    margin: 10,
                  }}
                />
              </>
            )}
          </View>
        </View>
      ) : (
        <>
          {postImage === undefined && backPhoto === undefined ? (
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
          ) : null}
          {/* Зураг  */}
          {postImage === undefined && backPhoto === undefined ? undefined : (
            <ImageBackground
              source={{
                uri: postImage ? postImage : `${api}/upload/${backPhoto}`,
              }}
              style={{ width: "100%", height: 350 }}
            >
              <AntDesign
                name="delete"
                size={24}
                color="white"
                style={{ alignSelf: "flex-end", margin: 10 }}
                onPress={postImage ? deleteImage : deleteBackPhoto}
              />
            </ImageBackground>
          )}
        </>
      )}

      {/* Сервер луу илгээх */}
      <TouchableOpacity onPress={sendNetworkingPost}>
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          style={{
            borderRadius: 18,
            padding: 10,
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: "white",
              marginRight: 10,
            }}
          >
            Янзлах
          </Text>
          <AntDesign
            name="rightcircleo"
            size={28}
            color={colors.primaryText}
            onPress={sendNetworkingPost}
          />
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditPost;

const styles = StyleSheet.create({});
