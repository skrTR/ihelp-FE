import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import axios from "axios";
const SearchByOccupation = (props) => {
  const {
    occupationModal,
    setOccupationModal,
    setChoosedId,
    setRefresh,
    setChoosedName,
    categoryId,
    refresh,
  } = props;
  const { colors } = useTheme();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    setRefresh(false);
    fetchUser();
    return () => {};
  }, [refresh]);
  const fetchUser = () => {
    const apiURL = `${api}/api/v1/occupations?select=id name${
      categoryId ? `&category=${categoryId}` : ""
    }`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
      })
      .catch((error) => {
        alert(error);
      });
    axios.get(`${api}/api/v1/categories/${categoryId}`).then((res) => {
      setCategoryName(res.data.data.name);
    });
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
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
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
          backgroundColor: colors.background,
          width: "100%",
        }}
        onPress={() => {
          setRefresh(true);
          setChoosedId(item._id, item.name);
          setOccupationModal(false);
          setChoosedName(item.name);
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: colors.primaryText }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: colors.border,
          marginVertical: 10,
        }}
      />
    );
  };
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Modal
        animationType="slide"
        visible={occupationModal}
        onRequestClose={() => {
          setOccupationModal(!occupationModal);
        }}
        presentationStyle="formSheet"
      >
        <View style={{ backgroundColor: colors.background, height: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 10,
              backgroundColor: colors.background,
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color={colors.primaryText}
              onPress={() => setOccupationModal(false)}
            />
            <TextInput
              placeholder="Хайх утга"
              value={search}
              onChangeText={(text) => searchFilter(text)}
              style={{
                backgroundColor: colors.border,
                padding: 10,
                width: "90%",
                marginLeft: 10,
                borderRadius: 20,
              }}
              placeholderTextColor={"#cccccccc"}
            />
          </View>
          <Text
            style={{
              color: colors.primaryText,
              fontWeight: "bold",
              margin: 10,
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            {categoryName}
          </Text>
          <FlatList
            data={
              filterData &&
              filterData.sort((a, b) => a.name.localeCompare(b.name))
            }
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={{ backgroundColor: colors.background }}
            ListFooterComponent={<View style={{ marginBottom: 200 }} />}
          />
        </View>
      </Modal>
    </View>
  );
};

export default SearchByOccupation;

const styles = StyleSheet.create({});
