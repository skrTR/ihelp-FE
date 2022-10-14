import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";
import axios from "axios";
import useCompanyProfile from "../../hooks/ProfileDetail/Company/useCompanyProfile";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component";
const AddWorkTypeModal = (props) => {
  const { data, type, occupationName } = props.route.params;
  const { colors } = useTheme();
  const [isType, setIsType] = useState(1);
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [companyProfile] = useCompanyProfile(state.companyId);
  const [addWork, setAddWork] = useState({
    occupation: data.occupation,
    education: data.education,
    experience: data.experience,
    location: data.location,
    type: data.type,
    salary: data.salary,
    type: data.type,
    gender: data.gender,
    do: data.do,
    skill: data.skill,
    language: data.language,
    schedule: data.schedule,
    order: 0,
    special: 0,
    urgent: 0,
  });

  const sendWork = () => {
    Alert.alert(
      "Анхаар",
      `Таны хэтэвчнээс ${
        isType === 1 && type === "1"
          ? 7
          : isType === 2 && type === "1"
          ? 14
          : isType === 3 && type === "1"
          ? 30
          : isType === 1 && type === "2"
          ? 14
          : isType === 2 && type === "2"
          ? 28
          : isType === 3 && type === "2"
          ? 60
          : isType === 1 && type === "3"
          ? 30
          : isType === 2 && type === "3"
          ? 42
          : isType === 3 && type === "3"
          ? 90
          : null
      } пойнт хасагдаж ${
        isType === 1 ? "7" : isType === 2 ? "14" : "30"
      } хоног энгийн зараар байрших болно.`,
      [
        {
          text: "Үгүй",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Зөвшөөрөх",
          onPress: () => {
            axios
              .post(`${api}/api/v1/jobs/${state.companyId}`, addWork)
              .then((res) => {
                navigation.navigate("Ажилтан авна", {
                  screen: "EmployerWorkDetail",
                });
              })
              .catch((err) => {
                alert(err.message);
                console.log(err);
              });
          },
        },
      ]
    );
  };
  const checkOrders = (text) => {
    if (type === "1") {
      setAddWork({
        ...addWork,
        order: text,
      });
    } else if (type === "2") {
      setAddWork({
        ...addWork,
        special: text,
      });
    } else if (type === "3") {
      setAddWork({
        ...addWork,
        urgent: text,
      });
    }
  };

  if (!companyProfile) {
    return null;
  }
  return (
    <>
      <View
        style={{
          backgroundColor:
            type === "1"
              ? colors.background
              : type === "2"
              ? "#454545"
              : "#2c3539",
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
            style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
          >
            <ImageBackground
              source={{
                uri: `${api}/upload/${companyProfile.profile}`,
              }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 30,
                marginHorizontal: 5,
              }}
              imageStyle={{ borderRadius: 30 }}
            >
              {companyProfile.isEmployer && (
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
              {companyProfile.isEmployee && (
                <View
                  style={{
                    backgroundColor: "#3da4e3",
                    borderRadius: 20,
                    alignItems: "center",
                    position: "absolute",
                    alignSelf: "flex-end",
                    bottom: 0,
                    padding: 5,
                    right: companyProfile.isEmployer ? 20 : 0,
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
                {addWork.salary}₮
              </Text>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-regular",
                  fontWeight: "200",
                }}
              >
                {addWork.type} - {companyProfile.firstName}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{}}>
            <Entypo
              name={"heart-outlined"}
              size={30}
              color={"white"}
              style={{ textAlign: "right", marginRight: 20 }}
            />
          </View>
        </View>
        {type === "3" && (
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
            <CountDown
              until={
                isType === 1
                  ? 7 * 60 * 60 * 24
                  : isType === 2
                  ? 14 * 60 * 60 * 24
                  : 30 * 60 * 60 * 24
              }
              size={12}
              //   digitStyle={{ backgroundColor: "#2c3539" }}
              digitTxtStyle={{ color: "#FFF" }}
              timeLabels={{ d: "Өдөр", h: "Цаг", m: "Минут", s: "Секунд" }}
              timeLabelStyle={{ color: "#FFF" }}
              style={{ marginLeft: 21 }}
            />
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 20,
          }}
          onPress={() => {
            setIsType(1);
            checkOrders(7);
          }}
        >
          <MaterialCommunityIcons
            name={
              isType === 1 ? "checkbox-intermediate" : "checkbox-blank-outline"
            }
            size={25}
            color={isType === 1 ? "#FFB6C1" : colors.primaryText}
          />
          <Text style={{ color: colors.primaryText }}>
            7 хоног -{" "}
            {type === "1"
              ? "7"
              : type === "2"
              ? "14"
              : type === "3"
              ? "30"
              : null}{" "}
            пойнт
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            setIsType(2);
            checkOrders(14);
          }}
        >
          <MaterialCommunityIcons
            name={
              isType === 2 ? "checkbox-intermediate" : "checkbox-blank-outline"
            }
            size={25}
            color={isType === 2 ? "#FFB6C1" : colors.primaryText}
          />
          <Text style={{ color: colors.primaryText }}>
            14 хоног -{" "}
            {type === "1"
              ? "14"
              : type === "2"
              ? "28"
              : type === "3"
              ? "42"
              : null}{" "}
            пойнт
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsType(3);
            checkOrders(30);
          }}
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name={
              isType === 3 ? "checkbox-intermediate" : "checkbox-blank-outline"
            }
            size={25}
            color={isType === 3 ? "#FFB6C1" : colors.primaryText}
          />
          <Text style={{ color: colors.primaryText }}>
            30 хоног -{" "}
            {type === "1"
              ? "30"
              : type === "2"
              ? "60"
              : type === "3"
              ? "90"
              : null}{" "}
            пойнт
          </Text>
        </TouchableOpacity>
      </View>
      {/* Сануулах текст */}
      <View>
        {type === "3" ? (
          <Text
            style={{
              color: colors.secondaryText,
              fontWeight: "100",
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            Энэхүү яаралтай зар нь та зар оруулах үед таны сонгосон мэргэжлээр
            манайд бүртгэлтэй хүмүүст утсанд мэдэгдэл хүрнэ. Зарын хэсгийн
            хамгийн дээр байрлах болно.
          </Text>
        ) : type === "2" ? (
          <Text
            style={{
              color: colors.secondaryText,
              fontWeight: "100",
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            Энэхүү онцгой зар оруулснаар нүүр хуудасны яаралтай зарын доор
            харагдах болно
          </Text>
        ) : (
          <Text
            style={{
              color: colors.secondaryText,
              fontWeight: "100",
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            Энэхүү энгийн зар нь таны зар доогуур байхыг анхаарна уу.
          </Text>
        )}

        <Text
          style={{
            color: "#FFB6C1",
            fontWeight: "100",
            marginHorizontal: 20,
          }}
        >
          Жич: Таны сонгосон хугацаа дуусах үед таны зар идэвхгүй болохыг
          анхаарна уу
        </Text>
      </View>
      <View style={{ marginVertical: 10 }} />
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          marginHorizontal: 10,
          backgroundColor: "#FFB6C1",
        }}
        onPress={sendWork}
      >
        <Text
          style={{
            textAlign: "center",
            color: "black",
          }}
        >
          Идэвхжүүлэх
        </Text>
      </TouchableOpacity>
      <View style={{ marginBottom: 10 }} />
    </>
  );
};

export default AddWorkTypeModal;

const styles = StyleSheet.create({});
