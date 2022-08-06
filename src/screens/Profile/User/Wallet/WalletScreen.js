import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import UserContext from "../../../../context/UserContext";
import { api } from "../../../../../Constants";
import Header from "../../../../components/Header/Header";
import CompanyHeader from "../../../../components/Header/CompanyHeader";
const WalletScreen = ({ route }) => {
  const { point } = route.params;
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [sendPoint, setSendPoint] = useState(1000);
  let isMounted = true;
  const postWallet = () => {
    axios
      .post(
        `${api}/api/v1/cvs/invoice/${
          state.isCompany ? state.companyId : state.userId
        }`,
        { amount: sendPoint }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message, "postWallet");
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
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.header,
        opacity: modalVisible ? 0.1 : 1,
      }}
    >
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
              {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              marginTop: 60,
              fontSize: 14,
              color: "white",
              marginRight: 10,
              fontFamily: "Sf-thin",
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
                flexDirection: "row",
                alignSelf: "center",
                paddingHorizontal: 20,
              }}
            >
              <Entypo name="documents" size={24} color={colors.border} />
              <Text
                style={{ textAlign: "center", top: 3, color: colors.border }}
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
                flexDirection: "row",
                alignSelf: "center",
                paddingHorizontal: 20,
              }}
            >
              <AntDesign name="setting" size={24} color={colors.border} />
              <Text
                style={{ textAlign: "center", top: 3, color: colors.border }}
              >
                {" "}
                Цэнэглэх
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{ marginHorizontal: 20, backgroundColor: colors.background }}
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
                  borderRadius: 20,
                  borderColor: colors.border,
                  marginTop: 10,
                }}
                key={item._id}
              >
                <View style={{}}>
                  <Text style={{ color: colors.primaryText }}>
                    Пойнт цэнэглэлт
                  </Text>
                  <Text style={{ color: colors.primaryText }}>
                    {moment(item.createdAt).format(
                      "MMMын DD нд hh цаг:mm минутанд"
                    )}
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ color: "green", fontSize: 20, fontWeight: "bold" }}
                  >
                    +{item.point / 1000} P
                  </Text>
                  <Text
                    style={{
                      color: colors.border,
                      fontSize: 20,
                      fontFamily: "Sf-thin",
                    }}
                  >
                    -{item.point} ₮
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
              <MaterialCommunityIcons
                name="backspace-outline"
                size={30}
                color="black"
                style={{
                  fontSize: 20,
                  position: "absolute",
                  right: 10,
                  marginTop: 10,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <View style={{}}>
                <TextInput
                  value={`${
                    sendPoint &&
                    sendPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }₮`}
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
                {sendPoint ? `${sendPoint / 1000} ipoint` : "0 ipoint"}
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
                    marginRight: 10,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      padding: 10,
                    }}
                  >
                    <AntDesign name="left" size={24} color={colors.border} />
                    <Text
                      style={{
                        textAlign: "center",
                        top: 3,
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
                  onPress={() => {
                    navigation.push("SendMoneyScreen", {
                      money: sendPoint,
                      id: state.isCompany ? state.companyId : state.userId,
                    });
                    postWallet();
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      padding: 10,
                    }}
                  >
                    <MaterialIcons
                      name="attach-money"
                      size={24}
                      color={colors.border}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        top: 3,
                        color: colors.border,
                        paddingHorizontal: 3,
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
    </SafeAreaView>
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
    height: "20%",
    padding: 35,
  },
});
