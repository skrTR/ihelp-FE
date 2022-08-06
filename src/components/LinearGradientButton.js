import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const LinearGradientButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={{
        marginTop: 20,
        borderRadius: 20,
      }}
    >
      <LinearGradient
        colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
        style={{
          paddingVertical: 10,
          borderRadius: 20,
        }}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
      >
        <Text style={{ color: "white", textAlign: "center" }}> Хадгалах </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearGradientButton;

const styles = StyleSheet.create({});
