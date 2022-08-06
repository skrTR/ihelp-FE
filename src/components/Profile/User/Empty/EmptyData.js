import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
const EmptyData = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <>
      <Text
        style={{
          color: colors.primaryText,
          marginHorizontal: 10,
          fontFamily: "Sf-bold",
          fontSize: 20,
          marginTop: 10,
        }}
      >
        {props.title}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          width: "90%",
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            source={require("../../../../../assets/ihelp/ggwp1.png")}
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name={props.icon} size={24} color={colors.primaryText} />
          </ImageBackground>
          <Text style={{ fontSize: 30, color: colors.primaryText }}>
            {props.inTitle}
          </Text>
        </View>
        <Text style={{ color: colors.secondaryText, marginTop: 20 }}>
          {props.description}
        </Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            padding: 10,
            backgroundColor: "#FFB6C1",
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 15,
          }}
          onPress={() => {
            navigation.navigate(`${props.screenDetail}`, { id: props.id });
          }}
        >
          <Text style={{ color: colors.border }}>Нэмэх</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EmptyData;

const styles = StyleSheet.create({});
