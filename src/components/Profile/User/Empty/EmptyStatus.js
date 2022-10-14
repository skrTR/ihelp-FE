import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Border from "../../../Border";
import { AntDesign } from "@expo/vector-icons";
const EmptyStatus = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View>
      <Border />
      <View style={{ marginHorizontal: 10 }}>
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: "Sf-bold",
            fontSize: 20,
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          Танд санал болгож байна
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="eyeo" size={24} color={colors.secondaryText} />
          <Text
            style={{
              color: colors.secondaryText,
              fontFamily: "Sf-thin",
              fontSize: 12,
            }}
          >
            Зөвхөн танд харагдаж байна
          </Text>
        </View>
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: "Sf-regular",
            fontSize: 16,
            marginBottom: 5,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Таны нэрийн доор харагдах ажил, карьерын тодорхойлолт
        </Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#FFB5c1",
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 10,
            padding: 10,
          }}
          onPress={props.onPress}
        >
          <Text style={{ color: colors.border }}>Статус сонгох</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmptyStatus;

const styles = StyleSheet.create({});
