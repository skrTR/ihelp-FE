import {
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Entypo";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header/Header";
import CompanyHeader from "../../components/Header/CompanyHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const EmployerWorkDetail = (props) => {
  const state = useContext(UserContext);
  const { id, isLiked } = props.route.params;
  const [workDetail, setWorkDetail] = useState();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isLike, setIsLike] = useState(isLiked);
  const [isCvSent, setIsCvSent] = useState(false);
  const [checkCvId, setCheckCvId] = useState([]);
  const insents = useSafeAreaInsets();
  const getWorkDetail = () => {
    axios
      .get(`${api}/api/v1/jobs/${id}`)
      .then((res) => {
        setWorkDetail(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getWorkDetail();
  }, []);

  const sendCv = (id) => {
    axios
      .post(`${api}/api/v1/applies/${id}`)
      .then((res) => {
        Alert.alert("Таны CV амжилттай илгээгдлээ.");
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };
  const getCheckCv = () => {
    {
      !state.isCompany &&
        axios
          .get(`${api}/api/v1/applies/${state.userId}/apply`)
          .then((res) => {
            setCheckCvId(res.data.data);
            console.log(res.data.data);
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
    }
  };
  useEffect(() => {
    getCheckCv();
  }, []);
  let cvCheck = checkCvId.map((e) => `${e.job}`);
  useEffect(() => {
    setIsCvSent(cvCheck.includes(`${id}`));
  }, [checkCvId]);

  const unLiked = () => {
    axios
      .delete(`${api}/api/v1/likes/${id}/job`)
      .then((res) => {
        setIsLike(false);
        // Alert.alert("Амжилттай устгалаа");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const liked = () => {
    axios
      .post(`${api}/api/v1/likes/${id}/job`)
      .then((res) => {
        setIsLike(true);
        Alert.alert("Амжилттай хадгаллаа");
      })
      .catch((err) => {
        alert(err);
      });
  };
  if (!workDetail) {
    return null;
  }
  return (
    <View style={{ backgroundColor: colors.header, paddingTop: insents.top }}>
      {state.isCompany ? (
        <CompanyHeader isBack={true} />
      ) : (
        <Header isBack={true} />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background }}
      >
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
                padding: 15,
              }}
            >
              <Image
                source={{
                  uri: `${api}/upload/${workDetail.profile}`,
                }}
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Sf-bold",
                  }}
                >
                  {workDetail.firstName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Sf-thin",
                    marginVertical: 7,
                  }}
                >
                  {workDetail.comCategoryName && workDetail.comCategoryName}
                </Text>
                <Text style={{ color: "white", fontFamily: "Sf-bold" }}>
                  Нийт ажлын байр: {workDetail.comJobNumber}
                </Text>
              </View>
            </View>
            <AntDesign
              name="right"
              size={30}
              color={colors.primaryText}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          {/* aguulga */}
          <View
            style={{
              backgroundColor: "#454545",
              padding: 30,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            {/* Үндсэн мэдээлэл */}
            {workDetail.salary === "Сонгох" ? null : (
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
                    color: "white",
                    bottom: 8,
                  }}
                >
                  Үндсэн мэдээлэл
                </Text>
                {!state.isCompany && (
                  <Icon
                    name={isLike ? "heart" : "heart-outlined"}
                    size={30}
                    color={"white"}
                    onPress={isLike ? unLiked : liked}
                    style={{ textAlign: "right" }}
                  />
                )}
              </View>
            )}
            {workDetail.type === "Сонгох" ? null : (
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text style={{ marginBottom: 8, color: "white", width: "40%" }}>
                  Төрөл
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                    width: "40%",
                  }}
                >
                  {workDetail.type}
                </Text>
              </View>
            )}
            {workDetail.salary === "Сонгох" ? null : (
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text style={{ marginBottom: 8, color: "white", width: "40%" }}>
                  Цалин
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                  }}
                >
                  {workDetail.salary}
                </Text>
              </View>
            )}
            {!workDetail.location ? null : (
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text style={{ marginBottom: 8, color: "white", width: "40%" }}>
                  Байршил
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                    width: "60%",
                  }}
                >
                  {workDetail.location}
                </Text>
              </View>
            )}
            {workDetail.gender === "Сонгох" ? null : (
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text style={{ marginBottom: 8, color: "white", width: "40%" }}>
                  Хүйс
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                  }}
                >
                  {workDetail.gender}
                </Text>
              </View>
            )}
            {!workDetail.schedule ? null : (
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text style={{ marginBottom: 8, color: "white", width: "40%" }}>
                  Цагийн хуваарь
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                  }}
                >
                  {workDetail.schedule}
                </Text>
              </View>
            )}
            {workDetail.do === "" ? null : (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 10,
                    color: "white",
                  }}
                >
                  Гүйцэтгэх үндсэн үүрэг
                </Text>
                <View style={{ marginLeft: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign
                      name="checkcircleo"
                      size={18}
                      color={"#FFB6C1"}
                    />
                    <Text
                      style={{ color: "white", width: "90%", marginLeft: 10 }}
                    >
                      {workDetail.do}
                    </Text>
                  </View>
                </View>
              </>
            )}
            {workDetail.education === "Сонгох" ? null : (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 10,
                    color: "white",
                  }}
                >
                  Tавигдах шаардлага
                </Text>
                <View style={{ marginLeft: 10 }}>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text
                      style={{ marginBottom: 8, color: "white", width: "40%" }}
                    >
                      • Боловсрол:{" "}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        marginBottom: 8,
                      }}
                    >
                      {workDetail.education}
                    </Text>
                  </View>
                  {workDetail.experience === "Сонгох" ? null : (
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <Text
                        style={{
                          marginBottom: 8,
                          color: "white",
                          width: "40%",
                        }}
                      >
                        • Tуршлага (жил):{" "}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          marginBottom: 8,
                        }}
                      >
                        {workDetail.experience}
                      </Text>
                    </View>
                  )}
                  {!workDetail.language ? null : (
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <Text
                        style={{
                          marginBottom: 8,
                          color: "white",
                          width: "40%",
                        }}
                      >
                        • Гадаад хэл:{" "}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          marginBottom: 8,
                        }}
                      >
                        {workDetail.language}
                      </Text>
                    </View>
                  )}
                </View>
              </>
            )}
            {workDetail.skill === "" ? null : (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 10,
                    color: "white",
                  }}
                >
                  Шаардагдах чадвар
                </Text>
                <View style={{ marginLeft: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="checkmark-done-circle-outline"
                      size={24}
                      color={"#FFB6C1"}
                    />
                    <Text
                      style={{ color: "white", width: "90%", marginLeft: 10 }}
                    >
                      {workDetail.skill}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
        <View style={{ paddingBottom: 100 }}>
          {!state.isCompany ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2c3539",
                alignItems: "center",
                borderRadius: 10,
                marginHorizontal: 10,
              }}
              onPress={() => sendCv(workDetail._id)}
            >
              <View
                style={{
                  backgroundColor: "#2c3539",
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                }}
              >
                {isCvSent ? (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Анкет илгээсэн байна{" "}
                    <Ionicons
                      // send
                      name="send-outline"
                      size={20}
                      color={colors.primaryText}
                      style={{}}
                    />
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Анкет илгээх{" "}
                    <Ionicons
                      // send
                      name="send-outline"
                      size={20}
                      color={colors.primaryText}
                      style={{}}
                    />
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ) : state.companyId === workDetail.createUser ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2c3539",
                alignItems: "center",
                borderRadius: 10,
                marginBottom: 200,
                margin: 10,
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("EmployerEditWork", { data: workDetail })
              }
            >
              <View
                style={{
                  backgroundColor: "#2c3539",
                  width: "90%",
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Зарыг янзлах
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
      </ScrollView>
    </View>
  );
};

export default EmployerWorkDetail;
