import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";
const Empty = (props) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  return (
    <View style={{ marginTop: 250, ...props, height: "100%" }}>
      <Animatable.Image
        animation="slideInDown"
        iterationCount="infinite"
        direction="alternate"
        easing="ease-out"
        source={
          colorScheme === "dark"
            ? require("../../assets/ihelp/logo.png")
            : require("../../assets/logo-dark.png")
        }
        style={{
          width: 250,
          height: 90,
          alignSelf: "center",
          resizeMode: "contain",
        }}
      />
      <Animatable.Text
        style={{
          marginHorizontal: 20,
          textAlign: "center",
          color: colors.primaryText,
          fontFamily: "Sf-thin",
          fontSize: 20,
          marginBottom: 200,
        }}
        animation="slideInUp"
        iterationCount="infinite"
        direction="alternate"
        easing="ease-out"
      >
        {props.text}
      </Animatable.Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
