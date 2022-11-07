import { View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";

import NormalWork from "../../components/Employee/NormalWork";
import { FlashList } from "@shopify/flash-list";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Notfound from "../../components/notfound";
const EmployeeResultSort = (props) => {
  const { occupationId, time, price, organization, workType } =
    props.route.params;
  const state = useContext(UserContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [refresh, setRefresh] = useState(false);
  let info = organization === "Байгууллага" ? true : false;
  const getWorkSearch = () => {
    axios
      .get(
        `${api}/api/v1/announcements?limit=1000&sort=-special -createdAt${
          occupationId ? `&occupation=${occupationId}` : ""
        }${time ? `&time=${time}` : ""}${price ? `&price=${price}` : ""}${
          organization ? `&organization=${info}` : ""
        }${workType ? `&certificate=${workType}` : ""}`
      )
      .then((res) => {
        setData(res.data.data);
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
    getWorkSearch();
  }, [refresh]);
  const onRefresh = () => {
    setRefresh(true);
  };
  if (error) {
    return <Notfound message={errorMessage} isHeader={true} />;
  }
  return (
    <>
      {data.length > 0 ? (
        <FlashList
          showsVerticalScrollIndicator={false}
          data={data}
          estimatedItemSize={99}
          ListFooterComponent={<View style={{ marginVertical: 200 }} />}
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
      ) : (
        <View>
          <Empty text="Илэрц байхгүй" />
        </View>
      )}
    </>
  );
};

export default EmployeeResultSort;
