import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContext";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";

const NotificationScreen = () => {
  const state = useContext(UserContext);
  const [notifData, setNotifData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getNotification = () => {
    axios
      .get(
        `${api}/api/v1/notifications/${
          state.isCompany ? state.companyId : state.userId
        }/user?limit=1000`
      )
      .then((res) => {
        setNotifData(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <View
        style={{
          backgroundColor: "#141414",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          bottom: 0,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <View>
            <AntDesign
              name="left"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View>
            <Image
              source={require("../../../assets/ihelp/logo.png")}
              style={{
                width: 90,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text>{"      "}</Text>
        </View>
      </View>
      <FlatList
        data={notifData}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 10,
                marginHorizontal: 20,
                borderColor: colors.border,
                borderRadius: 30,
                marginTop: 10,
                backgroundColor: item.isRead
                  ? colors.border
                  : colors.background,
              }}
              onPress={() => {
                navigation.navigate("NotiffPostDetailScreen", {
                  id: item.like && item.like.post,
                  isRead: item._id,
                });
              }}
            >
              {item.who ? (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: `${api}/upload/${item.who.profile}` }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <Text
                    style={{
                      color: colors.primaryText,
                      width: "80%",
                      marginLeft: 10,
                      fontFamily: item.isRead ? "Sf-bold" : "Sf-thin",
                    }}
                  >
                    {item.who.lastName} {item.who.firstName}-д таны пост
                    таалагдсан
                  </Text>
                </View>
              ) : item.for ? (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: `${api}/upload/${item.for.profile}` }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <View style={{ width: "80%", marginLeft: 10 }}>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontFamily: item.isRead ? "Sf-bold" : "Sf-thin",
                      }}
                    >
                      {item.for.lastName} {item.for.firstName}-д таны пост
                      таалагдсан
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontFamily: item.isRead ? "Sf-bold" : "Sf-thin",
                        textAlign: "right",
                        marginRight: 10,
                      }}
                    >
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
