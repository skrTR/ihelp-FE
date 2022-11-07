import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header/Header";
import CompanyHeader from "../../components/Header/CompanyHeader";
import { api } from "../../../Constants";
import Notfound from "../../components/notfound";
import Toast from "react-native-root-toast";
const EmployeeWorkDetail = (props) => {
  const state = useContext(UserContext);
  const { id, isLiked } = props.route.params;
  const [workDetail, setWorkDetail] = useState();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
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
        setError(null);
      })
      .catch((err) => {
        let message = err.message;
        setError(true);
        setErrorMessage(message);
      });
  };
  useEffect(() => {
    getWorkDetail();
  }, [isFocused]);
  if (error) {
    return <Notfound isHeader={true} message={errorMessage} />;
  }
  const unLiked = () => {
    axios
      .delete(`${api}/api/v1/likes/${id}/job`)
      .then((res) => {
        setIsLike(false);
        Toast.show("Хадгалсан зараас устлаа", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "#FFB6C1",
        });
      })
      .catch((err) => {
        let text = err.message;
        if (text === "Network Error") {
          text ===
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 429") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "403 Forbidden") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 404") {
          text = "Сервер таны хүсэлтийг олсонгүй";
        } else if (text === "Request failed with status code 408") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 413") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 500") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 502") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 504") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text == "JSON Parse error: Unrecognized token '<'") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        }
        Toast.show(text, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "red",
        });
      });
  };
  const liked = () => {
    axios
      .post(`${api}/api/v1/likes/${id}/announcement`)
      .then((res) => {
        setIsLike(true);
        Toast.show("Амжилтай хадгаллаа", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "#FFB6C1",
        });
      })
      .catch((err) => {
        let text = err.message;
        if (text === "Network Error") {
          text ===
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 429") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "403 Forbidden") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 404") {
          text = "Сервер таны хүсэлтийг олсонгүй";
        } else if (text === "Request failed with status code 408") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 413") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 500") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 502") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text === "Request failed with status code 504") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        } else if (text == "JSON Parse error: Unrecognized token '<'") {
          text === "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу";
        }
        Toast.show(text, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          textColor: "black",
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "red",
        });
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
      {workDetail && (
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View style={{ margin: 10 }}>
            {/* Company */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#2c3539",
                justifyContent: "space-between",
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={() => {
                workDetail.organization
                  ? navigation.navigate("ViewCompanyProfile", {
                      id: workDetail.createUser,
                    })
                  : navigation.navigate("ViewUserProfile", {
                      id: workDetail.createUser,
                    });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 15,
                }}
              >
                <ImageBackground
                  source={{
                    uri: `${api}/upload/${workDetail.profile}`,
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
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
                      <Ionicons name={"briefcase"} size={12} color={"white"} />
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
                      <Ionicons name={"business"} size={12} color={"white"} />
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
                      width: "90%",
                    }}
                  >
                    {workDetail.firstName}
                  </Text>
                  {workDetail.comCategoryName && (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: colors.primaryText,
                        fontFamily: "Sf-thin",
                        marginVertical: 7,
                        width:
                          workDetail.comCategoryName.length > 12
                            ? "70%"
                            : "100%",
                      }}
                    >
                      {workDetail.comCategoryName}
                    </Text>
                  )}
                  <Text
                    style={{ color: colors.primaryText, fontFamily: "Sf-bold" }}
                  >
                    Нийт оруулсан зар: {workDetail.announcementNumber}
                  </Text>
                </View>
              </View>
              <AntDesign
                name="right"
                size={40}
                color={colors.primaryText}
                style={{ position: "absolute", right: 10 }}
              />
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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
              {workDetail.occupationName === "Сонгох" ? null : (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text
                    style={{ marginBottom: 8, color: "white", width: "40%" }}
                  >
                    Чиглэл
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginBottom: 8,
                      width: "40%",
                    }}
                  >
                    {workDetail.occupationName}
                  </Text>
                </View>
              )}
              {workDetail.do === "" ? null : (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text
                    style={{ marginBottom: 8, color: "white", width: "40%" }}
                  >
                    Үйлчилгээ
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginBottom: 8,
                      width: "40%",
                    }}
                  >
                    {workDetail.do}
                  </Text>
                </View>
              )}
              {workDetail.experience === "" ? null : (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text
                    style={{ marginBottom: 8, color: "white", width: "40%" }}
                  >
                    Туршлага
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginBottom: 8,
                      width: "40%",
                    }}
                  >
                    {workDetail.experience}
                  </Text>
                </View>
              )}
              {workDetail.price === "Сонгох" ? null : (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text
                    style={{ marginBottom: 8, color: "white", width: "40%" }}
                  >
                    Үнийн санал
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    {workDetail.price}
                  </Text>
                </View>
              )}
              {workDetail.time === "" ? null : (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text
                    style={{ marginBottom: 8, color: "white", width: "40%" }}
                  >
                    Хугацаа
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    {workDetail.time}
                  </Text>
                </View>
              )}
              {workDetail.description === "" ? null : (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text
                    style={{ marginBottom: 8, color: "white", width: "40%" }}
                  >
                    Нэмэлт тайлбар
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginBottom: 8,
                      width: "40%",
                    }}
                  >
                    {workDetail.description}
                  </Text>
                </View>
              )}
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
          {state.companyId === workDetail.createUser ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2c3539",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                margin: 10,
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
                  Зарыг янзлах
                </Text>
              </View>
            </TouchableOpacity>
          ) : state.userId === workDetail.createUser ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2c3539",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                margin: 10,
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
                  Зарыг янзлах
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
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
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  padding: 15,
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Ажлын санал тавих
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default EmployeeWorkDetail;

const styles = StyleSheet.create({});
