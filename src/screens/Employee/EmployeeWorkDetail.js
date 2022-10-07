import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Entypo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  const insents = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const getWorkDetail = () => {
    axios
      .get(`${api}/api/v1/announcements/${id}`)
      .then((res) => {
        setWorkDetail(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getWorkDetail();
  }, [isFocused]);
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
    <View
      style={{
        backgroundColor: colors.header,
        height: "100%",
        paddingTop: insents.top,
      }}
    >
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
              borderRadius: 10,
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
              <ImageBackground
                source={{
                  uri: `${api}/upload/${workDetail.profile}`,
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 30,
                }}
                imageStyle={{ borderRadius: 30 }}
              >
                {workDetail.isEmployer && (
                  <View
                    style={{
                      backgroundColor: "#ff914d",
                      borderRadius: 10,
                      alignItems: "center",
                      position: "absolute",
                      alignSelf: "flex-end",
                      bottom: 0,
                      padding: 5,
                    }}
                  >
                    <Ionicons
                      name={"briefcase"}
                      size={12}
                      color={colors.primaryText}
                    />
                  </View>
                )}
                {workDetail.isEmployee && (
                  <View
                    style={{
                      backgroundColor: "#3da4e3",
                      borderRadius: 10,
                      alignItems: "center",
                      position: "absolute",
                      alignSelf: "flex-end",
                      bottom: 0,
                      padding: 5,
                      right: workDetail.isEmployer ? 20 : 0,
                    }}
                  >
                    <Ionicons
                      name={"business"}
                      size={12}
                      color={colors.primaryText}
                    />
                  </View>
                )}
              </ImageBackground>
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
                  Нийт оруулсан зар: {workDetail.announcementNumber}
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={40} color={colors.primaryText} />
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
                {workDetail.occupationName && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Ажиллах чиглэл
                  </Text>
                )}
                {workDetail.do && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Үндсэн үйлчилгээ
                  </Text>
                )}
                {workDetail.startDate && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Эхлэх хугацаа
                  </Text>
                )}

                {workDetail.time && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Гүйцэтгэх хугацаа
                  </Text>
                )}
                {workDetail.price && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Үнийн санал
                  </Text>
                )}

                {workDetail.location && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Байршил
                  </Text>
                )}
                {workDetail.experience && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Ур чадвар:
                  </Text>
                )}
                {workDetail.workerNumber && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Ажилчдын тоо:
                  </Text>
                )}
                {workDetail.specialPermission && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Зөвшөөрөл:
                  </Text>
                )}
                {workDetail.certificate && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Батламж:
                  </Text>
                )}
                {workDetail.description && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    Тайлбар:
                  </Text>
                )}
              </View>
              <View style={{ marginLeft: 10 }}>
                {workDetail.occupationName && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    {workDetail.occupationName}
                  </Text>
                )}

                {workDetail.do && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginTop: 8,
                    }}
                  >
                    {workDetail.do}
                  </Text>
                )}

                {workDetail.startDate && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    {workDetail.startDate}
                  </Text>
                )}

                {workDetail.time && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    {workDetail.time}
                  </Text>
                )}

                {workDetail.price && (
                  <Text style={{ color: colors.primaryText, marginTop: 8 }}>
                    {workDetail.price}
                  </Text>
                )}
                {workDetail.location && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginTop: 8,
                    }}
                  >
                    {workDetail.location}
                  </Text>
                )}

                {workDetail.experience && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginTop: 8,
                    }}
                  >
                    {workDetail.experience}
                  </Text>
                )}

                {workDetail.workerNumber && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginTop: 8,
                    }}
                  >
                    {workDetail.workerNumber} хүнтэй
                  </Text>
                )}
                {workDetail.certificate && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginTop: 8,
                    }}
                  >
                    {workDetail.certificate}
                  </Text>
                )}

                {workDetail.specialPermission && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginTop: 8,
                    }}
                  >
                    {workDetail.specialPermission}!
                  </Text>
                )}
                {workDetail.description && (
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginTop: 8,
                      width: workDetail.description.length > 40 ? "30%" : "90%",
                    }}
                  >
                    {workDetail.description}
                  </Text>
                )}
              </View>
            </View>
            {workDetail.createUser === state.companyId && (
              <Text
                style={{
                  color: colors.primaryText,
                  marginTop: 8,
                }}
              >
                Зарыг үзсэн хүмүүсийн тоо: {workDetail.count}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {!state.isCompany ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#2c3539",
            alignItems: "center",
            borderRadius: 10,
            marginHorizontal: 10,
          }}
          onPress={() =>
            navigation.navigate("CompanySendWorkRequest", { id: id })
          }
        >
          <View
            style={{
              backgroundColor: "#2c3539",
              width: "90%",
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "white",
                bottom: 3,
              }}
            >
              Ажлын санал тавих{"  "}
            </Text>
            <MaterialCommunityIcons
              name="offer"
              size={26}
              color={colors.primaryText}
              style={{ marginRight: 10, bottom: 2 }}
              onPress={() =>
                navigation.navigate("CompanySendWorkRequest", { id: id })
              }
            />
          </View>
        </TouchableOpacity>
      ) : state.companyId === workDetail.createUser ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#2c3539",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("EmployeeEditWork", { data: workDetail })
          }
        >
          <View
            style={{
              backgroundColor: "#2c3539",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "white",
                padding: 15,
              }}
            >
              Зарыг янзлах{"  "}
              <Ionicons
                // send
                name="settings-outline"
                size={20}
                color={colors.primaryText}
                style={{}}
              />
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default EmployeeWorkDetail;

const styles = StyleSheet.create({});
