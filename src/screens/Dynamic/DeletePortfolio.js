import { ImageBackground, StyleSheet, Alert, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { api } from "../../../Constants";
import AntDesign from "@expo/vector-icons/AntDesign";
const DeletePortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const state = useContext(UserContext);

  let isMounted = true;
  const loadCompanyProfile = () => {
    axios
      .get(`${api}/api/v1/cvs/${state.userId}?select=portfolio`)
      .then((res) => {
        if (isMounted) {
          setPortfolio(res.data.data.portfolio);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePortfolio = (item) => {
    console.log(item);
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          axios
            .delete(`${api}/api/v1/cvs/portfolio`, { item: "1" })
            .then((res) => {
              alert("Амжиллтай устгаллаа");
              console.log(res.data.data.portfolio);
            })
            .catch((err) => {
              console.log(err.message);
            });
        },
      },
    ]);
  };
  useEffect(() => {
    loadCompanyProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!portfolio) {
    return null;
  }
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {portfolio.image1 && (
          <ImageBackground
            source={{
              uri: `${api}/upload/${portfolio.image1}`,
            }}
            style={{ width: "100%", height: 130, flex: 0.33 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color={"red"}
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={() => deletePortfolio("file1")}
            />
          </ImageBackground>
        )}
        {portfolio.image2 && (
          <ImageBackground
            source={{
              uri: `${api}/upload/${portfolio.image2}`,
            }}
            style={{ width: "100%", height: 130, flex: 0.33 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color={"red"}
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={() => deletePortfolio("file2")}
            />
          </ImageBackground>
        )}
        {portfolio.image3 && (
          <ImageBackground
            source={{
              uri: `${api}/upload/${portfolio.image3}`,
            }}
            style={{ width: "100%", height: 130, flex: 0.33 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color={"red"}
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={() => deletePortfolio("file3")}
            />
          </ImageBackground>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        {portfolio.image4 && (
          <ImageBackground
            source={{
              uri: `${api}/upload/${portfolio.image4}`,
            }}
            style={{ width: "100%", height: 130, flex: 0.33 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color={"red"}
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={() => deletePortfolio("file4")}
            />
          </ImageBackground>
        )}
        {portfolio.image5 && (
          <ImageBackground
            source={{
              uri: `${api}/upload/${portfolio.image5}`,
            }}
            style={{ width: "100%", height: 130, flex: 0.33 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color={"red"}
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={() => deletePortfolio("file5")}
            />
          </ImageBackground>
        )}
        {portfolio.image6 && (
          <ImageBackground
            source={{
              uri: `${api}/upload/${portfolio.image6}`,
            }}
            style={{ width: "100%", height: 130, flex: 0.33 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color={"red"}
              style={{ alignSelf: "flex-end", margin: 10 }}
              onPress={() => deletePortfolio("file6")}
            />
          </ImageBackground>
        )}
      </View>
    </>
  );
};

export default DeletePortfolio;

const styles = StyleSheet.create({});
