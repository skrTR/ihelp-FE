import { SafeAreaView, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../../Constants";
import Empty from "../../../components/Empty";
import NormalWork from "../../../components/Employer/NormalWork";
const CustomSearchedModal = (props) => {
  const { salary, age, level, education, experience, gender, type } =
    props.route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [works, setWorks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getWorkSearch = () => {
    axios
      .get(
        `${api}/api/v1/jobs?limit=1000${salary ? `&salary=${salary}` : ""}${
          level ? `&level=${level}` : ""
        }${education ? `&education=${education}` : ""}${
          age ? `&age=${age}` : ""
        }${experience ? `&experience=${experience}` : ""}${
          gender ? `&gender=${gender}` : ""
        }${type ? `&type=${type}` : ""}`
      )
      .then((res) => {
        setWorks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setRefresh(false);
    getWorkSearch();
  }, [refresh]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#141414" }}>
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          {works.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={works}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 5 }}>
                    <NormalWork
                      id={item._id}
                      createUser={item.createUser}
                      occupation={item.occupation}
                      type={item.type}
                      salary={item.salary}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <View>
              <Empty text="Таны хайсан ажлын байр одоогоор байхгүй байна" />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default CustomSearchedModal;
