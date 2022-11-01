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
import ModalHeader from "../../../components/ModalHeader";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const SpecialModal = (props) => {
  const { specialModal, setSpecialModal, data, occupationName, isNew } = props;
  const { colors } = useTheme();
  const [isType, setIsType] = useState(1);
  const [date, setDate] = useState(1);
  const navigation = useNavigation();
  const [isWorkDo, setIsWorkDo] = useState(3);
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

  const sendWork = (isTypes, dates, chooses) => {
    if (isWorkDo === 3) {
      return Alert.alert(
        "Та ажил гүйцэтгэгч эсвэл ажил захиалах аль нэгийн заавал сонгоно уу"
      );
    }
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
          : null
      } пойнт хасагдаж ${dates === 1 ? "7" : date === 2 ? "14" : "30"}  хоног ${
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
              .post(`${api}/api/v1/announcements`, {
                price: data.price,
                occupation: data.occupation,
                experience: data.experience,
                description: data.description,
                do: data.do,
                time: data.time,
                organization: state.isCompany ? true : false,
                certificate:
                  isWorkDo === 1
                    ? "Ажил гүйцэтгэгч"
                    : isWorkDo === 2
                    ? "Ажил захиалагч"
                    : null,
                order:
                  isTypes === 1 && dates === 1
                    ? 7
                    : isTypes === 1 && dates === 2
                    ? 14
                    : isTypes === 1 && dates === 3
                    ? 30
                    : 0,
                special:
                  isTypes === 2 && dates === 1
                    ? 7
                    : isTypes === 2 && dates === 2
                    ? 14
                    : isTypes === 2 && dates === 3
                    ? 30
                    : 0,
              })
              .then((res) => {
                navigation.navigate("EmployeeStack", {
                  screen: "EmployeeScreen",
                });
                console.log(res.data.data);
              })
              .catch((err) => {
                Alert.alert(err.response.data.error.message);
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
          {/* Энгийн эсвэл онцгой */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isType === 1 ? "white" : colors.background,
                width: "44%",
                alignItems: "center",
                justifyContent: "center",
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
                width: "44%",
                alignItems: "center",
                justifyContent: "center",
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
          </View>
          {/* Ажил гүйцэтгэгч эсвэл ажил захиалагч */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isWorkDo === 1 ? "white" : colors.background,
                width: "44%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setIsWorkDo(1)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 20,
                  color:
                    isWorkDo === 1 ? colors.background : colors.primaryText,
                  textAlign: "center",
                }}
              >
                Ажил гүйцэтгэгч
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: isWorkDo === 2 ? "white" : colors.background,
                width: "44%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setIsWorkDo(2)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: 20,
                  color:
                    isWorkDo === 2 ? colors.background : colors.primaryText,
                  textAlign: "center",
                }}
              >
                Ажил захиалагч
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor:
                isType === 1 ? colors.background : isType === 2 && "#454545",
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
                    {data.do}

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
                    {occupationName} - {companyProfile.firstName}
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
          </View>
          <View>
            {isType === 2 ? (
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
            onPress={() => sendWork(isType, date)}
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
    </Modal>
  );
};

export default SpecialModal;
