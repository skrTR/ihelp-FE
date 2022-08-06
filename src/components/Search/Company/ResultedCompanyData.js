import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { api } from "../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import UserContext from "../../../context/UserContext";
import axios from "axios";
const ResultedCompanyData = (props) => {
  const { item, isFollowing, typeName } = props;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [follow, setFollow] = useState(isFollowing);
  const state = useContext(UserContext);
  const onFollow = () => {
    if (follow) {
      setFollow(false);
      axios
        .post(
          `${api}/api/v1/follows/${
            state.isCompany ? state.companyId : state.userId
          }/${item.id}`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFollow(true);
      axios
        .post(
          `${api}/api/v1/follows/${item.id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("ViewCompanyProfile", { id: item._id })
          }
        >
          <Image
            source={{ uri: `${api}/upload/${item.profile}` }}
            style={{ width: 50, height: 50, borderRadius: 30 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: colors.primaryText }}>{item.firstName}</Text>
            <Text style={{ color: colors.secondaryText }}>
              {item.category && item.category.name}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            alignItems: "center",
            alignContent: "center",
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}
          onPress={onFollow}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-bold",
              marginTop: 10,
            }}
          >
            {follow ? "Дагадаг" : "Дагах"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default ResultedCompanyData;

const styles = StyleSheet.create({});
