import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import MyButton from "../../components/MyButton";
import Empty from "../../components/Empty";
import NormalWork from "../../components/Employer/NormalWork";
import SearchByCategory from "./Work/SearchByCategory";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
const CategorySearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [works, setWorks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("629051d64be9675d77e5230f");
  const [choosedName, setChoosedName] = useState("Сонгох");
  const [refresh, setRefresh] = useState(false);
  const getWorkSearch = () => {
    axios
      .get(
        `${api}/api/v1/jobs/${choosedId}/category?limit=1000&select=occupationName salary firstName profile type isEmployer isEmployee`
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

              borderWidth: 1,
              borderRadius: 20,
              borderColor: colors.border,
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
      </SafeAreaView>
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
