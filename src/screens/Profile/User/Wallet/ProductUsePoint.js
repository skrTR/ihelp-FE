import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import moment from "moment";
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
    } else if (type === "work") {
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
      {type === "post" ? (
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
                        source={require("../../../../../assets/ihelp/companyhead.png")}
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
      ) : type === "work" ? (
        <>
          {companyJobs.map((data) => {
            return (
              <View
                style={{
                  backgroundColor: "#454545",
                  marginHorizontal: 10,
                  paddingVertical: 15,
                  marginVertical: 4,
                  borderRadius: 10,
                }}
              >
                {data.createUser && (
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
                        navigation.navigate("WorkBoostModal", {
                          occupationName: data.occupation.name,
                          salary: data.salary,
                          id: data._id,
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: `${api}/upload/${data.createUser.profile}`,
                        }}
                        style={{
                          width: 75,
                          height: 75,
                          borderRadius: 30,
                          marginHorizontal: 5,
                        }}
                      />

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
                          {data.occupation && data.occupation.name}
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
                          {data.type} - {data.createUser.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: colors.primaryText,
                            fontFamily: "Sf-regular",
                          }}
                        >
                          Төрөл: {data.isEmployer ? "Ажил хийе" : "Ажил өгье"}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.primaryText,
                            fontFamily: "Sf-thin",
                          }}
                        >
                          {moment() < moment(data.urgent)
                            ? `Дуусax:${moment(data.urgent).fromNow()}`
                            : moment() < moment(data.urgent)
                            ? `Дуусax:${moment(data.special).fromNow()}`
                            : "Онцгой болон яааралтай сонгоогүй"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
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
