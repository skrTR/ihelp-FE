import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import moment from "moment";
import UserContext from "../../../context/UserContext";
import { api } from "../../../../Constants";
import Header from "../../../components/Header/Header";
import CompanyHeader from "../../../components/Header/CompanyHeader";
import Loading from "../../../components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const WalletScreen = () => {
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [sendPoint, setSendPoint] = useState(1);
  const [loading, setLoading] = useState(false);
  const insents = useSafeAreaInsets();
  const [data, setData] = useState([]);
  let isMounted = true;
  const getUser = () => {
    axios
      .get(
        `${api}/api/v1/cvs/${state.isCompany ? state.companyId : state.userId}`
      )
      .then((res) => {
        if (isMounted) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let setMnt = sendPoint * 1000;
  const postWallet = () => {
    setLoading(true);
    axios
      .post(
        `${api}/api/v1/cvs/invoice/${
          state.isCompany ? state.companyId : state.userId
        }`,
        { amount: setMnt }
      )
      .then((res) => {
        navigation.push("SendMoneyScreen", {
          money: setMnt,
          invoince: res.data.data,
        });
        setModalVisible(!modalVisible);
        setLoading(false);
      })
      .catch((err) => {
        let message = err.message;

        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        else {
          message === err.response.data.error.message;
        }
        Alert.alert(message);
        setLoading(false);
      });
  };

  const getTransactionHistory = () => {
    axios
      .get(
        `${api}/api/v1/transactions/${
          state.isCompany ? state.companyId : state.userId
        }/cv`
      )
      .then((res) => {
        if (isMounted) {
          setTransactions(res.data.data);
        }
      })
      .catch((err) => {
        alert(err, "transaction");
      });
  };
  useEffect(() => {
    getTransactionHistory();
    getUser();
    return () => {
      isMounted = false;
    };
  }, []);
  if (!data) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: colors.header,
        opacity: modalVisible ? 0.1 : 1,
        paddingTop: insents.top,
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {state.isCompany ? (
            <CompanyHeader isBack={true} />
          ) : (
            <Header isBack={true} />
          )}
          <ScrollView style={{ backgroundColor: colors.background }}>
            <Text
              style={{
                color: colors.primaryText,
                textAlign: "center",
                fontFamily: "Sf-bold",
                marginVertical: 20,
                fontSize: 20,
              }}
            >
              Хэтэвч
            </Text>
            <LinearGradient
              colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
              style={{
                height: 250,
                borderRadius: 20,
                marginHorizontal: 10,
                alignItems: "center",
                alignContent: "center",
              }}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: "Sf-regular",
                  fontSize: 20,
                  position: "absolute",
                  top: 10,
                  left: 10,
                }}
              >
                {data && data.firstName}
              </Text>
              <View>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    textAlignVertical: "center",
                    marginTop: 80,
                    fontSize: 40,
                  }}
                >
                  {data.point &&
                    data.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    textAlignVertical: "center",
                    fontSize: 30,
                    fontFamily: "Sf-thin",
                  }}
                >
                  ipoint
                </Text>
              </View>
              <Text
                style={{
                  alignSelf: "flex-end",
                  fontSize: 14,
                  color: "white",
                  fontFamily: "Sf-thin",
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                1 ipoint = 1000 ₮
              </Text>
            </LinearGradient>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                marginTop: 25,
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFB6C1",
                  marginHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate("PointUseScreen")}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: colors.border,
                    }}
                  >
                    Хэрэглэх
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFB6C1",
                  marginHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 10,
                }}
                onPress={() => setModalVisible(true)}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",

                      color: colors.border,
                    }}
                  >
                    {" "}
                    Цэнэглэх
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                backgroundColor: colors.background,
              }}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  textAlign: "center",
                  fontWeight: "bold",
                  marginVertical: 20,
                  fontSize: 20,
                }}
              >
                Гүйлгээний түүх
              </Text>
              {transactions.map((item) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderWidth: 1,
                      padding: 20,
                      borderRadius: 10,
                      borderColor: colors.border,
                      marginTop: 10,
                    }}
                    key={item._id}
                  >
                    <View style={{}}>
                      <Text style={{ color: colors.primaryText }}>
                        {item.explanation}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        {moment(item.createdAt).format(
                          "MMMын DD нд hh цаг:mm минутанд"
                        )}
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: "red",
                          fontSize: 20,
                          fontWeight: "400",
                        }}
                      >
                        {item.point} ipoint
                      </Text>
                      <Text
                        style={{
                          color: colors.border,
                          fontSize: 20,
                          fontFamily: "Sf-thin",
                        }}
                      >
                        {item.point * 1000} ₮
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                  <View style={{}}>
                    <TextInput
                      value={`${sendPoint}`}
                      onChangeText={setSendPoint}
                      keyboardType="number-pad"
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        borderColor: colors.border,
                      }}
                    />
                  </View>
                  <Text style={{ textAlign: "right", top: 10 }}>
                    {sendPoint
                      ? `${setMnt
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₮`
                      : "0 ₮"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 10,
                      marginTop: 25,
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FFB6C1",
                        borderRadius: 10,
                        marginRight: 20,
                      }}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <View
                        style={{
                          padding: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            paddingHorizontal: 20,
                            color: colors.border,
                          }}
                        >
                          Буцах
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FFB6C1",
                        borderRadius: 10,
                        marginLeft: 10,
                      }}
                      onPress={postWallet}
                    >
                      <View
                        style={{
                          padding: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: colors.border,
                            paddingHorizontal: 22,
                          }}
                        >
                          Авах
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "70%",
    height: "50%",
    padding: 35,
  },
});
