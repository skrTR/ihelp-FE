import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import Header from "../../../components/Header/Header";
import UserContext from "../../../context/UserContext";
import CompanyHeader from "../../../components/Header/CompanyHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SendMoneyScreen = (props) => {
  const { money, invoince } = props.route.params;
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const insents = useSafeAreaInsets();
  const copyKhanBankDans = () => {
    Clipboard.setStringAsync("5011427285");
  };
  const copyBankName = () => {
    Clipboard.setStringAsync("Новелист ХХК");
  };
  const copyGolomtDans = () => {
    Clipboard.setStringAsync("5011427285");
  };

  const copyMoney = () => {
    Clipboard.setStringAsync(money);
  };

  return (
    <View
      style={{
        backgroundColor: colors.header,
        opacity: modalVisible ? 0.1 : 1,
        paddingTop: insents.top,
      }}
    >
      {state.isCompany ? (
        <CompanyHeader isBack={true} />
      ) : (
        <Header isBack={true} />
      )}

      <ScrollView style={{ backgroundColor: colors.background }}>
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{
            height: 150,
            borderRadius: 20,
            marginHorizontal: 10,
            alignItems: "center",
            alignContent: "center",
            marginTop: 10,
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
                fontSize: 40,
                marginTop: 50,
              }}
            >
              {money
                ? money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "0"}
              ₮
            </Text>
          </View>
          <Text
            style={{
              alignSelf: "flex-end",
              fontSize: 14,
              color: "white",
              marginRight: 10,
              fontFamily: "Sf-thin",
              marginTop: 20,
            }}
          >
            {money / 1000} ipoint ={" "}
            {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₮
          </Text>
        </LinearGradient>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              borderWidth: 1,
              padding: 20,
              borderRadius: 10,
              borderColor: colors.border,
            }}
            onPress={() => {
              navigation.navigate("QpayModals", {
                userInvoince: invoince,
              });
            }}
          >
            <AntDesign name="qrcode" size={30} color={colors.secondaryText} />
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Qpay ээр
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              borderWidth: 1,
              padding: 20,
              borderRadius: 10,
              borderColor: colors.border,
            }}
            onPress={() => setModalVisible(true)}
          >
            {/* <FontAwesome name="bank" size={30} color={colors.secondaryText} /> */}
            <AntDesign name="bank" size={30} color={colors.secondaryText} />
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Дансаар
            </Text>
          </TouchableOpacity>
        </View>
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
                    margin: 10,
                    marginTop: 15,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}
                />
                {/* Khan bank */}
                <View>
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Хаан банк
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Данс:
                    </Text>
                    <TouchableOpacity onPress={copyKhanBankDans}>
                      <Text style={{ color: colors.primary }}>5070656893</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Дансны нэр:
                    </Text>
                    <TouchableOpacity onPress={copyBankName}>
                      <Text style={{ color: colors.primary }}>
                        Новелист ХХК
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Гүйлгээний дүн:
                    </Text>
                    <TouchableOpacity onPress={copyMoney}>
                      <Text style={{ color: colors.primary }}>
                        {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        ₮
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Гүйлгээний утга:
                    </Text>
                    <TouchableOpacity onPress={copyMoney}>
                      <Text style={{ color: colors.primary }}>
                        {state.isCompany ? state.email : state.phone}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Golomt bank */}
                <View>
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Голомт банк
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Данс:
                    </Text>
                    <TouchableOpacity onPress={copyGolomtDans}>
                      <Text style={{ color: colors.primary }}>2015161659</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Дансны нэр:
                    </Text>
                    <TouchableOpacity onPress={copyBankName}>
                      <Text style={{ color: colors.primary }}>
                        Новелист ХХК
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Гүйлгээний дүн:
                    </Text>
                    <TouchableOpacity onPress={copyMoney}>
                      <Text style={{ color: colors.primary }}>{money}</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Sf-bold",
                      }}
                    >
                      Гүйлгээний утга:
                    </Text>
                    <TouchableOpacity onPress={copyMoney}>
                      <Text style={{ color: colors.primary }}>
                        {state.isCompany ? state.email : state.phone}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default SendMoneyScreen;

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
    height: "60%",
    padding: 35,
  },
});
