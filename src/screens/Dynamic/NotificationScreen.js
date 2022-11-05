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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Empty from "../../components/Empty";

const NotificationScreen = () => {
  const state = useContext(UserContext);
  const [notifData, setNotifData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insents = useSafeAreaInsets();
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
    <View
      style={{
        backgroundColor: colors.header,
        paddingTop: insents.top,
        height: "100%",
      }}
    >
      <Header isBack={true} />
      {/* <FlatList
        data={notifData}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  padding: 10,
                  marginHorizontal: 10,
                  borderColor: colors.border,
                  borderRadius: 10,
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
                      {item.who.lastName} {item.who.firstName}-д таны нийтлэл
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
                        {item.for.lastName} {item.for.firstName}-д таны нийтлэл
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
            </>
          );
        }}
      /> */}
      <Empty text={"Уучлаарай засвар хийгдэж байна"} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
