import { ImageBackground, Pressable, Image, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-around",
      }}
    >
      <Pressable
        style={{ flex: 0.5 }}
        onPress={() => navigation.navigate("CompanyLoginScreen")}
      >
        <ImageBackground
          source={require("../../assets/ihelp/HomeCompany.png")}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-evenly",
          }}
          imageStyle={{ resizeMode: "contain" }}
        >
          <Image
            source={require("../../assets/ihelp/logocompany.png")}
            style={{
              width: "61%",
              height: "31%",
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />
        </ImageBackground>
      </Pressable>
      <Pressable
        style={{ flex: 0.5 }}
        onPress={() => navigation.navigate("PersonLoginScreen")}
      >
        <ImageBackground
          source={require("../../assets/ihelp/HomePerson.png")}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-evenly",
          }}
          imageStyle={{ resizeMode: "contain" }}
        >
          <Image
            source={require("../../assets/ihelp/logoperson.png")}
            style={{
              width: "61%",
              height: "31%",
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
