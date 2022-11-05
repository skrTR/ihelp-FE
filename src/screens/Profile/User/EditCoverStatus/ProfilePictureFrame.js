import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import UserContext from "../../../../context/UserContext";
import { api } from "../../../../../Constants";
const ProfilePictureFrame = ({ route }) => {
  const { photo, status } = route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const [statusText, setStatusText] = useState(status ? status : "null");
  const navigation = useNavigation();
  const postStatus = () => {
    axios
      .put(`${api}/api/v1/cvs/${state.userId}`, {
        status: statusText,
      })
      .then((res) => {
        Alert.alert(
          "Амжилттай хадгаллаа",
          "Таны дагагч нарт мэдэгдэл илгээгдсэн"
        );
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView style={{}}>
      <ImageBackground
        style={{
          width: 390,
          height: 390,

          alignSelf: "center",
          marginTop: 35,
        }}
        source={{ uri: `${api}/upload/${photo}` }}
        imageStyle={{ borderRadius: 200, resizeMode: "contain" }}
      >
        {statusText !== "null" && (
          <Image
            style={{ width: 420, height: 420, right: 15, bottom: 12 }}
            source={
              statusText === "lookingForJob"
                ? require("../../../../../assets/looking.png")
                : statusText === "opentowork"
                ? require("../../../../../assets/open.png")
                : statusText === "getEmployee"
                ? require("../../../../../assets/hiring.png")
                : null
            }
          />
        )}
      </ImageBackground>
      {console.log(statusText)}
      <View style={{ marginTop: 50 }}>
        <View
          style={{
            flexDirection: "row",
            bottom: 25,
            left: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="notification-important"
            size={24}
            color={colors.secondaryText}
          />
          <Text
            style={{
              color: colors.secondaryText,
              fontFamily: "Sf-thin",
              fontSize: 12,
            }}
          >
            {" "}
            Хүрээг хадгалахад таны дагагч нарт мэдэгдэл очих болно
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => setStatusText("null")}
          >
            <ImageBackground
              source={{ uri: `${api}/upload/${photo}` }}
              style={{
                width: 100,
                height: 100,
                top: 0,
                alignSelf: "center",
                marginBottom: 5,
              }}
              imageStyle={{ borderRadius: 50 }}
            ></ImageBackground>
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              Энгийн
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => setStatusText("opentowork")}
          >
            <ImageBackground
              source={{ uri: `${api}/upload/${photo}` }}
              style={{
                width: 100,
                height: 100,
                top: 0,
                alignSelf: "center",
                marginBottom: 5,
              }}
              imageStyle={{ borderRadius: 50 }}
            >
              <Image
                source={require("../../../../../assets/open.png")}
                style={{ width: 107, height: 107, right: 3, bottom: 3 }}
              />
            </ImageBackground>
            <Text
              style={{
                textAlign: "center",
                color: colors.primaryText,
              }}
            >
              Нээлттэй
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => setStatusText("getEmployee")}
          >
            <ImageBackground
              source={{ uri: `${api}/upload/${photo}` }}
              style={{
                width: 100,
                height: 100,
                top: 0,
                alignSelf: "center",
                marginBottom: 5,
              }}
              imageStyle={{ borderRadius: 50 }}
            >
              <Image
                source={require("../../../../../assets/hiring.png")}
                style={{ width: 107, height: 107, right: 3, bottom: 3 }}
              />
            </ImageBackground>
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              Ажилд авна
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => setStatusText("lookingForJob")}
          >
            <ImageBackground
              source={{ uri: `${api}/upload/${photo}` }}
              style={{
                width: 100,
                height: 100,
                top: 0,
                alignSelf: "center",
                marginBottom: 5,
              }}
              imageStyle={{ borderRadius: 50 }}
            >
              <Image
                source={require("../../../../../assets/looking.png")}
                style={{ width: 107, height: 107, right: 3, bottom: 3 }}
              />
            </ImageBackground>
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              Xайж байна
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFB6C1",
            padding: 10,
            borderRadius: 10,
            alignSelf: "center",
            marginVertical: 20,
          }}
          onPress={postStatus}
        >
          <Text
            style={{
              fontSize: 18,
              color: "black",
              paddingHorizontal: 10,
            }}
          >
            Хадгалах
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePictureFrame;

const styles = StyleSheet.create({});
