import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
import Empty from "../../../../components/Empty";
import SendWorkHistory from "../../../../components/Profile/User/Settings/SendWorkHistory";

const UserSendWorkHistory = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [workRequest, setWorkRequest] = useState([]);
  const getWorkRequest = () => {
    axios
      .get(`${api}/api/v1/applies/${state.userId}/apply`)
      .then((res) => {
        setWorkRequest(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getWorkRequest();
  }, []);
  return (
    <View>
      {workRequest.length > 0 ? (
        <FlatList
          data={workRequest}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <>
                <SendWorkHistory
                  companyData={item.companyInfo}
                  jobData={item.jobInfo}
                  isViewed={item.isViewed}
                  success={item.success}
                  createdAt={item.createdAt}
                  jobInfo={item.jobInfo}
                />
                <View style={{ borderWidth: 1, borderColor: colors.border }} />
              </>
            );
          }}
        />
      ) : (
        <Empty text={"Та ажлын санал илгээгүй байна"} />
      )}
    </View>
  );
};

export default UserSendWorkHistory;

const styles = StyleSheet.create({});
