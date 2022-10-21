import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
const CompanyUsedProduct = () => {
  const state = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const getHistory = () => {
    axios
      .get(`${api}/api/v1/transactions/${state.companyId}/cv`)
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <View>
      {history.map((e) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              padding: 20,
              borderRadius: 10,
              borderColor: colors.border,
              margin: 10,
            }}
            key={e._id}
            onPress={() =>
              navigation.navigate("EmployerWorkDetail", { id: e.job })
            }
          >
            <View style={{}}>
              <Text style={{ color: colors.primaryText }}>{e.explanation}</Text>
              <Text style={{ color: colors.primaryText }}>
                {moment(e.createdAt).format("YYYY-MM-DD hh:mm")}
              </Text>
              <Text style={{ color: colors.primaryText, textAlign: "center" }}>
                Үзэх{" "}
                <AntDesign name="totop" size={20} color={colors.primaryText} />
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "green", fontSize: 20, fontWeight: "bold" }}
              >
                {e.firstPoint} P
              </Text>
              <Text
                style={{
                  color: "red",
                  fontSize: 20,
                  fontFamily: "Sf-thin",
                }}
              >
                {e.point}
              </Text>
              <Text
                style={{
                  color: colors.primaryText,
                  fontSize: 16,
                  fontFamily: "Sf-thin",
                }}
              >
                Үлдэгдэл:{" "}
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 16,
                    fontFamily: "Sf-regular",
                  }}
                >
                  {e.firstPoint - e.point}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CompanyUsedProduct;

const styles = StyleSheet.create({});
