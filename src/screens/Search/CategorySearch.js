import { Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import NormalWork from "../../components/Employer/NormalWork";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import Header from "../../components/Header/Header";
import SearchByCategory from "../../components/Modals/SearchByCategory";
const CategorySearch = () => {
  const { colors } = useTheme();
  const [works, setWorks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("");
  const [choosedName, setChoosedName] = useState("Салбар сонгох");
  const [refresh, setRefresh] = useState(false);
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);
  const getWorkSearch = () => {
    if (choosedId === "") {
      axios
        .get(
          `${api}/api/v1/jobs?limit=1000&select=occupationName salary firstName profile type isEmployer isEmployee isUrgent isSpecial`
        )
        .then((res) => {
          setWorks(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (choosedId.length > 0) {
      axios
        .get(
          `${api}/api/v1/jobs/${choosedId}/category?limit=1000&select=occupationName salary firstName profile type isEmployer isEmployee isUrgent isSpecial`
        )
        .then((res) => {
          setWorks(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    setRefresh(false);
    getWorkSearch();
  }, [refresh]);
  const sorted2 = works.sort((a, b) => b.isSpecial - a.isSpecial);
  const sortedData = sorted2.sort((a, b) => b.isUrgent - a.isUrgent);
  return (
    <>
      <View
        style={{
          backgroundColor: colors.header,
          opacity: modalVisible ? 0.2 : 1,
          paddingTop: insents.top,
        }}
      >
        {state.isCompany ? (
          <CompanyHeader isBack={true} />
        ) : (
          <Header isBack={true} />
        )}
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          <TouchableOpacity
            style={{
              padding: 10,

              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.border,
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor:
                choosedName === "Салбар сонгох"
                  ? colors.background
                  : colors.border,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ textAlign: "center", color: colors.primaryText }}>
              {choosedName}
            </Text>
          </TouchableOpacity>
          {works.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={sortedData}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 5 }}>
                    <NormalWork
                      id={item._id}
                      createUserName={item.firstName}
                      createUserProfile={item.profile}
                      isEmployer={item.isEmpoyer}
                      isEmployee={item.isEmpoyee}
                      occupation={item.occupationName}
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
      </View>
      <SearchByCategory
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setChoosedId={setChoosedId}
        setRefresh={setRefresh}
        setChoosedName={setChoosedName}
      />
    </>
  );
};

export default CategorySearch;
