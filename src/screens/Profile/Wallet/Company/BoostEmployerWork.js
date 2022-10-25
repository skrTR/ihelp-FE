import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../../../Constants";
import DataCountDown from "../../../../components/Employer/DataCountDown";
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import MyButton from "../../../../components/MyButton";
import ChooseDateModal from "../../../../components/Modals/ChooseDateModal";

const BoostEmployerWork = (props) => {
  const { type, id } = props.route.params;
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [isType, setIsType] = useState(1);
  const [chooseModal, setChooseModal] = useState(false);
  const [choose, setChoose] = useState("");
  useEffect(() => {
    axios
      .get(`${api}/api/v1/jobs/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const BoostUrgent = (id, l) => {
    Alert.alert(
      "Анхаар",
      `Таны хэтэвчнээс ${
        isType === 1 && type === "3"
          ? 30
          : isType === 2 && type === "3"
          ? 42
          : isType === 3 && type === "3"
          ? 90
          : null
      } пойнт хасагдаж ${
        isType === 1 ? "7" : isType === 2 ? "14" : "30"
      } хоног яаралтай зараар байрших болно.`,
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
              .put(`${api}/api/v1/jobs/${id}/urgent`, { urgent: l })
              .then((res) => {
                alert("Яаралтай зар амжиллтай боллоо");
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
      `Таны хэтэвчнээс ${
        isType === 1 && type === "2"
          ? 14
          : isType === 2 && type === "2"
          ? 28
          : isType === 3 && type === "2"
          ? 60
          : null
      } пойнт хасагдаж ${
        isType === 1 ? "7" : isType === 2 ? "14" : "30"
      } хоног онцгой зараар байрших болно.`,
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
              .put(`${api}/api/v1/jobs/${id}/special`, { special: l })
              .then((res) => {
                alert("Онцгой зар амжиллтай боллоо");
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
      `Таны хэтэвчнээс ${
        isType === 1 && type === "1"
          ? 7
          : isType === 2 && type === "1"
          ? 14
          : isType === 3 && type === "1"
          ? 30
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
          text: "Тийм",
          onPress: () => {
            axios
              .put(`${api}/api/v1/jobs/${id}/order`, { order: l })
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
  const checkChoose = () => {
    setChooseModal(!chooseModal);
  };
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
                  <Ionicons name={"briefcase"} size={12} color={"white"} />
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
                  <Ionicons name={"business"} size={12} color={"white"} />
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
          <DataCountDown
            text={"CV хүлээн авах эцсийн хугацаа:"}
            createdAt={data.urgent}
          />
        )}
      </View>
      <View>
        {type === "1" && (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 20,
                marginTop: 20,
              }}
              onPress={() => {
                setIsType(1);
              }}
            >
              <MaterialCommunityIcons
                name={
                  isType === 1
                    ? "checkbox-intermediate"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={isType === 1 ? "#FFB6C1" : colors.primaryText}
              />
              <Text style={{ color: colors.primaryText }}>
                7 хоног -{" "}
                {type === "1"
                  ? "10"
                  : type === "2"
                  ? "20"
                  : type === "3"
                  ? "50"
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
              }}
            >
              <MaterialCommunityIcons
                name={
                  isType === 2
                    ? "checkbox-intermediate"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={isType === 2 ? "#FFB6C1" : colors.primaryText}
              />
              <Text style={{ color: colors.primaryText }}>
                14 хоног -{" "}
                {type === "1"
                  ? "10"
                  : type === "2"
                  ? "30"
                  : type === "3"
                  ? "50"
                  : null}{" "}
                пойнт
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsType(3);
              }}
              style={{
                marginHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={
                  isType === 3
                    ? "checkbox-intermediate"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={isType === 3 ? "#FFB6C1" : colors.primaryText}
              />
              <Text style={{ color: colors.primaryText }}>
                30 хоног -{" "}
                {type === "1"
                  ? "10"
                  : type === "2"
                  ? "40"
                  : type === "3"
                  ? "50"
                  : null}{" "}
                пойнт
              </Text>
            </TouchableOpacity>
          </>
        )}
        {type === "2" && (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 20,
                marginTop: 20,
              }}
              onPress={() => {
                setIsType(1);
              }}
            >
              <MaterialCommunityIcons
                name={
                  isType === 1
                    ? "checkbox-intermediate"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={isType === 1 ? "#FFB6C1" : colors.primaryText}
              />
              <Text style={{ color: colors.primaryText }}>
                7 хоног -{" "}
                {type === "1"
                  ? "10"
                  : type === "2"
                  ? "20"
                  : type === "3"
                  ? "50"
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
              }}
            >
              <MaterialCommunityIcons
                name={
                  isType === 2
                    ? "checkbox-intermediate"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={isType === 2 ? "#FFB6C1" : colors.primaryText}
              />
              <Text style={{ color: colors.primaryText }}>
                14 хоног -{" "}
                {type === "1"
                  ? "10"
                  : type === "2"
                  ? "30"
                  : type === "3"
                  ? "50"
                  : null}{" "}
                пойнт
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsType(3);
              }}
              style={{
                marginHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={
                  isType === 3
                    ? "checkbox-intermediate"
                    : "checkbox-blank-outline"
                }
                size={25}
                color={isType === 3 ? "#FFB6C1" : colors.primaryText}
              />
              <Text style={{ color: colors.primaryText }}>
                30 хоног -{" "}
                {type === "1"
                  ? "10"
                  : type === "2"
                  ? "40"
                  : type === "3"
                  ? "50"
                  : null}{" "}
                пойнт
              </Text>
            </TouchableOpacity>
          </>
        )}
        {type === "3" && (
          <>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                marginVertical: 5,
                padding: 7,
              }}
            >
              Өдөр сонгох
            </Text>
            <MyButton
              text={choose === "" ? "Өдөр сонгох" : `${choose} хоног`}
              onPress={checkChoose}
            />
          </>
        )}
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
        onPress={() => {
          type === "2" && isType === 3
            ? BoostSpecial(data._id, 30)
            : type === "2" && isType === 2
            ? BoostSpecial(data._id, 14)
            : type === "2" && isType === 1
            ? BoostSpecial(data._id, 7)
            : type === "1" && isType === 3
            ? BoostNormal(data._id, 30)
            : type === "1" && isType === 2
            ? BoostNormal(data._id, 14)
            : type === "1" && isType === 1
            ? BoostNormal(data._id, 7)
            : type === "3"
            ? BoostUrgent(data._id, choose)
            : null;
        }}
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
      <ChooseDateModal
        setChooseModal={setChooseModal}
        chooseModal={chooseModal}
        setChoose={setChoose}
        checkChoose={checkChoose}
      />
    </>
  );
};

export default BoostEmployerWork;

const styles = StyleSheet.create({});
