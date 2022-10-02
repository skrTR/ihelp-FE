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
import UserContext from "../../../context/UserContext";
import { api } from "../../../../Constants";
import axios from "axios";
import CountDown from "react-native-countdown-component";

const WorkBoostModal = (props) => {
  const { occupationName, salary, id } = props.route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [company, setCompany] = useState([]);
  const [isType, setIsType] = useState(2);
  const [normalDay, setNormalDay] = useState(7);
  let isMounted = true;
  const loadCompanyProfile = () => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=profile firstName`)
      .then((res) => {
        if (isMounted) {
          setCompany(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PostSpecial = (i, l) => {
    if (i === "Онцгой зар") {
      Alert.alert(`${i} болгох`, `${l} Таны данснаас хасагдах пойнт`, [
        {
          text: "Cancel",
          style: "үгүй",
        },
        {
          text: "Tийм",
          onPress: () => {
            axios
              .put(`${api}/api/v1/jobs/${id}/special`, {
                special: l,
              })
              .then((res) => {
                navigation.goBack();
              })
              .catch((err) => {
                console.log(err, "a");
              });
          },
        },
      ]);
    }
  };
  useEffect(() => {
    loadCompanyProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!company) {
    return null;
  }
  return (
    <View style={{ backgroundColor: colors.background, height: "100%" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: isType === 2 ? "white" : colors.background,
          }}
          onPress={() => setIsType(2)}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: 20,
              color: isType === 2 ? colors.background : colors.primaryText,
            }}
          >
            Онцгой
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: isType === 3 ? "white" : colors.background,
          }}
          onPress={() => setIsType(3)}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: 10,
              color: isType === 3 ? colors.background : colors.primaryText,
            }}
          >
            Яаралтай
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isType === 2 ? (
          <>
            {["7", "14", "21", "28", "35", "42"].map((l, i) => (
              <TouchableOpacity
                onPress={() => {
                  setNormalDay(l);
                  PostSpecial("Онцгой зар", l);
                }}
                key={i}
                style={{
                  backgroundColor: normalDay === l ? colors.primary : "#454545",
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{
                        uri: `${api}/upload/${company.profile}`,
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
                        {occupationName}
                      </Text>

                      <Text
                        style={{
                          paddingVertical: 5,
                          color: colors.primaryText,
                          fontFamily: "Sf-thin",
                          fontSize: 14,
                        }}
                      >
                        {salary}₮
                      </Text>
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontFamily: "Sf-regular",
                          fontWeight: "200",
                        }}
                      >
                        {company.firstName}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{ color: colors.primaryText, marginRight: 10 }}
                    >
                      {l} хоног
                    </Text>
                    <Text
                      style={{ color: colors.primaryText, marginRight: 10 }}
                    >
                      {l} point
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : isType === 3 ? (
          <>
            {["7", "14", "21", "28", "35", "42"].map((l, i) => (
              <TouchableOpacity
                style={{
                  backgroundColor: normalDay === l ? colors.primary : "#2c3539",
                  marginHorizontal: 5,
                  paddingVertical: 5,
                  marginVertical: 4,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setNormalDay(l);
                }}
                key={i}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 4,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{
                        uri: `${api}/upload/${company.profile}`,
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
                        {occupationName}
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
                        {salary}₮
                      </Text>

                      <Text
                        style={{
                          color: colors.primaryText,
                          fontFamily: "Sf-regular",
                          fontWeight: "200",
                        }}
                      >
                        {company.firstName}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginRight: 10 }}></View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: "Sf-thin",
                      left: 2,
                    }}
                  >
                    CV хүлээн авах эцсийн хугацаа:{" "}
                  </Text>
                  <View>
                    <Text style={{ left: 10, color: colors.primaryText }}>
                      {l * 2} point
                    </Text>
                    <CountDown
                      until={60 * 60 * 24 * l}
                      size={12}
                      digitTxtStyle={{ color: "#FFF" }}
                      timeLabels={{
                        d: "Өдөр",
                        h: "Цаг",
                        m: "Минут",
                        s: "Секунд",
                      }}
                      timeLabelStyle={{ color: "#FFF" }}
                      style={{ marginLeft: 10 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default WorkBoostModal;
