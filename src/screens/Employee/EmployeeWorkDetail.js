import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header/Header";
import CompanyHeader from "../../components/Header/CompanyHeader";
const EmployeeWorkDetail = (props) => {
  const state = useContext(UserContext);
  const { id, isLiked } = props.route.params;
  const [workDetail, setWorkDetail] = useState();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isLike, setIsLike] = useState(isLiked);
  const getWorkDetail = () => {
    axios
      .get(`${api}/api/v1/announcements/${id}`)
      .then((res) => {
        setWorkDetail(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getWorkDetail();
  }, []);
  if (!workDetail) {
    return null;
  }
  const unLiked = () => {
    axios
      .delete(`${api}/api/v1/likes/${id}/job`)
      .then((res) => {
        setIsLike(false);
        Alert.alert("Амжилттай устгалаа");
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
      });
  };
  const liked = () => {
    axios
      .post(`${api}/api/v1/likes/${id}/announcement`)
      .then((res) => {
        setIsLike(true);
        Alert.alert("Амжилттай хадгаллаа");
      })
      .catch((err) => {
        // alert(err);
      });
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.header, height: "100%" }}>
      {state.isCompany ? (
        <CompanyHeader isBack={true} />
      ) : (
        <Header isBack={true} />
      )}
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={{ margin: 10 }}>
          {/* Company */}

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#2c3539",
              paddingVertical: 10,
              justifyContent: "space-between",
              borderRadius: 20,
              marginTop: 10,
            }}
            onPress={() =>
              navigation.navigate("ViewCompanyProfile", {
                id: workDetail.createUser,
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={{
                  uri: `${api}/upload/${workDetail.profile}`,
                }}
                style={{ width: 80, height: 80, borderRadius: 30 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.primaryText,
                    fontFamily: "Sf-bold",
                  }}
                >
                  {workDetail.firstName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.primaryText,
                    fontFamily: "Sf-thin",
                    marginVertical: 7,
                  }}
                >
                  {/* {workDetail.announcementNumber} */}
                </Text>
                <Text
                  style={{ color: colors.primaryText, fontFamily: "Sf-bold" }}
                >
                  Нийт ажлын байр: {workDetail.announcementNumber}
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={50} color={colors.primaryText} />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#454545",
              padding: 30,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 10,
                  color: colors.primaryText,
                  bottom: 8,
                }}
              >
                Үндсэн мэдээлэл
              </Text>
              <Icon
                name={isLike ? "heart" : "heart-outlined"}
                size={30}
                color={"white"}
                onPress={isLike ? unLiked : liked}
                style={{ textAlign: "right" }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={{ marginVertical: 4, color: "white" }}>Төрөл</Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  Цагийн хуваарь
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  Төлбөр
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  Байршил
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  Хийх ажил
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  Туршлага:
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  Зөвшөөрөл:
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  Certificate:
                </Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  {workDetail.occupation && workDetail.occupation.name}
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  {workDetail.time}
                </Text>
                <Text style={{ marginVertical: 4, color: "white" }}>
                  {workDetail.price}
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    top: 4,
                  }}
                >
                  {workDetail.location}
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    top: 12,
                  }}
                >
                  {workDetail.do}
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    top: 20,
                  }}
                >
                  {workDetail.experience}
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    top: 30,
                  }}
                >
                  {workDetail.specialPermission}
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    top: 30,
                  }}
                >
                  {workDetail.certificate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "#2c3539",
          borderTopRightRadius: 20,
          position: "absolute",
          left: 0,
          right: 0,
          padding: 20,
          borderTopLeftRadius: 20,
          bottom: 0,
        }}
        onPress={() =>
          navigation.navigate("CompanySendWorkRequest", { id: id })
        }
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: colors.primaryText,
            bottom: 5,
          }}
        >
          Ажлын санал тавих
          <Ionicons
            // send
            name="send-outline"
            size={20}
            color={colors.primaryText}
            style={{}}
          />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmployeeWorkDetail;

const styles = StyleSheet.create({});
