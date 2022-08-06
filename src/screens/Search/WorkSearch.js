import {
  SafeAreaView,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import SearchByOccupation from "./Work/SearchByOccupation";
import NormalWork from "../../components/Employer/NormalWork";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
const WorkSearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [works, setWorks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("62905a514be9675d77e52356");
  const [choosedName, setChoosedName] = useState("Сонгох");
  const [refresh, setRefresh] = useState(false);
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
      <SafeAreaView
        style={{ backgroundColor: "#141414", opacity: modalVisible ? 0.2 : 1 }}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: "#141414",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            bottom: 0,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <View>
              <AntDesign
                name="left"
                size={25}
                color={colors.primaryText}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View>
              <Image
                source={require("../../../assets/ihelp/logo.png")}
                style={{
                  width: 90,
                  height: 50,
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <SimpleLineIcons
                name="equalizer"
                size={25}
                color={colors.primaryText}
                onPress={() => {
                  navigation.navigate("CustomSearchModal");
                }}
              />
            </View>
          </View>
        </View>
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
      </SafeAreaView>
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
