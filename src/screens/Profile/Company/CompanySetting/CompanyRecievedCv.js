import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";

const CompanyRecievedCv = () => {
  const state = useContext(UserContext);
  const getCvs = () => {
    axios
      .get(`${api}/api/v1/applies`)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCvs();
  }, []);
  return (
    <View>
      <Text>CompanyRecievedCv</Text>
    </View>
  );
};

export default CompanyRecievedCv;

const styles = StyleSheet.create({});
