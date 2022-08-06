import {
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  Text,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
        >
          <Image
            source={require("../../assets/ihelp/logocompany.png")}
            style={{ width: "61%", height: "31%", alignSelf: "center" }}
          />
          <Text style={{ fontFamily: "Sf-thin", color: "white", fontSize: 30 }}>
            Компани
          </Text>
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
        >
          <Image
            source={require("../../assets/ihelp/logoperson.png")}
            style={{ width: "59%", height: "28%", alignSelf: "center" }}
          />
          <Text style={{ fontFamily: "Sf-thin", color: "white", fontSize: 30 }}>
            Хувь хүн
          </Text>
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
