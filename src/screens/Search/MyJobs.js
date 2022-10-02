import { FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import MyJobsDatas from "./Work/MyJobsDatas";
import { useIsFocused } from "@react-navigation/native";
const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const isFocused = useIsFocused();
  const getJobs = () => {
    axios
      .get(
        `${api}/api/v1/jobs/filters?limit=1000&select=percent profile salary type firstName occupationName`
      )
      .then((res) => {
        setJobs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getJobs();
  }, [isFocused]);

  return (
    <FlatList
      data={jobs.sort((a, b) => b.percent - a.percent)}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <MyJobsDatas
            id={item._id}
            createUser={item.createUser}
            createUserName={item.firstName}
            createUserProfile={item.profile}
            occupation={item.occupationName}
            type={item.type}
            salary={item.salary}
            percent={item.percent}
            isEmployee={item.isEmployee}
            isEmployer={item.isEmployer}
          />
        );
      }}
    />
  );
};

export default MyJobs;
