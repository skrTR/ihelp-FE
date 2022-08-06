import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { api } from "../../../../../Constants";
const QpayModal = ({ route }) => {
  const { userInvoince } = route.params;
  const { colors } = useTheme();
  const [banks, setBanks] = useState([]);
  const getBanks = () => {
    axios
      .get(`${api}/api/v1/wallets/${userInvoince}`)
      .then((res) => {
        setBanks(res.data.data.urls);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getBanks();
  }, []);
  return (
    <View>
      <FlatList
        data={banks}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{}}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`${item.link}`)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 20,
                  marginVertical: 3,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={{ uri: `${item.logo}` }}
                  style={{ width: 80, height: 80, borderRadius: 20 }}
                />
                <Text style={{ color: colors.primaryText, marginLeft: 20 }}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default QpayModal;

const styles = StyleSheet.create({});
