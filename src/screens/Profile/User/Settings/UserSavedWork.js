import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import Empty from "../../../../components/Empty";
import UserWorks from "../../../../components/Profile/User/Settings/UserWorks";
const UserSavedWork = () => {
  const state = useContext(UserContext);
  const [savedWork, setSavedWork] = useState([]);
  const getSavedWork = () => {
    axios
      .get(`${api}/api/v1/likes/${state.userId}/jobs`)
      .then((res) => {
        setSavedWork(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  useEffect(() => {
    getSavedWork();
  }, []);
  return (
    <ScrollView>
      {savedWork.length > 0 ? (
        savedWork.map((item) => {
          return (
            <View key={item._id}>
              {item.job && (
                <UserWorks
                  jobId={item.job._id}
                  firstName={item.job.firstName}
                  profile={item.job.profile}
                  occupation={item.job.occupationName}
                  type={item.job.type}
                  salary={item.job.salary}
                  isEmployer={item.isEmployer}
                  isEmployee={item.isEmployee}
                  id={item.job._id}
                />
              )}
            </View>
          );
        })
      ) : (
        <Empty text={"Та ажлын зар хадгалаагүй байна"} />
      )}
    </ScrollView>
  );
};

export default UserSavedWork;

const styles = StyleSheet.create({});
