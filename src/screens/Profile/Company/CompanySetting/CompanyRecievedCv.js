import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import Cvs from "../../../../components/Cv/Cvs";
import Empty from "../../../../components/Empty";

const CompanyRecievedCv = () => {
  const state = useContext(UserContext);
  const [data, setData] = useState([]);
  const getCvs = () => {
    axios
      .get(
        `${api}/api/v1/applies/${state.companyId}/profile?select=workingCompany working profession firstName lastName profile score experienceCount familyCount courseCount achievementCount birth createUser salaryExpectation experiences&limit=1000`
      )
      .then((res) => {
        // console.log(res.data.data, "a");
        setData(res.data.data);
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
      {data ? (
        <FlatList
          data={data.sort((a, b) => b.score - a.score)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return <Cvs item={item.questionnaire} />;
          }}
          ListFooterComponent={<View style={{ marginBottom: 100 }} />}
        />
      ) : (
        <Empty text={"Анкет ирээгүй байна"} />
      )}
    </View>
  );
};

export default CompanyRecievedCv;

const styles = StyleSheet.create({});
