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
const ProductUsePoint = ({ route }) => {
  const { type } = route.params;
  const { colors } = useTheme();
  const [posts, setPosts] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isEmployer, setIsEmployer] = useState(true);
  useEffect(() => {
    if (type === "post") {
      axios
        .get(`${api}/api/v1/posts/cv?select=photo body isBoost`)
        .then((res) => {
          setPosts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "EmployerBoost") {
      axios
        .get(`${api}/api/v1/profiles/${state.companyId}/jobs`)
        .then((result) => {
          setCompanyJobs(result.data.data);
        })
        .catch((err) => {
          let message = err.message;
          console.log(message);
        });
    }
    axios
      .get(
        `${api}/api/v1/profiles/${state.companyId}?select=category jobNumber firstName profile point`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const PostSpecial = (l) => {
    if (isEmployer) {
      Alert.alert(
        `Ажил хийе дээр онцгой компани болох`,
        `${l} Таны данснаас хасагдах пойнт`,
        [
          {
            text: "Cancel",
            style: "үгүй",
          },
          {
            text: "Tийм",
            onPress: () => {
              axios
                .put(`${api}/api/v1/profiles/special/employer`, {
                  employerSpecial: l,
                })
                .then((res) => {
                  navigation.goBack();
                })
                .catch((err) => {
                  console.log(err, "a");
                });
            },
          },
        ]
      );
    } else {
      Alert.alert(
        `Ажил өгье дээр онцгой компани болох`,
        `${l} Таны данснаас хасагдах пойнт`,
        [
          {
            text: "Cancel",
            style: "үгүй",
          },
          {
            text: "Tийм",
            onPress: () => {
              axios
                .put(`${api}/api/v1/profiles/special/employee`, {
                  employeeSpecial: l,
                })
                .then((res) => {
                  navigation.goBack();
                })
                .catch((err) => {
                  console.log(err, "a");
                });
            },
          },
        ]
      );
    }
  };
  if (!data) {
    return null;
  }
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      {/* {type === "post" ? (
        <>
          {posts.map((item) => {
            return (
              <View
                key={item._id}
                style={{
                  marginHorizontal: 20,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 20,
                  padding: 10,
                  marginTop: 10,
                }}
              >
                {!item.sharePost && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    key={item._id}
                  >
                    {item.photo ? (
                      <Image
                        source={{ uri: `${api}/upload/${item.photo}` }}
                        style={{ width: 50, height: 50 }}
                      />
                    ) : (
                      <Image
                        source={require("../../../../assets/ihelp/companyhead.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                    <Text
                      style={{
                        color: colors.primaryText,
                        width: "76%",
                        marginLeft: 10,
                      }}
                    >
                      {item.body}{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("BoostPost", { data: item });
                      }}
                    >
                      <Feather
                        name={item.isBoost ? "battery-charging" : "battery"}
                        size={24}
                        color={item.isBoost ? "green" : colors.primaryText}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </>
      ) : */}
      {type === "EmployerBoost" ? (
        <>
          {companyJobs.map((data) => {
            console.log(companyJobs);
            return (
              <>
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
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() =>
                          navigation.navigate("EmployerWorkDetail", {
                            id: data._id,
                          })
                        }
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
                      </TouchableOpacity>
                    </View>
                    {data.urgent && <DataCountDown createdAt={data.urgent} />}
                  </View>
                ) : data.isSpecial ? (
                  <View
                    style={{
                      backgroundColor: "#454545",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                      marginHorizontal: 10,
                      borderRadius: 10,
                      marginVertical: 4,
                    }}
                    key={data._id}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        navigation.navigate("ViewCompanyProfile", {
                          id: data._id,
                        })
                      }
                    >
                      <ImageBackground
                        source={{
                          uri: `${api}/upload/${data.profile}`,
                        }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 30,
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
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          {data.name}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Sf-thin",
                            marginVertical: 5,
                          }}
                        >
                          {data.categoryName}
                        </Text>
                        <Text style={{ color: "white" }}>
                          Нийт ажлын байр: {data.jobNumber}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
        style={{
          backgroundColor: !follow ? "#FFB6C1" : null,
          marginHorizontal: 5,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
          width: "25%",
          alignContent: "center",
          height: "50%",
        }}
        onPress={onFollow}
      >
        <View
          style={{
            flexDirection: "row",
            top: 5,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <AntDesign
            name={follow ? "deleteuser" : "adduser"}
            size={24}
            color={!follow ? colors.border : colors.primaryText}
          />
          <Text
            style={{
              textAlign: "center",

              color: !follow ? colors.border : colors.primaryText,
            }}
          >
            {" "}
            {follow ? "Дагадаг" : "Дагах"}
          </Text>
        </View>
      </TouchableOpacity> */}
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.background,
                      marginHorizontal: 10,
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
                      }}
                    >
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() =>
                          navigation.navigate("EmployerWorkDetail", {
                            id: data._id,
                          })
                        }
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
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            );
          })}
        </>
      ) : type === "company" ? (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isEmployer ? "white" : colors.background,
              }}
              onPress={() => setIsEmployer(true)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 20,
                  color: isEmployer ? colors.background : colors.primaryText,
                }}
              >
                Ажил хийе
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: !isEmployer ? "white" : colors.background,
              }}
              onPress={() => setIsEmployer(false)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                  color: !isEmployer ? colors.background : colors.primaryText,
                }}
              >
                Ажил өгье
              </Text>
            </TouchableOpacity>
          </View>
          {["7", "14", "21", "28", "35", "42"].map((l, i) => (
            <TouchableOpacity onPress={() => PostSpecial(l)} key={i}>
              <View
                style={{
                  backgroundColor: "#454545",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  marginVertical: 4,
                }}
                key={data._id}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri: `${api}/upload/${data.profile}`,
                    }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 30,
                    }}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {data.firstName}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Sf-thin",
                        marginVertical: 5,
                      }}
                    >
                      {data.category && data.category.name}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Нийт ажлын байр: {data.jobNumber}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: colors.primaryText }}>{l}хоног</Text>
                  <Text style={{ color: colors.primaryText }}>
                    Үлдэгдэл:{data.point - l}
                  </Text>
                </View>
              </View>
              <View style={{ borderWidth: 1, borderColor: colors.border }} />
            </TouchableOpacity>
          ))}
        </>
      ) : null}
    </ScrollView>
  );
};

export default ProductUsePoint;
