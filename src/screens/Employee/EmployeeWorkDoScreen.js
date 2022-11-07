import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import NormalWork from "../../components/Employee/NormalWork";
import axios from "axios";
import { api } from "../../../Constants";
import { FlashList } from "@shopify/flash-list";
import Notfound from "../../components/notfound";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useIsFocused } from "@react-navigation/native";

const EmployeeWorkDoScreen = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [refresh, setRefresh] = useState(false);
  const state = useContext(UserContext);
  const isFocused = useIsFocused();
  let isMoutned = true;
  const getData = () => {
    axios
      .get(
        `${api}/api/v1/announcements?limit=1000&sort=-special -createdAt&certificate=Ажил гүйцэтгэгч`
      )
      .then((result) => {
        if (isMoutned) {
          setData(result.data.data);
        }
        setError(false);
      })
      .catch((err) => {
        let message = err.message;
        setErrorMessage(message);
        setError(true);
      })
      .finally(() => {
        setRefresh(false);
      });
  };
  useEffect(() => {
    getData();
    () => {
      isMoutned = false;
    };
  }, [refresh, isFocused]);

  const onRefresh = () => {
    setRefresh(true);
  };
  if (error) {
    return <Notfound message={errorMessage} isHeader={true} />;
  }
  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={data}
      estimatedItemSize={200}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        return (
          <NormalWork
            id={item._id}
            createUserName={item.firstName}
            createUserProfile={item.profile}
            isEmployer={item.isEmployer}
            isEmployee={item.isEmployee}
            occupation={item.occupationName}
            price={item.price}
            job={item.do}
            createUserId={item.createUser}
            order={item.order}
            special={item.special}
            own={state.isCompany ? state.companyId : state.userId}
          />
        );
      }}
      refreshing={refresh}
      onRefresh={onRefresh}
    />
  );
};

export default EmployeeWorkDoScreen;

const styles = StyleSheet.create({});
