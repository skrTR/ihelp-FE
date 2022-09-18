import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import EmployeeData from "../../components/Search/Company/EmployeeData";

const AllCompanySearch = () => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    fetchCompany();
    return () => {};
  }, []);
  const fetchCompany = () => {
    const apiURL = `${api}/api/v1/profiles?select=firstName profile categoryName organization isEmployer isEmployee isApproved&organization=true&limit=1000`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
        setMasterData(responseJson.resullt);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#141414", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          justifyContent: "space-around",
        }}
      >
        <AntDesign
          name="left"
          size={24}
          color={colors.primaryText}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          placeholder="Хайх утга..."
          value={search}
          onChangeText={(text) => searchFilter(text)}
          style={{
            backgroundColor: colors.border,
            padding: 10,
            width: "80%",
            marginHorizontal: 10,
            borderRadius: 20,
            color: colors.primaryText,
          }}
        />
        <SimpleLineIcons
          name="equalizer"
          size={25}
          color={colors.primaryText}
          onPress={() => {
            navigation.navigate("CompanyFilterModal");
          }}
        />
      </View>
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return <EmployeeData item={item} isFollowing={item.isFollowing} />;
        }}
        ListHeaderComponent={
          <>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                marginHorizontal: 10,
                marginVertical: 20,
              }}
            >
              Ажил хайгч компани
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default AllCompanySearch;

const styles = StyleSheet.create({});
