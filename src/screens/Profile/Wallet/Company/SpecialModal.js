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
import ModalHeader from "../../../../components/ModalHeader";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../../Constants";
import axios from "axios";
import UserContext from "../../../../context/UserContext";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component";
import ChooseDateModal from "../../../../components/Modals/ChooseDateModal";
import MyButton from "../../../../components/MyButton";
const SpecialModal = (props) => {
  const { specialModal, setSpecialModal, data, occupationName } = props;
  const { colors } = useTheme();
  const [isType, setIsType] = useState(1);
  const [date, setDate] = useState(1);
  const navigation = useNavigation();
  // Яаралтай зарын хугацаа modal
  // chooseModal, setChooseModal, setChoose, checkChoose
  const [chooseModal, setChooseModal] = useState(false);
  const [choose, setChoose] = useState("");
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
  const checkChoose = () => {
    setChooseModal(!chooseModal);
  };

  const sendWork = (isTypes, dates, chooses) => {
    Alert.alert(
      "Анхаар",
      `Таны хэтэвчнээс ${
        isTypes === 1
          ? 10
          : isTypes === 2 && dates === 1
          ? 20
          : isTypes === 2 && dates === 2
          ? 30
          : isTypes === 2 && dates === 3
          ? 40
          : isTypes === 3
          ? 50
          : null
      } пойнт хасагдаж ${
        isTypes === 3 ? chooses : dates === 1 ? "7" : date === 2 ? "14" : "30"
      }  хоног ${
        isTypes === 1
          ? "энгийн зараар"
          : isTypes === 2
          ? "онцгой зараар"
          : "яаралтай"
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
              .put(
                `${api}/api/v1/jobs/${data._id}/${
                  isTypes === 1
                    ? "order"
                    : isTypes === 2
                    ? "special"
                    : isTypes === 3
                    ? "urgent"
                    : null
                }`,
                {
                  urgent: isTypes === 3 ? chooses : 0,
                  special:
                    dates === 1 ? 7 : dates === 2 ? 14 : dates === 3 ? 30 : 0,
                  order:
                    dates === 1 ? 7 : dates === 2 ? 14 : dates === 3 ? 30 : 0,
                }
              )
              .then((res) => {
                navigation.goBack();
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
    <Modal
      animationType="slide"
      visible={specialModal}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setSpecialModal(!specialModal);
      }}
    >
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <ModalHeader
          text="Зар оруулах"
          clicked={() => setSpecialModal(false)}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 10 }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isType === 1 ? "white" : colors.background,
              }}
              onPress={() => setIsType(1)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 20,
                  color: isType === 1 ? colors.background : colors.primaryText,
                }}
              >
                Энгийн
              </Text>
            </TouchableOpacity>
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
          <View
            style={{
              backgroundColor:
                isType === 1
                  ? colors.background
                  : isType === 2
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
                    {data.salary}₮
                  </Text>
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: "Sf-regular",
                      fontWeight: "200",
                    }}
                  >
                    {data.type} - {companyProfile.firstName}
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
            {isType === 3 && choose && (
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
                  until={choose * 60 * 60 * 24}
                  size={12}
                  //   digitStyle={{ backgroundColor: "#2c3539" }}
                  digitTxtStyle={{ color: "#FFF" }}
                  timeLabels={{
                    d: "Өдөр",
                    h: "Цаг",
                    m: "Минут",
                    s: "Секунд",
                  }}
                  timeLabelStyle={{ color: "#FFF" }}
                  style={{ marginLeft: 21 }}
                />
              </View>
            )}
          </View>
          <View>
            {isType === 1 && (
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
                    // checkOrders(7);
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      date === 1
                        ? "checkbox-intermediate"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={date === 1 ? "#FFB6C1" : colors.primaryText}
                  />
                  <Text style={{ color: colors.primaryText }}>
                    7 хоног - 10 пойнт
                  </Text>
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
                    // checkOrders(7);
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      date === 2
                        ? "checkbox-intermediate"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={date === 2 ? "#FFB6C1" : colors.primaryText}
                  />
                  <Text style={{ color: colors.primaryText }}>
                    14 хоног - 10 пойнт
                  </Text>
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
                    // checkOrders(7);
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      date === 3
                        ? "checkbox-intermediate"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={date === 3 ? "#FFB6C1" : colors.primaryText}
                  />
                  <Text style={{ color: colors.primaryText }}>
                    30 хоног - 10 пойнт
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {isType === 2 && (
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
                    // checkOrders(7);
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      date === 1
                        ? "checkbox-intermediate"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={date === 1 ? "#FFB6C1" : colors.primaryText}
                  />
                  <Text style={{ color: colors.primaryText }}>
                    7 хоног - 20 пойнт
                  </Text>
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
                    // checkOrders(7);
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      date === 2
                        ? "checkbox-intermediate"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={date === 2 ? "#FFB6C1" : colors.primaryText}
                  />
                  <Text style={{ color: colors.primaryText }}>
                    14 хоног - 30 пойнт
                  </Text>
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
                    // checkOrders(7);
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      date === 3
                        ? "checkbox-intermediate"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={date === 3 ? "#FFB6C1" : colors.primaryText}
                  />
                  <Text style={{ color: colors.primaryText }}>
                    30 хоног - 40 пойнт
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {isType === 3 && (
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
          <View>
            {isType === 3 ? (
              <Text
                style={{
                  color: colors.secondaryText,
                  fontWeight: "100",
                  marginHorizontal: 20,
                  marginVertical: 20,
                }}
              >
                Энэхүү яаралтай зар нь та зар оруулах үед таны сонгосон
                мэргэжлээр манайд бүртгэлтэй хүмүүст утсанд мэдэгдэл хүрнэ.
                Зарын хэсгийн хамгийн дээр байрлах болно.
              </Text>
            ) : isType === 2 ? (
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
                Энэхүү үйлчилгээний хугацаа нь таныг идэвхжүүлэх товч дарснаар
                ашиглагдаж эхлэх болно.
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
            onPress={() => sendWork(isType, date, choose)}
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
      <ChooseDateModal
        setChooseModal={setChooseModal}
        chooseModal={chooseModal}
        setChoose={setChoose}
        checkChoose={checkChoose}
      />
    </Modal>
  );
};

export default SpecialModal;
