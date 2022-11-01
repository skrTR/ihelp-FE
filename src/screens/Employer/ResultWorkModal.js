import { SafeAreaView, View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import UrgentWork from "../../components/Employer/UrgentWork";
import SpecialWork from "../../components/Employer/SpecialWork";
import NormalWork from "../../components/Employer/NormalWork";
const ResultWorkModal = (props) => {
  const { salary, education, experience, gender, occupationId, type } =
    props.route.params;
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getWorkSearch = () => {
    const test = `${api}/api/v1/jobs?limit=1000${
      salary ? `&salary=${salary}` : ""
    }${education ? `&education=${education}` : ""}${
      experience ? `&experience=${experience}` : ""
    }${gender ? `&gender=${gender}` : ""}${type ? `&type=${type}` : ""}${
      occupationId ? `&occupation=${occupationId}` : ""
    }`;
    console.log(test);
    axios
      .get(
        `${api}/api/v1/jobs?limit=1000${salary ? `&salary=${salary}` : ""}${
          education ? `&education=${education}` : ""
        }${experience ? `&experience=${experience}` : ""}${
          gender ? `&gender=${gender}` : ""
        }${type ? `&type=${type}` : ""}${
          occupationId ? `&occupation=${occupationId}` : ""
        }`
      )
      .then((res) => {
        setData(res.data.data);
        // console.log(res.data.data, "data");
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };
  useEffect(() => {
    setRefresh(false);
    getWorkSearch();
  }, [refresh]);
  const sorted2 = data.sort((a, b) => b.isSpecial - a.isSpecial);
  const sortedData = sorted2.sort((a, b) => b.isUrgent - a.isUrgent);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#141414" }}>
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          {data.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={sortedData}
              keyExtractor={(item, index) => index}
              ListFooterComponent={<View style={{ marginVertical: 200 }} />}
              renderItem={({ item }) => {
                return (
                  <View style={{}}>
                    {item.isUrgent ? (
                      <UrgentWork
                        id={item._id}
                        createUserProfile={item.profile}
                        createUserName={item.firstName}
                        occupation={item.occupationName}
                        type={item.type}
                        salary={item.salary}
                        isEmployer={item.isEmployer}
                        isEmployee={item.isEmployee}
                      />
                    ) : item.isSpecial ? (
                      <SpecialWork
                        id={item._id}
                        createUserProfile={item.profile}
                        createUserName={item.firstName}
                        occupation={item.occupationName}
                        type={item.type}
                        salary={item.salary}
                        isEmployer={item.isEmployer}
                        isEmployee={item.isEmployee}
                      />
                    ) : (
                      <NormalWork
                        id={item._id}
                        createUserProfile={item.profile}
                        createUserName={item.firstName}
                        occupation={item.occupationName}
                        type={item.type}
                        salary={item.salary}
                        isEmployer={item.isEmployer}
                        isEmployee={item.isEmployee}
                      />
                    )}
                  </View>
                );
              }}
            />
          ) : (
            <View>
              <Empty text="Илэрц байхгүй" />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ResultWorkModal;
