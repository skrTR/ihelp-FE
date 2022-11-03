import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../../Constants";
import axios from "axios";
import UserContext from "../../../../context/UserContext";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component";
import FollowButton from "../../../../components/FollowButton";
import moment from "moment";
const BoostSpecialCompany = (props) => {
  const { colors } = useTheme();
  const [date, setDate] = useState(1);
  const navigation = useNavigation();
  // Яаралтай зарын хугацаа modal
  const [companyProfile, setCompanyProfile] = useState([]);
  const state = useContext(UserContext);
  const getUser = () => {
    axios
      .get(
        `${api}/api/v1/cvs/${state.isCompany ? state.companyId : state.userId}`
      )
      .then((res) => {
        setCompanyProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const sendWork = (dates) => {
    Alert.alert(
      "Анхаар",
      `Таны хэтэвчнээс ${
        dates === 1
          ? 100
          : dates === 2
          ? 200
          : dates === 3
          ? 300
          : dates === 4
          ? 600
          : 0
      } пойнт хасагдаж ${
        dates === 1
          ? "1 сар"
          : dates === 2
          ? "3 сар"
          : dates === 3
          ? "6 сар"
          : dates === 4
          ? "12 сар"
          : ""
      } байрших болно.`,
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
              .put(`${api}/api/v1/profiles/special`, {
                special:
                  dates === 1
                    ? 30
                    : dates === 2
                    ? 90
                    : dates === 3
                    ? 180
                    : dates === 4
                    ? 365
                    : 0,
              })
              .then((res) => {
                navigation.goBack();
                Alert.alert(`Амжиллтай онцлох байгууллага боллоо`);
              })
              .catch((err) => {
                let message = err.message;
                if (message === "Request failed with status code 404")
                  message =
                    "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
                else if (message === "Network Error")
                  message =
                    "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
                else {
                  message === err.response.data.error.message;
                }
                Alert.alert(message);
              });
          },
        },
      ]
    );
  };
  if (!companyProfile) {
    return null;
  }

  return (
    <View style={{ backgroundColor: colors.background, height: "100%" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 10 }}
      >
        <View
          style={{
            backgroundColor: "#2c3539",
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
              }}
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
                    <Ionicons name={"briefcase"} size={12} color={"white"} />
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
                    <Ionicons name={"business"} size={12} color={"white"} />
                  </View>
                )}
              </ImageBackground>

              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {companyProfile.firstName}
                </Text>
                {companyProfile.categoryName && (
                  <Text
                    style={{
                      color: colors.secondaryText,
                      width:
                        companyProfile.categoryName.length > 12
                          ? "70%"
                          : "100%",
                    }}
                  >
                    {companyProfile.categoryName}
                  </Text>
                )}
                <Text style={{ color: "white" }}>
                  Нийт ажлын байр: {companyProfile.jobNumber}
                </Text>
              </View>
            </TouchableOpacity>
            <FollowButton
              style={{
                backgroundColor: "#FFB6C1",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
                width: 100,
                alignContent: "center",
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: 10,
              }}
            />
          </View>
          {moment(companyProfile.special).format() > moment().format() ? (
            <Text
              style={{
                color: colors.primaryText,
                margin: 10,
                fontWeight: "200",
              }}
            >
              Үлдсэн хугацаа:{" "}
              <Text>{moment(companyProfile.special).format("YYYY-MM-DD")}</Text>
            </Text>
          ) : (
            <Text
              style={{
                color: colors.primaryText,
                margin: 10,
                fontWeight: "200",
              }}
            >
              Идэвхжээгүй
            </Text>
          )}
        </View>
        <>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
            onPress={() => {
              setDate(1);
            }}
          >
            <MaterialCommunityIcons
              name={
                date === 1 ? "checkbox-intermediate" : "checkbox-blank-outline"
              }
              size={25}
              color={date === 1 ? "#FFB6C1" : colors.primaryText}
            />
            <Text style={{ color: colors.primaryText }}>1 сар - 100 пойнт</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
            onPress={() => {
              setDate(2);
            }}
          >
            <MaterialCommunityIcons
              name={
                date === 2 ? "checkbox-intermediate" : "checkbox-blank-outline"
              }
              size={25}
              color={date === 2 ? "#FFB6C1" : colors.primaryText}
            />
            <Text style={{ color: colors.primaryText }}>3 сар - 200 пойнт</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
            onPress={() => {
              setDate(3);
            }}
          >
            <MaterialCommunityIcons
              name={
                date === 3 ? "checkbox-intermediate" : "checkbox-blank-outline"
              }
              size={25}
              color={date === 3 ? "#FFB6C1" : colors.primaryText}
            />
            <Text style={{ color: colors.primaryText }}>6 сар - 300 пойнт</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
            onPress={() => {
              setDate(4);
            }}
          >
            <MaterialCommunityIcons
              name={
                date === 4 ? "checkbox-intermediate" : "checkbox-blank-outline"
              }
              size={25}
              color={date === 4 ? "#FFB6C1" : colors.primaryText}
            />
            <Text style={{ color: colors.primaryText }}>1 жил - 600 пойнт</Text>
          </TouchableOpacity>
        </>
        <View>
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
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.border,
            marginHorizontal: 10,
            backgroundColor: "#FFB6C1",
            marginTop: 20,
          }}
          onPress={() => sendWork(date)}
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
      </ScrollView>
    </View>
  );
};

export default BoostSpecialCompany;
