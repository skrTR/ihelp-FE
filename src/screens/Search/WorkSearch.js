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
const WorkSearch = () => {
  const { colors } = useTheme();
  const [works, setWorks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("62905a514be9675d77e52356");
  const [choosedName, setChoosedName] = useState("Сонгох");
  const [refresh, setRefresh] = useState(false);
  const insents = useSafeAreaInsets();
  const state = useContext(UserContext);
  const getWorkSearch = () => {
    axios
      .get(
        `${api}/api/v1/jobs/${choosedId}/occupation?limit=1000&select=firstName type profile occupationName isEmployer isEmployee salary`
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
      <View
        style={{
          backgroundColor: colors.header,
          opacity: modalVisible ? 0.2 : 1,
          paddingTop: insents.top,
        }}
      >
        {/* Header */}
        {state.isCompany ? (
          <CompanyHeader isBack={true} />
        ) : (
          <Header isBack={true} />
        )}
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          <TouchableOpacity
            style={{
              padding: 10,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              marginHorizontal: 10,
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
              data={works}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 5 }}>
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
