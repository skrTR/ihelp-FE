import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../../../Constants";
import DataCountDown from "../../../../components/Employer/DataCountDown";

const BoostEmployeeWork = (props) => {
  const { type, id } = props.route.params;
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [isType, setIsType] = useState(1);
  useEffect(() => {
    axios
      .get(`${api}/api/v1/announcements/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const BoostUrgent = (id, l) => {
    Alert.alert(
      "Санамж",
      `Та яаралтай зар болгосноор таны данснаас ${
        l * 3
      } пойнт хасагдахыг анхааран уу `,
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
              .put(`${api}/api/v1/announcements/${id}/urgent`, { urgent: l })
              .then((res) => {
                console.log(res.data.data);
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
  const BoostSpecial = (id, l) => {
    Alert.alert(
      "Санамж",
      `Та яаралтай зар болгосноор таны данснаас ${
        l * 2
      } пойнт хасагдахыг анхааран уу `,
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
              .put(`${api}/api/v1/announcements/${id}/special`, { special: l })
              .then((res) => {
                console.log(res.data.data);
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
  const BoostNormal = (id, l) => {
    Alert.alert(
      "Санамж",
      `Та яаралтай зар болгосноор таны данснаас ${l} пойнт хасагдахыг анхааран уу `,
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
              .put(`${api}/api/v1/announcements/${id}/order`, { order: l })
              .then((res) => {
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
  return (
    <View>
      {type === "Urgent" ? (
        <ScrollView>
          {["7", "14", "30"].map((l, i) => (
            <View key={i}>
              {data && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2c3539",
                    marginHorizontal: 5,
                    paddingVertical: 5,
                    marginVertical: 4,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    BoostSpecial(data._id, l);
                  }}
                >
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 4,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={{
                            uri: `${api}/upload/${data.profile}`,
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
                            }}
                          >
                            {data.occupationName}
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
                      <View style={{ marginRight: 10 }}>
                        <Text style={{ color: colors.primaryText }}>
                          {l} хоног
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          {l === "7"
                            ? "10"
                            : l === "14"
                            ? "20"
                            : l === "30"
                            ? "30"
                            : null}
                          ipoint
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {data.urgent && (
                        <DataCountDown
                          createdAt={data.urgent}
                          text={"Яаралтай зарын үлдсэн хугацаа"}
                        />
                      )}
                    </View>
                  </>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      ) : type === "Special" ? (
        <ScrollView>
          {["7", "14", "30"].map((l, i) => (
            <View key={i}>
              {data && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#454545",
                    marginHorizontal: 5,
                    paddingVertical: 5,
                    marginVertical: 4,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    BoostUrgent(data._id, l);
                  }}
                >
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 4,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={{
                            uri: `${api}/upload/${data.profile}`,
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
                            }}
                          >
                            {data.occupationName}
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
                      <View style={{ marginRight: 10 }}>
                        <Text style={{ color: colors.primaryText }}>
                          {l} хоног
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          {l * 2} ipoint
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {data.special && (
                        <DataCountDown
                          createdAt={data.special}
                          text={"Онцгой зарын үлдсэн хугацаа"}
                        />
                      )}
                    </View>
                  </>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      ) : type === "Normal" ? (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={() => setIsType(1)}
              style={{
                flex: 1,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isType === 1 ? colors.background : "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: isType === 1 ? colors.primaryText : colors.background,
                  textAlign: "center",
                }}
              >
                Энгийн
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsType(2)}
              style={{
                flex: 1,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isType === 2 ? colors.background : "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: isType === 2 ? colors.primaryText : colors.background,
                  textAlign: "center",
                }}
              >
                Онцгой
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsType(3)}
              style={{
                flex: 1,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isType === 3 ? colors.background : "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: isType === 3 ? colors.primaryText : colors.background,
                  textAlign: "center",
                }}
              >
                Яаралтай
              </Text>
            </TouchableOpacity>
          </View>
          {isType === 1 ? (
            // Энгийн
            <ScrollView>
              {["7", "14", "30"].map((l, i) => (
                <View key={i}>
                  {data && (
                    <TouchableOpacity
                      style={{
                        marginHorizontal: 5,
                        paddingVertical: 5,
                        marginVertical: 4,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: colors.border,
                      }}
                      onPress={() => {
                        BoostNormal(data._id, l);
                      }}
                    >
                      <>
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
                            <Image
                              source={{
                                uri: `${api}/upload/${data.profile}`,
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
                                }}
                              >
                                {data.occupationName}
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
                          <View style={{ marginRight: 10 }}>
                            <Text style={{ color: colors.primaryText }}>
                              {l} хоног
                            </Text>
                            <Text style={{ color: colors.primaryText }}>
                              {l} ipoint
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {data.order && (
                            <DataCountDown
                              createdAt={data.order}
                              text={"Энгийн зарын үлдсэн хугацаа"}
                            />
                          )}
                        </View>
                      </>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          ) : isType === 2 ? (
            // Special
            <ScrollView>
              {["7", "14", "30"].map((l, i) => (
                <View key={i}>
                  {data && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#454545",
                        marginHorizontal: 5,
                        paddingVertical: 5,
                        marginVertical: 4,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        BoostUrgent(data._id, l);
                      }}
                    >
                      <>
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
                            <Image
                              source={{
                                uri: `${api}/upload/${data.profile}`,
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
                                }}
                              >
                                {data.occupationName}
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
                          <View style={{ marginRight: 10 }}>
                            <Text style={{ color: colors.primaryText }}>
                              {l} хоног
                            </Text>
                            <Text style={{ color: colors.primaryText }}>
                              {l * 2} ipoint
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {data.special && (
                            <DataCountDown
                              createdAt={data.special}
                              text={"Онцгой зарын үлдсэн хугацаа"}
                            />
                          )}
                        </View>
                      </>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          ) : isType === 3 ? (
            // яаралтай
            <ScrollView>
              {["7", "14", "30"].map((l, i) => (
                <View key={i}>
                  {data && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#2c3539",
                        marginHorizontal: 5,
                        paddingVertical: 5,
                        marginVertical: 4,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        BoostSpecial(data._id, l);
                      }}
                    >
                      <>
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
                            <Image
                              source={{
                                uri: `${api}/upload/${data.profile}`,
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
                                }}
                              >
                                {data.occupationName}
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
                          <View style={{ marginRight: 10 }}>
                            <Text style={{ color: colors.primaryText }}>
                              {l} хоног
                            </Text>
                            <Text style={{ color: colors.primaryText }}>
                              {l === "7"
                                ? "10"
                                : l === "14"
                                ? "20"
                                : l === "30"
                                ? "30"
                                : null}{" "}
                              ipoint
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {data.urgent && (
                            <DataCountDown
                              createdAt={data.urgent}
                              text={"Яаралтай зарын үлдсэн хугацаа"}
                            />
                          )}
                        </View>
                      </>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default BoostEmployeeWork;

const styles = StyleSheet.create({});
