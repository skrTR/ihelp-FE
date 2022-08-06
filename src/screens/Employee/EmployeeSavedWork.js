import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import EmployeeWork from "../../components/Employee/EmployeeWork";
import UserContext from "../../context/UserContext";
const EmployeeSavedWork = () => {
  const state = useContext(UserContext);
  const [savedWork, setSavedWork] = useState([]);
  const getSavedWork = () => {
    axios
      .get(
        `${api}/api/v1/likes/${state.userId}/announcements?limit=1000&select=announcement`
      )
      .then((res) => {
        setSavedWork(res.data.data);
        console.log(res.data.data);
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
              {item.announcementInfo && (
                <EmployeeWork
                  id={item.announcement}
                  firstName={item.firstName}
                  profile={item.profile}
                  occupation={item.announcementInfo.occupationName}
                  type={item.announcementInfo.skill}
                  salary={item.announcementInfo.price}
                  isEmployee={item.isEmployee}
                  isEmployer={item.isEmployer}
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

export default EmployeeSavedWork;

const styles = StyleSheet.create({});
