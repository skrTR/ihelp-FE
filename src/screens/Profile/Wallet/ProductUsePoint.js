import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../../../Constants";
import UserContext from "../../../context/UserContext";
import moment from "moment";
import DataCountDown from "../../../components/Employer/DataCountDown";
import Loading from "../../../components/Loading";
const ProductUsePoint = ({ route }) => {
  const { type } = route.params;
  const { colors } = useTheme();
  const [employeeJobs, setEmployeeJobs] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let isMounted = true;
  useEffect(() => {
    if (type === "EmployeeBoost") {
      setLoading(true);
      axios
        .get(
          `${api}/api/v1/profiles/${state.companyId}/announcements?limit=1000`
        )
        .then((res) => {
          if (isMounted) {
            setEmployeeJobs(res.data.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else if (type === "EmployerBoost") {
      setLoading(true);
      axios
        .get(`${api}/api/v1/profiles/${state.companyId}/jobs?limit=1000`)
        .then((result) => {
          if (isMounted) {
            setCompanyJobs(result.data.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          let message = err.message;
          console.log(message);
          setLoading(false);
        });
    }
    () => {
      isMounted = false;
    };
  }, []);

  const BoostEmployerCompany = (point, date, day) => {
    Alert.alert(
      "Санамж",
      `Та ажил хийе дээр ${date} сараар онцлох компани болсноор таны пойнт - ноос ${point} пойнт хасагдахыг анхаарна уу`,
      [
        {
          text: "Үгүй",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            axios
              .put(`${api}/api/v1/profiles/special/employer`, {
                employerSpecial: day,
              })
              .then((res) => {
                alert("Амжиллтай ажил хийе дээр онцлох компани боллоо");
                navigation.goBack();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ]
    );
  };
  const BoostEmployeeCompany = (point, date, day) => {
    Alert.alert(
      "Санамж",
      `Та ажил хийе дээр ${date} сараар онцлох компани болсноор таны пойнт - ноос ${point} пойнт хасагдахыг анхаарна уу`,
      [
        {
          text: "Үгүй",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            axios
              .put(`${api}/api/v1/profiles/special/employee`, {
                employeeSpecial: day,
              })
              .then((res) => {
                alert("Амжиллтай ажил өгье дээр онцлох компани боллоо");
                navigation.goBack();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ]
    );
  };

  if (!data) {
    return null;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={{ backgroundColor: colors.background }}>
          {type === "EmployeeBoost" ? (
            <>
              {employeeJobs.map((data) => {
                return (
                  <View key={data._id}>
                    {data.isUrgent ? (
                      <View
                        style={{
                          backgroundColor: "#2c3539",
                          marginHorizontal: 5,
                          paddingVertical: 5,
                          marginVertical: 4,
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 4,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <ImageBackground
                              source={{
                                uri: `${api}/upload/${data.profile}`,
                              }}
                              style={{
                                width: 75,
                                height: 75,
                                borderRadius: 30,
                                marginHorizontal: 5,
                              }}
                              imageStyle={{ borderRadius: 30 }}
                            >
                              {data.isEmployer && (
                                <View
                                  style={{
                                    backgroundColor: "#ff914d",
                                    borderRadius: 20,
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
                              {data.isEmployee && (
                                <View
                                  style={{
                                    backgroundColor: "#3da4e3",
                                    borderRadius: 20,
                                    alignItems: "center",
                                    position: "absolute",
                                    alignSelf: "flex-end",
                                    bottom: 0,
                                    padding: 5,
                                    right: data.isEmployer ? 20 : 0,
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

                            <View>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-bold",
                                  fontWeight: "bold",
                                }}
                              >
                                {data.occupationName}
                                {/* Борлуулалт мэдээлэлийн ажилтан */}
                              </Text>

                              <Text
                                style={{
                                  paddingVertical: 5,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-thin",
                                  fontSize: 14,
                                }}
                              >
                                {data.price}₮
                              </Text>

                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontFamily: "Sf-regular",
                                  fontWeight: "200",
                                }}
                              >
                                {data.do} - {data.firstName}
                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FFB6C1",
                              padding: 10,
                              borderRadius: 20,
                              marginRight: 20,
                              alignItems: "center",
                            }}
                            onPress={() =>
                              navigation.navigate("BoostEmployeeWork", {
                                id: data._id,
                                type: "Urgent",
                              })
                            }
                          >
                            <Text style={{ color: "black" }}>
                              {data.urgent < moment().format()
                                ? "Зар идэвхжүүлэх"
                                : "Сунгах"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {data.urgent && (
                          <DataCountDown
                            createdAt={data.urgent}
                            text={"Яааралтай зарын дуусах хугацаа"}
                          />
                        )}
                      </View>
                    ) : data.isSpecial ? (
                      <View
                        style={{
                          backgroundColor: "#454545",
                          marginHorizontal: 5,
                          paddingVertical: 5,
                          marginVertical: 4,
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 4,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <ImageBackground
                              source={{
                                uri: `${api}/upload/${data.profile}`,
                              }}
                              style={{
                                width: 75,
                                height: 75,
                                borderRadius: 30,
                                marginHorizontal: 5,
                              }}
                              imageStyle={{ borderRadius: 30 }}
                            >
                              {data.isEmployer && (
                                <View
                                  style={{
                                    backgroundColor: "#ff914d",
                                    borderRadius: 20,
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
                              {data.isEmployee && (
                                <View
                                  style={{
                                    backgroundColor: "#3da4e3",
                                    borderRadius: 20,
                                    alignItems: "center",
                                    position: "absolute",
                                    alignSelf: "flex-end",
                                    bottom: 0,
                                    padding: 5,
                                    right: data.isEmployer ? 20 : 0,
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

                            <View>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-bold",
                                  fontWeight: "bold",
                                }}
                              >
                                {data.occupationName}
                                {/* Борлуулалт мэдээлэлийн ажилтан */}
                              </Text>

                              <Text
                                style={{
                                  paddingVertical: 5,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-thin",
                                  fontSize: 14,
                                }}
                              >
                                {data.price}₮
                              </Text>

                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontFamily: "Sf-regular",
                                  fontWeight: "200",
                                }}
                              >
                                {data.do} - {data.firstName}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FFB6C1",
                              padding: 10,
                              borderRadius: 20,
                              marginRight: 20,
                              alignItems: "center",
                            }}
                            onPress={() =>
                              navigation.navigate("BoostEmployeeWork", {
                                id: data._id,
                                type: "Special",
                              })
                            }
                          >
                            <Text style={{ color: "black" }}>
                              {data.special < moment().format()
                                ? "Зар идэвхжүүлэх"
                                : "Сунгах"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {data.special && (
                          <DataCountDown
                            createdAt={data.special}
                            text={"Онцгой зарын дуусах хугацаа"}
                          />
                        )}
                      </View>
                    ) : data.order ? (
                      <View
                        style={{
                          backgroundColor: colors.background,
                          marginHorizontal: 5,
                          paddingVertical: 5,
                          marginVertical: 4,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: colors.border,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 4,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <ImageBackground
                              source={{
                                uri: `${api}/upload/${data.profile}`,
                              }}
                              style={{
                                width: 75,
                                height: 75,
                                borderRadius: 30,
                                marginHorizontal: 5,
                              }}
                              imageStyle={{ borderRadius: 30 }}
                            >
                              {data.isEmployer && (
                                <View
                                  style={{
                                    backgroundColor: "#ff914d",
                                    borderRadius: 20,
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
                              {data.isEmployee && (
                                <View
                                  style={{
                                    backgroundColor: "#3da4e3",
                                    borderRadius: 20,
                                    alignItems: "center",
                                    position: "absolute",
                                    alignSelf: "flex-end",
                                    bottom: 0,
                                    padding: 5,
                                    right: data.isEmployer ? 20 : 0,
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

                            <View>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-bold",
                                  fontWeight: "bold",
                                  width: "95%",
                                }}
                              >
                                {data.occupationName}
                                {/* Борлуулалт мэдээлэлийн ажилтан */}
                              </Text>

                              <Text
                                style={{
                                  paddingVertical: 5,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-thin",
                                  fontSize: 14,
                                }}
                              >
                                {data.price}₮
                              </Text>

                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontFamily: "Sf-regular",
                                  fontWeight: "200",
                                  width: "80%",
                                }}
                              >
                                {data.do} - {data.firstName}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FFB6C1",
                              padding: 10,
                              borderRadius: 20,
                              marginRight: 20,
                              alignItems: "center",
                              position: "absolute",
                              right: 0,
                            }}
                            onPress={() =>
                              navigation.navigate("BoostEmployeeWork", {
                                id: data._id,
                                type: "Normal",
                              })
                            }
                          >
                            <Text style={{ color: "black" }}>
                              {data.order < moment().format()
                                ? "Идэвхжүүлэх"
                                : "Сунгах"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {data.order && (
                          <DataCountDown
                            createdAt={data.order}
                            text={"Энгийн зарын дуусах хугацаа"}
                          />
                        )}
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </>
          ) : type === "EmployerBoost" ? (
            <>
              {companyJobs.map((data) => {
                return (
                  <View key={data._id}>
                    {data.isUrgent ? (
                      <View
                        style={{
                          backgroundColor: "#2c3539",
                          marginHorizontal: 5,
                          paddingVertical: 5,
                          marginVertical: 4,
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 4,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <ImageBackground
                              source={{
                                uri: `${api}/upload/${data.profile}`,
                              }}
                              style={{
                                width: 75,
                                height: 75,
                                borderRadius: 30,
                                marginHorizontal: 5,
                              }}
                              imageStyle={{ borderRadius: 30 }}
                            >
                              {data.isEmployer && (
                                <View
                                  style={{
                                    backgroundColor: "#ff914d",
                                    borderRadius: 20,
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
                              {data.isEmployee && (
                                <View
                                  style={{
                                    backgroundColor: "#3da4e3",
                                    borderRadius: 20,
                                    alignItems: "center",
                                    position: "absolute",
                                    alignSelf: "flex-end",
                                    bottom: 0,
                                    padding: 5,
                                    right: data.isEmployer ? 20 : 0,
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

                            <View>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-bold",
                                  fontWeight: "bold",
                                  width: "95%",
                                }}
                              >
                                {data.occupationName}
                                {/* Борлуулалт мэдээлэлийн ажилтан */}
                              </Text>

                              <Text
                                style={{
                                  paddingVertical: 5,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-thin",
                                  fontSize: 14,
                                }}
                              >
                                {data.salary}₮
                              </Text>

                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontFamily: "Sf-regular",
                                  fontWeight: "200",
                                }}
                              >
                                {data.type} - {data.firstName}
                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FFB6C1",
                              padding: 10,
                              borderRadius: 20,
                              marginRight: 20,
                              alignItems: "center",
                            }}
                            onPress={() =>
                              navigation.navigate("BoostEmployerWork", {
                                id: data._id,
                                type: "Urgent",
                              })
                            }
                          >
                            <Text style={{ color: "black" }}>
                              {data.urgent < moment().format()
                                ? "Зар идэвхжүүлэх"
                                : "Сунгах"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {data.urgent && (
                          <DataCountDown
                            createdAt={data.urgent}
                            text={"Яааралтай зарын дуусах хугацаа"}
                          />
                        )}
                      </View>
                    ) : data.isSpecial ? (
                      <View
                        style={{
                          backgroundColor: "#454545",
                          marginHorizontal: 5,
                          paddingVertical: 5,
                          marginVertical: 4,
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 4,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <ImageBackground
                              source={{
                                uri: `${api}/upload/${data.profile}`,
                              }}
                              style={{
                                width: 75,
                                height: 75,
                                borderRadius: 30,
                                marginHorizontal: 5,
                              }}
                              imageStyle={{ borderRadius: 30 }}
                            >
                              {data.isEmployer && (
                                <View
                                  style={{
                                    backgroundColor: "#ff914d",
                                    borderRadius: 20,
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
                              {data.isEmployee && (
                                <View
                                  style={{
                                    backgroundColor: "#3da4e3",
                                    borderRadius: 20,
                                    alignItems: "center",
                                    position: "absolute",
                                    alignSelf: "flex-end",
                                    bottom: 0,
                                    padding: 5,
                                    right: data.isEmployer ? 20 : 0,
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

                            <View>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-bold",
                                  fontWeight: "bold",
                                  width: "95%",
                                }}
                              >
                                {data.occupationName}
                                {/* Борлуулалт мэдээлэлийн ажилтан */}
                              </Text>

                              <Text
                                style={{
                                  paddingVertical: 5,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-thin",
                                  fontSize: 14,
                                }}
                              >
                                {data.salary}₮
                              </Text>

                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontFamily: "Sf-regular",
                                  fontWeight: "200",
                                }}
                              >
                                {data.type} - {data.firstName}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FFB6C1",
                              padding: 10,
                              borderRadius: 20,
                              marginRight: 20,
                              alignItems: "center",
                            }}
                            onPress={() =>
                              navigation.navigate("BoostEmployerWork", {
                                id: data._id,
                                type: "Special",
                              })
                            }
                          >
                            <Text style={{ color: "black" }}>
                              {data.special < moment().format()
                                ? "Зар идэвхжүүлэх"
                                : "Сунгах"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {data.special && (
                          <DataCountDown
                            createdAt={data.special}
                            text={"Онцгой зарын дуусах хугацаа"}
                          />
                        )}
                      </View>
                    ) : data.order ? (
                      <View
                        style={{
                          backgroundColor: colors.background,
                          marginHorizontal: 5,
                          paddingVertical: 5,
                          marginVertical: 4,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: colors.border,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 4,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <ImageBackground
                              source={{
                                uri: `${api}/upload/${data.profile}`,
                              }}
                              style={{
                                width: 75,
                                height: 75,
                                borderRadius: 30,
                                marginHorizontal: 5,
                              }}
                              imageStyle={{ borderRadius: 30 }}
                            >
                              {data.isEmployer && (
                                <View
                                  style={{
                                    backgroundColor: "#ff914d",
                                    borderRadius: 20,
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
                              {data.isEmployee && (
                                <View
                                  style={{
                                    backgroundColor: "#3da4e3",
                                    borderRadius: 20,
                                    alignItems: "center",
                                    position: "absolute",
                                    alignSelf: "flex-end",
                                    bottom: 0,
                                    padding: 5,
                                    right: data.isEmployer ? 20 : 0,
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

                            <View>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-bold",
                                  fontWeight: "bold",
                                  width: "95%",
                                }}
                              >
                                {data.occupationName}
                                {/* Борлуулалт мэдээлэлийн ажилтан */}
                              </Text>

                              <Text
                                style={{
                                  paddingVertical: 5,
                                  color: colors.primaryText,
                                  fontFamily: "Sf-thin",
                                  fontSize: 14,
                                }}
                              >
                                {data.salary}₮
                              </Text>

                              <Text
                                style={{
                                  color: colors.primaryText,
                                  fontFamily: "Sf-regular",
                                  fontWeight: "200",
                                }}
                              >
                                {data.type} - {data.firstName}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FFB6C1",
                              padding: 10,
                              borderRadius: 20,
                              marginRight: 20,
                              alignItems: "center",
                            }}
                            onPress={() =>
                              navigation.navigate("BoostEmployerWork", {
                                id: data._id,
                                type: "Normal",
                              })
                            }
                          >
                            <Text style={{ color: "black" }}>
                              {data.order < moment().format()
                                ? "Зар идэвхжүүлэх"
                                : "Сунгах"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {data.order && (
                          <DataCountDown
                            createdAt={data.order}
                            text={"Энгийн зарын дуусах хугацаа"}
                          />
                        )}
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </>
          ) : type === "SpecialCompanyEmployer" ? (
            <>
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployerCompany(100, 1, 30);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    1сар = 100point
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployerCompany(250, 3, 90);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    3сар = 250point
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployerCompany(400, 6, 180);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    6сар = 400point
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployerCompany(600, 12, 365);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    12сар = 600point
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : type === "SpecialCompanyEmployee" ? (
            <>
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployeeCompany(100, 1, 30);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    1сар = 100point
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployeeCompany(250, 3, 90);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    3сар = 250point
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployeeCompany(400, 6, 180);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    6сар = 400point
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 20,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    BoostEmployeeCompany(600, 12, 365);
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>
                    12сар = 600point
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </ScrollView>
      )}
    </>
  );
};

export default ProductUsePoint;
