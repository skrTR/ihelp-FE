import { View, FlatList, TouchableOpacity, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import SearchByOccupation from "./Work/SearchByOccupation";
import NormalWork from "../../components/Employer/NormalWork";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
import Header from "../../components/Header/Header";
import UrgentWork from "../../components/Employer/UrgentWork";
import SpecialWork from "../../components/Employer/SpecialWork";
const WorkSearch = () => {
  const { colors } = useTheme();
  const [works, setWorks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("");
  const [choosedName, setChoosedName] = useState("Мэргэжил сонгох");
  const [refresh, setRefresh] = useState(false);
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);
  const getWorkSearch = () => {
    if (choosedId === "") {
      axios
        .get(
          `${api}/api/v1/jobs?limit=1000&select=firstName type profile occupationName isEmployer isEmployee salary isUrgent isSpecial createdAt`
        )
        .then((res) => {
          setWorks(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `${api}/api/v1/jobs/${choosedId}/occupation?limit=1000&select=firstName type profile occupationName isEmployer isEmployee salary`
        )
        .then((res) => {
          setWorks(res.data.data);
          console.log(res.data.data);
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
        {/* Header */}
        {state.isCompany ? (
          <CompanyHeader isBack={true} workSort={true} />
        ) : (
          <Header isBack={true} workSort={true} />
        )}
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          <TouchableOpacity
            style={{
              padding: 10,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 10,
              backgroundColor:
                choosedName === "Мэргэжил сонгох"
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
              ListFooterComponent={<View style={{ marginVertical: 200 }} />}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 5 }}>
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
      </View>
      <SearchByOccupation
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setChoosedId={setChoosedId}
        setRefresh={setRefresh}
        setChoosedName={setChoosedName}
      />
    </>
  );
};

export default WorkSearch;
